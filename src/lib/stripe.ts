import Stripe from 'stripe';

let _stripe: Stripe | undefined;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not set');
  _stripe = new Stripe(secretKey, {
    apiVersion: '2026-01-28.clover',
    appInfo: {
      name: 'Kantan Resume Maker',
      version: '0.1.0',
    },
  });
  return _stripe;
}
