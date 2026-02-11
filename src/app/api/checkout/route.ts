import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { APP_CONFIG } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { email, type = 'resume' } = await req.json();

    // Determine origin safely
    let origin = process.env.BASE_URL;

    if (!origin) {
      const host = req.headers.get('host');
      const forwardedProto = req.headers.get('x-forwarded-proto');
      const protocol = forwardedProto || (host?.includes('localhost') ? 'http' : 'https');
      origin = `${protocol}://${host}`;
    }

    // Remove trailing slash if exists
    origin = origin.replace(/\/$/, '');

    console.log('--- Checkout Request (App Router) ---');
    console.log('TYPE:', type);
    console.log('FINAL ORIGIN:', origin);

    const isValidEmail = email && typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: APP_CONFIG.PAYMENT.CURRENCY,
            product_data: {
              name: type === 'cv' ? '職務経歴書PDFダウンロード' : '履歴書PDFダウンロード',
              description: '高品質なPDFの生成・ダウンロード',
            },
            unit_amount: APP_CONFIG.PAYMENT.AMOUNT,
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
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
