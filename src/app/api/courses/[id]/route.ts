import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { type NextRequest } from 'next/server'

// Helper function to get user from token
async function getUser(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split('Bearer ')[1];
    if (!token) return null;

    const { data: { user } } = await supabase.auth.getUser(token);
    return user;
}

// GET handler to fetch a single course
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const courseId = params.id;
        const user = await getUser(request);

        // Create a client instance with the user's token if they are authenticated
        // This ensures RLS policies for viewing unpublished courses are applied correctly.
        const supabaseClient = user
            ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
                global: { headers: { Authorization: `Bearer ${request.headers.get('Authorization')?.split('Bearer ')[1]}` } },
            })
            : supabase; // Fallback to the anonymous client for public access

        const { data, error } = await supabaseClient
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (error) {
            // RLS will return an error if the user is not allowed to view the course
            console.error('Error fetching course:', error);
            return NextResponse.json({ error: 'Course not found or access denied' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

// PATCH handler to update a course
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const courseId = params.id;
        const user = await getUser(request);

        if (!user) {
            return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
        }

        const body = await request.json();

        // The RLS policy ensures that only the teacher who owns the course can update it.
        // The `teacher_id` check is handled by the database policy.
        const { data, error } = await supabase
            .from('courses')
            .update(body)
            .eq('id', courseId)
            .select()
            .single();

        if (error) {
            console.error('Error updating course:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}

// DELETE handler to delete a course
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const courseId = params.id;
        const user = await getUser(request);

        if (!user) {
            return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
        }

        // RLS policy will ensure only the owner can delete.
        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', courseId);

        if (error) {
            console.error('Error deleting course:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 });

    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
// Note: I had to re-import createClient because it's not exported from the main supabase lib
import { createClient } from '@supabase/supabase-js';
