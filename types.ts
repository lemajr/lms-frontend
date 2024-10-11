export interface BaseUser {
    id: string;
    full_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;
    role: 'student' | 'lecturer' | 'admin';  // Common role field
  }
  
  export interface Student extends BaseUser {
    student_reg_no: string;
    courses: any[]; // You can refine this based on your Course structure
  }
  
  export interface Lecturer extends BaseUser {
    lecturer_id: string;
    courses: any[]; // Similar to Student, refine based on Course structure
  }
  
  export interface Admin extends BaseUser {
    admin_id: string;
  }
  
  export type User = Student | Lecturer | Admin;
  