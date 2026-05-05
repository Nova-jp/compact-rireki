import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, sessionId } = body;

    // 1. Verify Payment Session
    if (process.env.NODE_ENV === 'production' || sessionId) {
      if (!sessionId) {
        return NextResponse.json({ error: 'Payment required' }, { status: 402 });
      }
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      const ageSeconds = Date.now() / 1000 - session.created;
      if (session.payment_status !== 'paid' || ageSeconds > 600) {
        return NextResponse.json({ error: 'Payment not valid' }, { status: 402 });
      }
    }

    // 2. Call the dedicated PDF Server
    // In production, this would be an internal or external URL of the PDF Cloud Run service
    const PDF_SERVER_URL = process.env.PDF_SERVER_URL || 'http://localhost:3001/generate';

    const pdfResponse = await fetch(PDF_SERVER_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': process.env.PDF_SERVER_API_KEY || '',
      },
      body: JSON.stringify(body),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      throw new Error(`PDF Server Error: ${errorText}`);
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // 3. Return PDF to user
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=document_${encodeURIComponent(name)}.pdf`,
      },
    });

  } catch (error: any) {
    console.error('[WEB-GATEWAY] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
