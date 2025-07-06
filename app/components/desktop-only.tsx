'use client';

import { useState, useEffect } from 'react';

interface DesktopOnlyProps {
  children: React.ReactNode;
  minWidth?: number;
}

const DesktopOnly: React.FC<DesktopOnlyProps> = ({ children, minWidth = 1024 }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= minWidth);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, [minWidth]);

  if (!isDesktop) {
    return null;
  }

  return <>{children}</>;
};

export default DesktopOnly;