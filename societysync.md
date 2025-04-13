A User Management
    Login / Signup
    Forgot Password
    User Profile (Edit Profile, Change Password)
Profile Management
Society Management
Noticeboard and Announcement Management
Maintenance & Billing Management
Visitor Management
Complaints & Support Management
Events & Polls
Admin Specific features

UserProfilePage.tsx ==> login user
UserManagementPage.tsx ==> admin user can manage
User List ==> admin user can manage 
User Approval Page ==> Admin user ==> Admin mail ==> 

voting 
polling 

Ticket

Event management 


src/
├── app/                    # Application state and store
│   ├── hooks.ts            # Custom hooks for Redux
│   ├── store.ts            # Redux store configuration
│   └── slices/             # Redux slices
│       ├── authSlice.ts
│       ├── userSlice.ts
│       ├── societySlice.ts
│       ├── noticeSlice.ts
│       ├── maintenanceSlice.ts
│       ├── visitorSlice.ts
│       ├── complaintSlice.ts
│       ├── facilitySlice.ts
│       └── eventSlice.ts
├── assets/                 # Static assets
│   ├── images/
│   └── icons/
├── components/             # Reusable UI components
│   ├── common/             # Common components used across the app Material UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Notification.tsx
│   │   ├── Table.tsx
│   │   └── Tabs.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── auth/              # Authentication components
│   ├── user/              # User-related components
│   ├── society/           # Society-related components
│   ├── notice/            # Notice-related components
│   ├── maintenance/       # Maintenance-related components
│   ├── visitor/           # Visitor-related components
│   ├── complaint/         # Complaint-related components
│   ├── facility/          # Facility-related components
│   └── event/             # Event-related components
├── config/                # Configuration files
│   └── firebase.ts        # Firebase configuration
├── features/              # Feature-specific components/logic
│   ├── auth/              # Authentication feature
│   ├── user/              # User management feature
│   ├── society/           # Society management feature
│   ├── notice/            # Noticeboard feature
│   ├── maintenance/       # Maintenance and billing feature
│   ├── visitor/           # Visitor management feature
│   ├── complaint/         # Complaints and support feature
│   ├── facility/          # Facility booking feature
│   └── event/             # Events and polls feature
├── hooks/                 # Custom hooks
│   ├── useAuth.ts
│   ├── useToast.ts
│   └── useForm.ts
├── pages/                 # Application pages
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── dashboard/
│   │   ├── AdminDashboard.tsx
│   │   ├── ResidentDashboard.tsx
│   │   └── SecurityDashboard.tsx
│   ├── user/
│   │   ├── UserProfilePage.tsx
│   │   └── UserManagementPage.tsx
│   ├── society/
│   │   ├── SocietyOverviewPage.tsx
│   │   ├── SocietyEditPage.tsx
│   │   └── FlatManagementPage.tsx
│   ├── notice/
│   │   ├── NoticeboardPage.tsx
│   │   └── CreateNoticePage.tsx
│   ├── maintenance/
│   │   ├── MaintenancePage.tsx
│   │   ├── InvoicePage.tsx
│   │   └── PaymentHistoryPage.tsx
│   ├── visitor/
│   │   ├── VisitorLogPage.tsx
│   │   └── ApproveVisitorPage.tsx
│   ├── complaint/
│   │   ├── ComplaintPage.tsx
│   │   └── ComplaintStatusPage.tsx
│   ├── facility/
│   │   ├── FacilityListPage.tsx
│   │   └── BookingPage.tsx
│   ├── event/
│   │   ├── EventsPage.tsx
│   │   ├── CreateEventPage.tsx
│   │   └── PollsPage.tsx
│   └── report/
│       ├── FinancialReportPage.tsx
│       ├── VisitorReportPage.tsx
│       └── ComplaintReportPage.tsx
├── services/              # API and service functions
│   ├── authService.ts
│   ├── userService.ts
│   ├── societyService.ts
│   ├── noticeService.ts
│   ├── maintenanceService.ts
│   ├── visitorService.ts
│   ├── complaintService.ts
│   ├── facilityService.ts
│   └── eventService.ts
├── types/                 # TypeScript type definitions
│   ├── auth.types.ts
│   ├── user.types.ts
│   ├── society.types.ts
│   ├── notice.types.ts
│   ├── maintenance.types.ts
│   ├── visitor.types.ts
│   ├── complaint.types.ts
│   ├── facility.types.ts
│   └── event.types.ts
├── utils/                 # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── constants.ts
│   └── helpers.ts
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles
├── routes.tsx             # Application routes
└── vite-env.d.ts         # Vite environment declarations