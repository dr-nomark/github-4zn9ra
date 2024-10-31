import React from 'react';

const IronmanLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* 아이언맨 헬멧 */}
        <div className="absolute inset-0">
          <div className="w-24 h-24 rounded-full bg-red-500 animate-pulse">
            {/* 얼굴 마스크 */}
            <div className="absolute inset-2 bg-gradient-to-b from-red-600 to-red-700 rounded-full">
              {/* 눈 영역 */}
              <div className="absolute top-6 left-0 w-full flex justify-center space-x-5">
                <div className="w-4 h-2 bg-blue-400 rounded-full animate-blink"></div>
                <div className="w-4 h-2 bg-blue-400 rounded-full animate-blink delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IronmanLoader;