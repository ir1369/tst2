-- Migration to create the core tables for the online learning platform.

-- 1. Categories Table
-- Stores course categories.
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- 2. Courses Table
-- Stores course information.
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  price numeric(10, 2) DEFAULT 0.00,
  thumbnail_url text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_courses_teacher_id ON courses(teacher_id);
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);

-- 3. Lessons Table
-- Stores individual lessons for each course.
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  video_url text,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  "position" integer NOT NULL, -- "position" is a keyword, so it's quoted
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);

-- 4. Enrollments Table
-- Tracks student enrollments in courses.
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  progress jsonb,
  UNIQUE(student_id, course_id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);

-- 5. Course Materials Table
-- Stores downloadable materials for lessons.
CREATE TABLE IF NOT EXISTS course_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_course_materials_lesson_id ON course_materials(lesson_id);

-- Add trigger for updating 'updated_at' on 'courses' table
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add trigger for updating 'updated_at' on 'lessons' table
DROP TRIGGER IF EXISTS update_lessons_updated_at ON lessons;
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =================================================================
-- 6. Row Level Security (RLS) Policies
-- =================================================================

-- Helper function to check if a user is the teacher of a course
CREATE OR REPLACE FUNCTION is_course_teacher(course_id_to_check uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM courses WHERE id = course_id_to_check AND teacher_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if a user is enrolled in a course
CREATE OR REPLACE FUNCTION is_enrolled(course_id_to_check uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM enrollments WHERE course_id = course_id_to_check AND student_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get course_id from lesson_id
CREATE OR REPLACE FUNCTION get_course_id_from_lesson(lesson_id_to_check uuid)
RETURNS uuid AS $$
DECLARE
  course_id_result uuid;
BEGIN
  SELECT course_id INTO course_id_result FROM lessons WHERE id = lesson_id_to_check;
  RETURN course_id_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- -----------------------------------------------------------------
-- RLS for `categories` table
-- -----------------------------------------------------------------
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories" ON categories
  FOR SELECT
  USING (true);
-- Note: Inserting, updating, or deleting categories is restricted to service_role.

-- -----------------------------------------------------------------
-- RLS for `courses` table
-- -----------------------------------------------------------------
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published courses" ON courses
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Teachers can view their own unpublished courses" ON courses
  FOR SELECT
  USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can insert their own courses" ON courses
  FOR INSERT
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Teachers can update their own courses" ON courses
  FOR UPDATE
  USING (teacher_id = auth.uid());

CREATE POLICY "Teachers can delete their own courses" ON courses
  FOR DELETE
  USING (teacher_id = auth.uid());

-- -----------------------------------------------------------------
-- RLS for `lessons` table
-- -----------------------------------------------------------------
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrolled students and teachers can view lessons" ON lessons
  FOR SELECT
  USING (
    is_enrolled(course_id) OR
    is_course_teacher(course_id)
  );

CREATE POLICY "Teachers can insert lessons into their courses" ON lessons
  FOR INSERT
  WITH CHECK (is_course_teacher(course_id));

CREATE POLICY "Teachers can update lessons in their courses" ON lessons
  FOR UPDATE
  USING (is_course_teacher(course_id));

CREATE POLICY "Teachers can delete lessons from their courses" ON lessons
  FOR DELETE
  USING (is_course_teacher(course_id));

-- -----------------------------------------------------------------
-- RLS for `enrollments` table
-- -----------------------------------------------------------------
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own enrollments" ON enrollments
  FOR ALL
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- -----------------------------------------------------------------
-- RLS for `course_materials` table
-- -----------------------------------------------------------------
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrolled students and teachers can view materials" ON course_materials
  FOR SELECT
  USING (
    is_enrolled(get_course_id_from_lesson(lesson_id)) OR
    is_course_teacher(get_course_id_from_lesson(lesson_id))
  );

CREATE POLICY "Teachers can insert materials for their lessons" ON course_materials
  FOR INSERT
  WITH CHECK (is_course_teacher(get_course_id_from_lesson(lesson_id)));

CREATE POLICY "Teachers can update materials for their lessons" ON course_materials
  FOR UPDATE
  USING (is_course_teacher(get_course_id_from_lesson(lesson_id)));

CREATE POLICY "Teachers can delete materials for their lessons" ON course_materials
  FOR DELETE
  USING (is_course_teacher(get_course_id_from_lesson(lesson_id)));
