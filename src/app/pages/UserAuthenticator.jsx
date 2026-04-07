import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import Authenticator from '@/app/components/Authenticator';
import { useEffect } from 'react';

export default function UserAuthenticator() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Check if there's pending authentication
  useEffect(() => {
    const pendingAuth = sessionStorage.getItem('pending_auth');
    if (!pendingAuth) {
      // No pending auth, redirect to login
      navigate('/');
    }
  }, [navigate]);

  const handleAuthSuccess = async () => {
    const pendingAuth = sessionStorage.getItem('pending_auth');
    if (!pendingAuth) {
      navigate('/');
      return;
    }

    const authData = JSON.parse(pendingAuth);
    
    // Now perform actual login/registration after successful verification
    let userData;
    try {
      if (authData.isLogin) {
        userData = await login(authData.email, authData.password, authData.role);
      } else {
        userData = await register(authData.name, authData.email, authData.password, authData.role);
      }
    } catch (error) {
      alert(error.message || 'Authentication failed. Please try again.');
      return;
    }

    // Clear pending auth
    sessionStorage.removeItem('pending_auth');

    // Set flag to trigger book animation on dashboard entry
    sessionStorage.setItem('show_auth_transition', 'true');

    // If registering as admin, go to admin request page
    if (authData.role === 'admin' && !authData.isLogin) {
      navigate('/admin-request');
    } else {
      // Navigate to appropriate dashboard with dynamic URL using the returned userData
      const userName = encodeURIComponent(userData.name.replace(/\s+/g, '-'));
      const userEmail = encodeURIComponent(userData.email);
      navigate(`/Vantalog/User/${userName}/${userEmail}/Home`);
    }
  };

  const handleBackToLogin = () => {
    sessionStorage.removeItem('pending_auth');
    navigate('/Vantalog/User/Log-In');
  };

  return (
    <Authenticator 
      onSuccess={handleAuthSuccess}
      onBack={handleBackToLogin}
    />
  );
}
