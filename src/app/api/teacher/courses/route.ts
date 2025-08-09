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

// GET handler to fetch all courses for the logged-in teacher
export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);

    if (!user) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    // RLS policy already ensures a teacher can only see their own courses,
    // but filtering here is good practice and makes the query more efficient.
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('teacher_id', user.id);

    if (error) {
      console.error('Error fetching teacher courses:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
