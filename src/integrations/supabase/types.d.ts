
import { Database } from './types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type TeacherDetail = Database['public']['Tables']['teacher_details']['Row'];
export type StudentDetail = Database['public']['Tables']['student_details']['Row'];
export type Course = Database['public']['Tables']['courses']['Row'];
export type Assignment = Database['public']['Tables']['assignments']['Row'];
export type Submission = Database['public']['Tables']['submissions']['Row'];
export type Enrollment = Database['public']['Tables']['enrollments']['Row'];
export type Grade = Database['public']['Tables']['grades']['Row'];
export type Department = Database['public']['Tables']['departments']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Announcement = Database['public']['Tables']['announcements']['Row'];
export type UserRole = Database['public']['Enums']['user_role'];
