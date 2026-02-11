import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  // サーバー起動時に警告を出す（ビルド時ではなく実行時）
  if (process.env.NODE_ENV === 'production') {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing');
  }
}

// During build, secretKey might be empty, so we provide a dummy string to prevent Stripe from throwing an error
export const stripe = new Stripe(secretKey || 'dummy_key');
