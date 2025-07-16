import React, { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    const inStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone;
    setIsIos(ios && !inStandaloneMode);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setShowPrompt(false);
        setDeferredPrompt(null);
      });
    }
  };

  const handleClose = () => setShowPrompt(false);

  if (isInstalled || (!showPrompt && !isIos)) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 flex items-start justify-between z-50 border dark:border-slate-600">
      <div className="text-sm text-gray-800 dark:text-gray-200 pr-4 max-w-[90%]">
        📲 <strong>Install Cashmate</strong><br />
        {isIos ? (
          <>
            Open in Safari → Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
          </>
        ) : (
          <>
            Tap the button below to install this app on your Android phone.
            <div className="mt-2">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Install
              </button>
            </div>
          </>
        )}
      </div>
      <button
        onClick={handleClose}
        className="text-gray-500 hover:text-red-500 ml-2 text-lg font-bold"
        title="Close"
      >
        ✕
      </button>
    </div>
  );
}
