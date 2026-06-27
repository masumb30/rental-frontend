// app/api/stripe-metadata/route.ts
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Return the custom metadata along with the payment intent ID
    return NextResponse.json({
      success: true,
      metadata: session.metadata,
      stripePaymentId: session.payment_intent,
      amountPaid: session.amount_total ? session.amount_total / 100 : 0
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}