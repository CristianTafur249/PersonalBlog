import React, { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);


  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-5012441343452330"
      data-ad-slot="5012441343452330"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;
