import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  if (process.env.NODE_ENV === 'production') {
    console.warn('CRITICAL: STRIPE_SECRET_KEY is missing in production environment');
  }
}

export const stripe = new Stripe(secretKey || 'dummy_key', {
  apiVersion: '2026-01-28.clover', // 指定の最新バージョン
  appInfo: {
    name: 'Kantan Resume Maker',
    version: '0.1.0',
  },
});
