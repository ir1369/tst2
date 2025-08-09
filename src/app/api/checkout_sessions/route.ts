import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { type NextRequest } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

async function getUser(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split('Bearer ')[1];
    if (!token) return null;
    const { data: { user } } = await supabase.auth.getUser(token);
    return user;
}

// POST handler to create a Stripe Checkout Session
export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 });
    }

    const body = await request.json();
    const { course_id } = body;
    if (!course_id) {
      return NextResponse.json({ error: 'Course ID is required.' }, { status: 400 });
    }

    // Fetch course details from the database using the admin client to ensure we get the correct price
    const { data: course, error: courseError } = await supabaseAdmin
      .from('courses')
      .select('title, price')
      .eq('id', course_id)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    }

    if (!course.price || course.price <= 0) {
      return NextResponse.json({ error: 'This course is not for sale.' }, { status: 400 });
    }

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
            },
            unit_amount: Math.round(course.price * 100), // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/learn/${course_id}?payment=success`,
      cancel_url: `${baseUrl}/course/${course_id}?payment=cancelled`,
      // We pass the user's ID and course ID in metadata to use in the webhook
      metadata: {
        userId: user.id,
        courseId: course_id,
      },
    });

    return NextResponse.json({ session });

  } catch (err: unknown) {
    console.error('Error creating checkout session:', err);
    const message = err instanceof Error ? err.message : 'An unknown error occurred.';
    return NextResponse.json({ error: `Internal Server Error: ${message}` }, { status: 500 });
  }
}
