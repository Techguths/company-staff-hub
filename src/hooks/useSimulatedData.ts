import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface Student {
  id: string;
  name: string;
  email: string;
  currentSurah: string;
  progress: number;
  status: 'active' | 'inactive';
  tutor: string;
  phone?: string;
  enrollmentDate?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  students: number;
  status: 'active' | 'inactive';
}

export interface Session {
  id: string;
  student: string;
  tutor: string;
  time: string;
  duration: string;
  surah: string;
  status: 'scheduled' | 'ready' | 'in_progress' | 'completed';
  notes?: string;
  attendance?: boolean;
}

const initialStudents: Student[] = [
  { id: '1', name: 'Ahmed Ali', email: 'ahmed@email.com', currentSurah: 'Al-Baqarah', progress: 45, status: 'active', tutor: 'Ahmad Hassan', phone: '+1 234 567 001', enrollmentDate: '2024-01-15' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@email.com', currentSurah: 'Al-Imran', progress: 32, status: 'active', tutor: 'Ahmad Hassan', phone: '+1 234 567 002', enrollmentDate: '2024-02-20' },
  { id: '3', name: 'Omar Khalid', email: 'omar@email.com', currentSurah: 'An-Nisa', progress: 78, status: 'active', tutor: 'Sara Ahmed', phone: '+1 234 567 003', enrollmentDate: '2024-01-10' },
  { id: '4', name: 'Maryam Yusuf', email: 'maryam@email.com', currentSurah: 'Al-Maidah', progress: 15, status: 'inactive', tutor: 'Ahmad Hassan', phone: '+1 234 567 004', enrollmentDate: '2024-03-05' },
  { id: '5', name: 'Aisha Rahman', email: 'aisha@email.com', currentSurah: 'Al-Kahf', progress: 92, status: 'active', tutor: 'Sara Ahmed', phone: '+1 234 567 005', enrollmentDate: '2023-12-01' },
];

const initialStaff: StaffMember[] = [
  { id: '1', name: 'Ahmad Hassan', email: 'ahmad@academy.com', phone: '+1 234 567 890', role: 'Senior Tutor', students: 18, status: 'active' },
  { id: '2', name: 'Sara Ahmed', email: 'sara@academy.com', phone: '+1 234 567 891', role: 'Tutor', students: 15, status: 'active' },
  { id: '3', name: 'Khalid Noor', email: 'khalid@academy.com', phone: '+1 234 567 892', role: 'Tutor', students: 12, status: 'active' },
  { id: '4', name: 'Amina Yusuf', email: 'amina@academy.com', phone: '+1 234 567 893', role: 'Coordinator', students: 0, status: 'active' },
  { id: '5', name: 'Omar Farooq', email: 'omar@academy.com', phone: '+1 234 567 894', role: 'Tutor', students: 10, status: 'inactive' },
];

const initialSessions: Session[] = [
  { id: '1', student: 'Ahmed Ali', tutor: 'Ahmad Hassan', time: '09:00 AM', duration: '45 min', surah: 'Al-Baqarah (142-150)', status: 'completed', attendance: true, notes: 'Good progress on memorization' },
  { id: '2', student: 'Fatima Hassan', tutor: 'Ahmad Hassan', time: '10:30 AM', duration: '45 min', surah: 'Al-Imran (1-20)', status: 'in_progress' },
  { id: '3', student: 'Omar Khalid', tutor: 'Sara Ahmed', time: '02:00 PM', duration: '45 min', surah: 'An-Nisa (23-35)', status: 'ready' },
  { id: '4', student: 'Maryam Yusuf', tutor: 'Ahmad Hassan', time: '03:30 PM', duration: '45 min', surah: 'Al-Maidah (1-10)', status: 'scheduled' },
];

export const useSimulatedData = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  // Student operations
  const addStudent = useCallback((student: Omit<Student, 'id'>) => {
    const newStudent = { ...student, id: `student-${Date.now()}` };
    setStudents(prev => [...prev, newStudent]);
    toast.success(`Student "${student.name}" added successfully`);
    return newStudent;
  }, []);

  const updateStudent = useCallback((id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    toast.success('Student updated successfully');
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    toast.success('Student removed successfully');
  }, []);

  // Staff operations
  const addStaff = useCallback((member: Omit<StaffMember, 'id'>) => {
    const newStaff = { ...member, id: `staff-${Date.now()}` };
    setStaff(prev => [...prev, newStaff]);
    toast.success(`Staff member "${member.name}" added successfully`);
    return newStaff;
  }, []);

  const updateStaff = useCallback((id: string, updates: Partial<StaffMember>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    toast.success('Staff member updated successfully');
  }, []);

  const deleteStaff = useCallback((id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    toast.success('Staff member removed successfully');
  }, []);

  // Session operations
  const addSession = useCallback((session: Omit<Session, 'id'>) => {
    const newSession = { ...session, id: `session-${Date.now()}` };
    setSessions(prev => [...prev, newSession]);
    toast.success('Session scheduled successfully');
    return newSession;
  }, []);

  const startSession = useCallback((id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'in_progress' as const } : s
    ));
    toast.success('Session started');
  }, []);

  const endSession = useCallback((id: string, notes?: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'completed' as const, notes, attendance: true } : s
    ));
    toast.success('Session completed');
  }, []);

  const joinSession = useCallback((id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session?.status === 'in_progress') {
      toast.success(`Joined session with ${session.student}`);
    } else {
      toast.error('Cannot join - session is not in progress');
    }
  }, [sessions]);

  const updateSession = useCallback((id: string, updates: Partial<Session>) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    toast.success('Session updated');
  }, []);

  return {
    students,
    staff,
    sessions,
    addStudent,
    updateStudent,
    deleteStudent,
    addStaff,
    updateStaff,
    deleteStaff,
    addSession,
    startSession,
    endSession,
    joinSession,
    updateSession,
  };
};
