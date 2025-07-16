import React, { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAndroidPrompt, setShowAndroidPrompt] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isInStandaloneMode = () =>
    'standalone' in window.navigator && window.navigator.standalone;

  useEffect(() => {
    // Android: handle beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowAndroidPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // iOS: check manually
    if (isIos() && !isInStandaloneMode()) {
      setShowIosPrompt(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowAndroidPrompt(false);
      });
    }
  };

  if (!showAndroidPrompt && !showIosPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-100 text-black p-4 rounded-lg shadow-lg z-50 text-sm sm:text-base">
      {showAndroidPrompt && (
        <div>
          📲 <strong>Install this app?</strong> Click below to add to your home screen.
          <button
            onClick={installApp}
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Install
          </button>
          <button
            className="ml-2 text-red-600 font-bold"
            onClick={() => setShowAndroidPrompt(false)}
          >
            ×
          </button>
        </div>
      )}

      {showIosPrompt && (
        <div>
          📲 <strong>Install this app:</strong> Tap the <span className="font-bold">Share</span> icon
          <span className="px-1">🔗</span> then <strong>“Add to Home Screen”</strong>
          <button
            className="ml-4 float-right text-red-500 font-bold"
            onClick={() => setShowIosPrompt(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
