import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error(`❌ Error message: ${message}`);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, courseId } = session.metadata!;

    if (!userId || !courseId) {
        console.error('❌ Missing metadata in checkout session');
        return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
    }

    try {
      // Use the admin client to create the enrollment, bypassing RLS
      const { error } = await supabaseAdmin.from('enrollments').insert({
        student_id: userId,
        course_id: courseId,
      });

      if (error) {
        console.error('❌ Error creating enrollment from webhook:', error);
        // We still return 200 to Stripe, but log the error for investigation
      } else {
        console.log(`✅ Successfully enrolled user ${userId} in course ${courseId}`);
      }

    } catch (err) {
      console.error('❌ Unexpected error during enrollment creation:', err);
    }
  } else {
    console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
