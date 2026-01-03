import StudentDashboard from '../../components/dashboard/StudentDashboard';
import { mockUsers } from '../../mockData';

const StudentDashboardPage = () => {
  const studentUser = mockUsers.find(u => u.role === 'student') || mockUsers[0];

  return (
    <StudentDashboard userId={studentUser.id} />
  );
};

export default StudentDashboardPage;