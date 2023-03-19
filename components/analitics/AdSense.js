import React, { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="your-client-id"
      data-ad-slot="your-slot-id"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;
