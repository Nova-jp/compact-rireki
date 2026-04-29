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

    const isValidEmail = email && typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const session = await stripe.checkout.sessions.create({
  // 住所入力の手間を省くため、自動税計算を明示的にオフにする
  automatic_tax: { enabled: false },
  // エラー回避のため標準的な支払い方法指定に戻す
  payment_method_types: ['card'],
  // 請求先住所の収集を最小限に設定
  billing_address_collection: 'auto',
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
  // 決済ボタン付近に注釈を表示
  custom_text: {
    submit: {
      message: '入力いただいたメールアドレスは、領収書の送付および決済確認のためにのみ使用されます。',
    },
  },
  payment_intent_data: {
    description: `${type === 'cv' ? '職務経歴書' : '履歴書'}作成サービス`,
  },
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
