import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { getMetadata } from '../utils/metadata';

const LINKPREVIEW_API_KEY = '69231dae4b00cc2c2c0e42467d927daf';

const Home = () => {
  const navigate = useNavigate();
  const { user, updateUserScraps, scraps } = useAuth();
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const metadata = await getMetadata(url, LINKPREVIEW_API_KEY);

      const { data: scrapData, error: insertError } = await supabase
        .from('scraps')
        .insert([
          {
            user_id: user.id,
            url: url,
            title: metadata.title || t('common.noTitle'),
            summary: metadata.description || t('common.noDescription'),
            image_url: metadata.image || 'https://via.placeholder.com/400',
            thumbnail_url: metadata.image || 'https://via.placeholder.com/400'
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      if (scrapData) {
        updateUserScraps([scrapData, ...scraps]);
        navigate('/scrapbook');
      }
    } catch (error) {
      console.error('URL scraping error:', error);
      setError(t('home.scrapError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('home.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('home.enterUrl')}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? t('home.scraping') : t('home.scrape')}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {!user && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('home.loginRequired')}{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
              {t('auth.login')}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;