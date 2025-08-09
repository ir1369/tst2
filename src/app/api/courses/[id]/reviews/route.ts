import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET handler to fetch all reviews for a course
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id;

    // This is a public endpoint, anyone can read reviews.
    // We can join with the users table to get reviewer's name.
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        users ( id, first_name, last_name )
      `)
      .eq('course_id', courseId);

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// POST handler to create a new review for a course
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const courseId = params.id;
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 });
        }
        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Bearer token is missing' }, { status: 401 });
        }

        const { data: { user } } = await supabase.auth.getUser(token);
        if (!user) {
            return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
        }

        const body = await request.json();
        const { rating, comment } = body;

        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
        }

        // Create a new Supabase client with the user's auth token to enforce RLS
        const supabaseClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        );

        const { data, error } = await supabaseClient
            .from('reviews')
            .insert({
                course_id: courseId,
                user_id: user.id,
                rating,
                comment,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating review:', error);
            if (error.code === '23505') { // Unique violation
                return NextResponse.json({ error: 'You have already reviewed this course.' }, { status: 409 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
