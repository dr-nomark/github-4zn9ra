import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
        <Globe className="h-4 w-4" />
        <span>{i18n.language === 'ko' ? '한국어' : 'English'}</span>
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <button
          onClick={() => changeLanguage('ko')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
        >
          한국어
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;