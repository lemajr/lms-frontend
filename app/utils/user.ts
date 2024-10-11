import { Student, Lecturer, Admin, User } from "@/types"

// Type guard to check if user is a Student
export function isStudent(user: User): user is Student {
  return user.role === 'student';
}

// Type guard to check if user is a Lecturer
export function isLecturer(user: User): user is Lecturer {
  return user.role === 'lecturer';
}

// Type guard to check if user is an Admin
export function isAdmin(user: User): user is Admin {
  return user.role === 'admin';
}
