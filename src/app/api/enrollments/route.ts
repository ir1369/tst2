import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { type NextRequest } from 'next/server';

async function getUser(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split('Bearer ')[1];
    if (!token) return null;

    const { data: { user } } = await supabase.auth.getUser(token);
    return user;
}

// POST handler to create a new enrollment
export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);

    if (!user) {
      return NextResponse.json({ error: 'Authentication is required to enroll.' }, { status: 401 });
    }

    const body = await request.json();
    const { course_id } = body;

    if (!course_id) {
      return NextResponse.json({ error: 'Course ID is required.' }, { status: 400 });
    }

    // RLS policy ensures a user can only create an enrollment for themself (student_id = auth.uid())
    // and that they can't enroll in the same course twice (UNIQUE constraint).
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        course_id: course_id,
        student_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating enrollment:', error);
      if (error.code === '23505') { // Unique violation
        return NextResponse.json({ error: 'You are already enrolled in this course.' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });

  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
