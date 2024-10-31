import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookMarked, LogIn, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookMarked className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">{t('nav.appName')}</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <LanguageSelector />
            {user ? (
              <>
                <Link to="/scrapbook" className="text-gray-700 hover:text-indigo-600">
                  {t('nav.myScraps')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('auth.logout')}</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <LogIn className="h-4 w-4" />
                <span>{t('auth.login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;