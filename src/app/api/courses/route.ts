import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { type NextRequest } from 'next/server'

// Manually define the Course type for now
export interface Course {
  id: string;
  title: string;
  description: string | null;
  teacher_id: string;
  category_id: string | null;
  price: number | null;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// GET handler to fetch all published courses
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching published courses:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// POST handler to create a new course
export async function POST(request: NextRequest) {
  try {
    // 1. Get the user's JWT from the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authorization header is missing' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Bearer token is missing' }, { status: 401 });
    }

    // 2. Get the user from the token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    // 3. Parse the request body
    const body = await request.json();
    const { title, description, category_id, price, is_published } = body;

    if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // 4. Insert the new course into the database
    const { data, error: insertError } = await supabase
      .from('courses')
      .insert([
        {
          title,
          description,
          category_id,
          price,
          is_published,
          teacher_id: user.id, // Set the teacher_id to the authenticated user's ID
        },
      ])
      .select()
      .single(); // .single() returns the created object instead of an array

    if (insertError) {
      console.error('Error creating course:', insertError);
      // The RLS policy will also return an error, but we add a check here for clarity
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
