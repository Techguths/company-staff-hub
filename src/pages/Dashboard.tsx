import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CompanyDashboard from '@/components/dashboard/CompanyDashboard';
import StaffDashboard from '@/components/dashboard/StaffDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {user?.role === 'company' ? <CompanyDashboard /> : <StaffDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
