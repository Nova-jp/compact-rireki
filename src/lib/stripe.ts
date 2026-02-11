import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  // サーバー起動時に警告を出す（ビルド時ではなく実行時）
  if (process.env.NODE_ENV === 'production') {
    console.error('CRITICAL: STRIPE_SECRET_KEY is missing');
  }
}

export const stripe = new Stripe(secretKey || '');
