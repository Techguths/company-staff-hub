import React, { createContext, useContext } from 'react';
import { useSimulatedData, Student, StaffMember, Session } from '@/hooks/useSimulatedData';

interface DataContextType {
  students: Student[];
  staff: StaffMember[];
  sessions: Session[];
  addStudent: (student: Omit<Student, 'id'>) => Student;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addStaff: (member: Omit<StaffMember, 'id'>) => StaffMember;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;
  addSession: (session: Omit<Session, 'id'>) => Session;
  startSession: (id: string) => void;
  endSession: (id: string, notes?: string) => void;
  joinSession: (id: string) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = useSimulatedData();

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
