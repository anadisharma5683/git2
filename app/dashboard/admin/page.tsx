import AdminDashboard from '../../components/dashboard/AdminDashboard';
import { mockUsers } from '../../mockData';

const AdminDashboardPage = () => {
  const adminUser = mockUsers.find(u => u.role === 'admin' || u.role === 'tpo') || mockUsers[2];

  return (
    <AdminDashboard userId={adminUser.id} />
  );
};

export default AdminDashboardPage;