-- ==============================================================================
-- The Serverless Odyssey: PostgreSQL DDL Schema & Sample Seed Data
-- 3 Relational Tables: profiles -> projects -> tasks
-- ==============================================================================

-- 1. Ekstensi UUID & Triggers
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Fungsi otomatis pembaruan timestamp updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Tipe Enum Status Tugas
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
    CREATE TYPE public.task_status AS ENUM ('todo', 'in_progress', 'done');
  END IF;
END $$;

-- 3. Tabel 1: profiles (UUID v4 mandiri, persiapan disambungkan ke auth.users Minggu 5)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS on_profiles_updated_at ON public.profiles;
CREATE TRIGGER on_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Tabel 2: projects (FK -> profiles)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  budget NUMERIC NOT NULL DEFAULT 0 CHECK (budget >= 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_profile_id ON public.projects(profile_id);

DROP TRIGGER IF EXISTS on_projects_updated_at ON public.projects;
CREATE TRIGGER on_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 5. Tabel 3: tasks (FK -> projects)
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status public.task_status NOT NULL DEFAULT 'todo',
  xp_reward INTEGER NOT NULL DEFAULT 100 CHECK (xp_reward >= 0),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);

DROP TRIGGER IF EXISTS on_tasks_updated_at ON public.tasks;
CREATE TRIGGER on_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- SEED DATA CONTOH (Tanpa menyentuh auth.users, langsung siap pakai!)
-- ==============================================================================

-- Seed Profile (1 Pengembang Utama)
INSERT INTO public.profiles (id, full_name, username, avatar_url, role)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Bintang S.',
  'bintang_odyssey',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Lead Cloud Architect'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Projects (3 Proyek Serverless Lengkap)
INSERT INTO public.projects (id, profile_id, name, slug, description, budget, status)
VALUES
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Arsitektur Serverless Odyssey Core',
    'serverless-odyssey-core',
    'Infrastruktur fondasi Next.js 16 App Router, Turbopack, dan manajemen environment secrets berskala enterprise.',
    5000000,
    'active'
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'PostgreSQL Supabase & RLS Engine',
    'supabase-rls-engine',
    'Implementasi basis data relasional terdistribusi, Row-Level Security JWT, dan migrasi skema deklaratif.',
    3500000,
    'active'
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Cloudinary CDN Media Pipeline',
    'cloudinary-media-pipeline',
    'Alur optimasi aset digital real-time, kompresi cerdas AVIF/WebP, dan pengiriman multi-region global.',
    2500000,
    'active'
  )
ON CONFLICT (id) DO NOTHING;

-- Seed Tasks (6 Tasks Berelasi Realistis)
INSERT INTO public.tasks (id, project_id, title, description, status, xp_reward, due_date)
VALUES
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e55',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22',
    'Konfigurasi Zero-Leakage Git Ignore & Environment',
    'Audit ketat proteksi .env dan pembuatan .env.example standar perkuliahan.',
    'done',
    150,
    NOW() + INTERVAL '2 days'
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f66',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22',
    'Setup Route Groups (dashboard) & Shell Layout',
    'Implementasi navigasi sticky glassmorphism dan Dark Mode Switcher.',
    'done',
    200,
    NOW() + INTERVAL '4 days'
  ),
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33',
    'Penyusunan DDL Schema 3 Tabel (profiles, projects, tasks)',
    'Rancang foreign key cascade, check constraints budget, dan indexes B-Tree.',
    'done',
    250,
    NOW() + INTERVAL '6 days'
  ),
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380b88',
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33',
    'Penerapan Row Level Security (RLS) Berbasis Auth UID',
    'Isolasi data antar pengguna menggunakan Supabase policy expressions.',
    'in_progress',
    300,
    NOW() + INTERVAL '9 days'
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380c99',
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44',
    'Integrasi Upload Preset Cloudinary Tanpa Server',
    'Implementasi signed/unsigned direct client upload ke Cloudinary CDN.',
    'in_progress',
    200,
    NOW() + INTERVAL '12 days'
  ),
  (
    'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380d10',
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d44',
    'Optimasi Pengiriman Media Otomatis AVIF/WebP',
    'Konfigurasi transformasi dinamis berbasis resolusi viewport perangkat klien.',
    'todo',
    180,
    NOW() + INTERVAL '15 days'
  )
ON CONFLICT (id) DO NOTHING;
