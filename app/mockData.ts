// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'tpo';
  department?: string;
  year?: number;
  enrollmentNumber?: string;
}

export interface Opportunity {
  id: string;
  companyName: string;
  role: string;
  stipend: string;
  location: string;
  type: 'internship' | 'placement';
  deadline: string;
  description: string;
  requirements: string[];
  postedDate: string;
  status: 'active' | 'closed' | 'filled';
}

export interface Application {
  id: string;
  studentId: string;
  opportunityId: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  appliedDate: string;
  lastUpdated: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: number;
  enrollmentNumber: string;
  cgpa: number;
  applications: Application[];
  skills: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'student',
    department: 'Computer Science',
    year: 3,
    enrollmentNumber: 'CS21001'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    role: 'student',
    department: 'Electronics',
    year: 4,
    enrollmentNumber: 'EC21002'
  },
  {
    id: 'admin-1',
    name: 'Dr. Robert Wilson',
    email: 'robert.wilson@university.edu',
    role: 'admin',
  },
  {
    id: 'tpo-1',
    name: 'Ms. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'tpo',
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    companyName: 'Google',
    role: 'Software Engineering Intern',
    stipend: '₹50,000/month',
    location: 'Bangalore, India',
    type: 'internship',
    deadline: '2026-02-15',
    description: 'Work on cutting-edge technologies and contribute to Google\'s products and services.',
    requirements: ['Strong programming skills', 'Knowledge of algorithms', 'Good problem-solving skills'],
    postedDate: '2026-01-01',
    status: 'active'
  },
  {
    id: 'opp-2',
    companyName: 'Microsoft',
    role: 'Software Development Engineer',
    stipend: '₹35,000/month + benefits',
    location: 'Hyderabad, India',
    type: 'internship',
    deadline: '2026-02-28',
    description: 'Join Microsoft\'s engineering team to develop innovative solutions.',
    requirements: ['Strong programming skills', 'Knowledge of data structures', 'Experience with cloud technologies'],
    postedDate: '2026-01-02',
    status: 'active'
  },
  {
    id: 'opp-3',
    companyName: 'Amazon',
    role: 'SDE Intern',
    stipend: '₹45,000/month',
    location: 'Seattle, USA',
    type: 'internship',
    deadline: '2026-01-30',
    description: 'Work on Amazon\'s e-commerce platform and contribute to the customer experience.',
    requirements: ['Strong programming skills', 'Knowledge of system design', 'Experience with AWS'],
    postedDate: '2026-01-03',
    status: 'active'
  },
  {
    id: 'opp-4',
    companyName: 'Meta',
    role: 'Software Engineer',
    stipend: '₹40,000/month',
    location: 'Menlo Park, USA',
    type: 'internship',
    deadline: '2026-03-15',
    description: 'Work on Meta\'s products and services to connect people around the world.',
    requirements: ['Strong programming skills', 'Experience with React', 'Knowledge of full-stack development'],
    postedDate: '2026-01-04',
    status: 'active'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    studentId: 'user-1',
    opportunityId: 'opp-1',
    status: 'applied',
    appliedDate: '2026-01-03',
    lastUpdated: '2026-01-03'
  },
  {
    id: 'app-2',
    studentId: 'user-1',
    opportunityId: 'opp-2',
    status: 'interviewing',
    appliedDate: '2026-01-02',
    lastUpdated: '2026-01-04'
  },
  {
    id: 'app-3',
    studentId: 'user-2',
    opportunityId: 'opp-3',
    status: 'offered',
    appliedDate: '2026-01-01',
    lastUpdated: '2026-01-04'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    department: 'Computer Science',
    year: 3,
    enrollmentNumber: 'CS21001',
    cgpa: 8.7,
    applications: [
      {
        id: 'app-1',
        studentId: 'user-1',
        opportunityId: 'opp-1',
        status: 'applied',
        appliedDate: '2026-01-03',
        lastUpdated: '2026-01-03'
      },
      {
        id: 'app-2',
        studentId: 'user-1',
        opportunityId: 'opp-2',
        status: 'interviewing',
        appliedDate: '2026-01-02',
        lastUpdated: '2026-01-04'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    department: 'Electronics',
    year: 4,
    enrollmentNumber: 'EC21002',
    cgpa: 9.2,
    applications: [
      {
        id: 'app-3',
        studentId: 'user-2',
        opportunityId: 'opp-3',
        status: 'offered',
        appliedDate: '2026-01-01',
        lastUpdated: '2026-01-04'
      }
    ],
    skills: ['C++', 'Embedded Systems', 'Python', 'Verilog', 'MATLAB']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'not-1',
    title: 'New Opportunity Added',
    message: 'Google has posted a new Software Engineering Intern position',
    type: 'info',
    timestamp: '2026-01-04T10:00:00Z',
    read: false
  },
  {
    id: 'not-2',
    title: 'Application Status Update',
    message: 'Your application for Microsoft SDE position is under review',
    type: 'success',
    timestamp: '2026-01-04T09:30:00Z',
    read: true
  },
  {
    id: 'not-3',
    title: 'Interview Scheduled',
    message: 'You have an interview scheduled with Amazon for tomorrow at 10:00 AM',
    type: 'warning',
    timestamp: '2026-01-03T15:45:00Z',
    read: false
  }
];