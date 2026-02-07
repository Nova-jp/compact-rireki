import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { email, type = 'resume' } = await req.json();
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      // For build time or missing key
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY is not defined' }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const { origin } = new URL(req.url);

    // Basic email validation
    const isValidEmail = email && typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: type === 'cv' ? '職務経歴書PDFダウンロード' : '履歴書PDFダウンロード',
              description: '高品質なPDFの生成・ダウンロード',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/${type}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${type}`,
      customer_email: isValidEmail ? email : undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}