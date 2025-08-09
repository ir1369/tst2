import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET handler to fetch all comments for a lesson
export async function GET(request: NextRequest, { params }: { params: { id:string } }) {
  try {
    const lessonId = params.id;
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication is required.' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        return NextResponse.json({ error: 'Bearer token is missing' }, { status: 401 });
    }

    // Create a new Supabase client with the user's auth token to enforce RLS
    const supabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    // RLS policy ensures only enrolled students can see comments.
    const { data, error } = await supabaseClient
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        parent_comment_id,
        users ( id, first_name, last_name )
      `)
      .eq('lesson_id', lessonId)
      .is('parent_comment_id', null) // Fetch only top-level comments
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Here you could also fetch replies, but for now we keep it simple.

    return NextResponse.json(data);
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

// POST handler to create a new comment for a lesson
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const lessonId = params.id;
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
        const { content, parent_comment_id } = body;

        if (!content) {
            return NextResponse.json({ error: 'Comment content cannot be empty.' }, { status: 400 });
        }

        // Create a new Supabase client with the user's auth token to enforce RLS
        const supabaseClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        );

        const { data, error } = await supabaseClient
            .from('comments')
            .insert({
                lesson_id: lessonId,
                user_id: user.id,
                content,
                parent_comment_id,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating comment:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });

    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
