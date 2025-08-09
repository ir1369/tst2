import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET handler to fetch all lessons for a specific course
// This endpoint is protected by RLS. Only enrolled students or the course teacher can access it.
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id;

    // We must use an authenticated client to ensure RLS policies are applied.
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        return NextResponse.json({ error: 'Bearer token is missing' }, { status: 401 });
    }

    // Create a new Supabase client with the user's auth token
    const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: { headers: { Authorization: `Bearer ${token}` } },
        }
    );

    // Fetch the lessons for the course
    const { data, error } = await supabaseClient
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching lessons:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If data is empty, it might be because of RLS. The user might not be enrolled.
    // The policy returns an empty array, not an error, in this case.
    if (data.length === 0) {
        // To provide a better error message, we can check if the course exists publicly.
        const { data: courseData, error: courseError } = await supabase.from('courses').select('id').eq('id', courseId).single();
        if(!courseData) {
            return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
        }
        return NextResponse.json({ error: 'You are not enrolled in this course or it has no lessons.' }, { status: 403 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
