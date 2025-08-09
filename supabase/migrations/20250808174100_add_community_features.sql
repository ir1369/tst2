-- Migration to add community features: reviews and comments.

-- 1. Reviews Table
-- Stores ratings and reviews for courses.
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, user_id) -- A user can only review a course once
);
CREATE INDEX IF NOT EXISTS idx_reviews_course_id ON reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

-- 2. Comments Table
-- Stores questions and comments for lessons.
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id uuid REFERENCES comments(id) ON DELETE CASCADE, -- For threading/replies
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_comments_lesson_id ON comments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- =================================================================
-- RLS Policies for Community Features
-- =================================================================

-- RLS for `reviews` table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Enrolled users can create a review" ON reviews
  FOR INSERT
  WITH CHECK (is_enrolled(course_id)); -- is_enrolled function is from a previous migration

CREATE POLICY "Users can update their own review" ON reviews
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own review" ON reviews
  FOR DELETE
  USING (user_id = auth.uid());

-- RLS for `comments` table
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Helper function to check if a user is enrolled in the course associated with a lesson
CREATE OR REPLACE FUNCTION is_enrolled_in_lesson_course(lesson_id_to_check uuid)
RETURNS boolean AS $$
BEGIN
  RETURN is_enrolled(get_course_id_from_lesson(lesson_id_to_check)); -- re-using helper functions
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE POLICY "Enrolled users can view comments" ON comments
  FOR SELECT
  USING (is_enrolled_in_lesson_course(lesson_id));

CREATE POLICY "Enrolled users can create comments" ON comments
  FOR INSERT
  WITH CHECK (is_enrolled_in_lesson_course(lesson_id));

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE
  USING (user_id = auth.uid());
