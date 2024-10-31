import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const ScrapBook = () => {
  const { user, scraps, updateUserScraps } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleDelete = async (scrapId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('scraps')
        .delete()
        .eq('id', scrapId)
        .eq('user_id', user.id);

      if (error) throw error;

      const updatedScraps = scraps.filter(scrap => scrap.id !== scrapId);
      updateUserScraps(updatedScraps);
    } catch (error) {
      console.error('Error deleting scrap:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('scrapbook.title')}</h1>
      
      {scraps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {t('scrapbook.noScraps')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scraps.map((scrap) => (
            <div key={scrap.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {scrap.image_url && (
                <img
                  src={scrap.image_url}
                  alt={scrap.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {scrap.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {scrap.summary}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={scrap.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{t('scrapbook.visit')}</span>
                  </a>
                  <button
                    onClick={() => handleDelete(scrap.id)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>{t('scrapbook.delete')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapBook;