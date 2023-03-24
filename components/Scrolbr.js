import React, { useState, useEffect } from 'react';
import ScrollProgressBar from 'react-scroll-progress-bar';

export default function Scrolbr() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <ScrollProgressBar  position={scrollPosition} />
      
    </div>
  );
}