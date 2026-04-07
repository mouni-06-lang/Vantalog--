import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import PageTransitionWrapper from './components/PageTransitionWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './components/RootLayout';
// Route configuration for Vantalog application
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminRequest from './pages/AdminRequest';
import UserAuthenticator from './pages/UserAuthenticator';
import AdminAuthenticator from './pages/AdminAuthenticator';
import About from './pages/About';
import Contact from './pages/Contact';
import Browse from './pages/Browse';
import BrowseCategory from './pages/BrowseCategory';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminDashboard from './pages/admin/AdminDashboard';
import UploadResource from './pages/admin/UploadResource';
import ResourceManagement from './pages/admin/ResourceManagement';
import UserAccessManagement from './pages/admin/UserAccessManagement';
import FeedbackReview from './pages/admin/FeedbackReview';
import AdminProfile from './pages/admin/AdminProfile';
import UserHome from './pages/user/UserHome';
import SearchResults from './pages/user/SearchResults';
import ResourceDetail from './pages/user/ResourceDetail';
import UserProfile from './pages/user/UserProfile';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/Vantalog/User/Log-In" replace />
      },
      // User Login/Sign-Up Routes
      {
        path: "Vantalog/User/Log-In",
        element: <PageTransitionWrapper duration={5000}><Login /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/User/Sign-In",
        element: <PageTransitionWrapper duration={5000}><Login /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/User/Sign-Up",
        element: <PageTransitionWrapper duration={5000}><Login /></PageTransitionWrapper>
      },
      // Admin Login/Sign-Up Routes
      {
        path: "Vantalog/Admin/Log-In",
        element: <PageTransitionWrapper duration={5000}><Login /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Admin/Sign-Up",
        element: <PageTransitionWrapper duration={5000}><AdminRequest /></PageTransitionWrapper>
      },
      // Forgot Password Route
      {
        path: "Vantalog/Auth/Forgot-Password",
        element: <PageTransitionWrapper duration={5000}><ForgotPassword /></PageTransitionWrapper>
      },
      // Legacy route for backward compatibility
      {
        path: "Vantalog/Log-In",
        element: <Navigate to="/Vantalog/User/Log-In" replace />
      },
      {
        path: "admin-request",
        element: <Navigate to="/Vantalog/Admin/Sign-Up" replace />
      },
      {
        path: "Vantalog/User/authenticator-page",
        element: <PageTransitionWrapper duration={5000}><UserAuthenticator /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Admin/authenticator-page",
        element: <PageTransitionWrapper duration={5000}><AdminAuthenticator /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/About/About-Us",
        element: <PageTransitionWrapper duration={5000}><About /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/About/Contact",
        element: <PageTransitionWrapper duration={5000}><Contact /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Contact/Contact-Us",
        element: <PageTransitionWrapper duration={5000}><Contact /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Resources/Browse",
        element: <PageTransitionWrapper duration={5000}><Browse /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Resources/Categories",
        element: <PageTransitionWrapper duration={5000}><BrowseCategory /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Browse-Category/:category",
        element: <PageTransitionWrapper duration={5000}><BrowseCategory /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Help-Center",
        element: <PageTransitionWrapper duration={5000}><HelpCenter /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Support/Help-Center",
        element: <PageTransitionWrapper duration={5000}><HelpCenter /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/FAQ",
        element: <PageTransitionWrapper duration={5000}><FAQ /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Support/FAQ",
        element: <PageTransitionWrapper duration={5000}><FAQ /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Privacy-Policy",
        element: <PageTransitionWrapper duration={5000}><Privacy /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Legal/Privacy",
        element: <PageTransitionWrapper duration={5000}><Privacy /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Terms-of-Service",
        element: <PageTransitionWrapper duration={5000}><Terms /></PageTransitionWrapper>
      },
      {
        path: "Vantalog/Legal/Terms",
        element: <PageTransitionWrapper duration={5000}><Terms /></PageTransitionWrapper>
      },
      // Admin Routes
      {
        path: "Vantalog/Admin/:name/:email/Dashboard",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={5000}><AdminDashboard /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/Admin/:name/:email/Upload-Resource",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={5000}><UploadResource /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/Admin/:name/:email/Resource-Management",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={5000}><ResourceManagement /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/Admin/:name/:email/User-Access",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={5000}><UserAccessManagement /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/Admin/:name/:email/Feedback-Review",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={5000}><FeedbackReview /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/Admin/:name/:email/Profile",
        element: <ProtectedRoute role="admin"><PageTransitionWrapper duration={5000}><AdminProfile /></PageTransitionWrapper></ProtectedRoute>
      },
      // User Routes
      {
        path: "Vantalog/User/:name/:email/Home",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={5000}><UserHome /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/User/:name/:email/Search",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={5000}><SearchResults /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/User/:name/:email/Resource/:id",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={5000}><ResourceDetail /></PageTransitionWrapper></ProtectedRoute>
      },
      {
        path: "Vantalog/User/:name/:email/Profile",
        element: <ProtectedRoute role="user"><PageTransitionWrapper duration={5000}><UserProfile /></PageTransitionWrapper></ProtectedRoute>
      }
    ]
  }
]);