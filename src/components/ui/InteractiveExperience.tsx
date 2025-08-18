// src/components/ui/HobbyCard.tsx

import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

// Component นี้จะรับ 'children' ซึ่งก็คือเนื้อหาข้างใน (ปุ่มหรือ div ของ hobby)
export const HobbyCard = ({ children }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,          // เอียงได้สูงสุด (องศา)
        speed: 400,       // ความเร็วในการคืนตัว
        glare: true,      // เปิดเอฟเฟกต์แสงสะท้อน
        "max-glare": 0.5, // ความสว่างสูงสุดของแสงสะท้อน
      });
    }

    // Cleanup function: ทำลาย instance เมื่อ component หายไป
    return () => {
      if (tiltRef.current && tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div ref={tiltRef} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
};
