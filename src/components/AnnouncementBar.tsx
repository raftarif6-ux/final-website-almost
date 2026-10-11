import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="w-full bg-[#0c0e11] py-2.5 px-6 border-b border-[#2A3441]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6ed6e2]"></span>
          <span className="font-['Geist'] text-[10px] uppercase tracking-widest text-[#c2c6d3] font-semibold">
            Archival Edition v4.2 Release
          </span>
        </div>
        <div className="text-center">
          <span className="font-['Geist'] text-[10px] uppercase tracking-[0.2em] text-[#a8c8ff] font-semibold">
            Your next digital opportunity starts here
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-[#8c919d] font-['Geist'] text-[10px] uppercase tracking-wider">
          <span>Instant DRM-Free Delivery</span>
        </div>
      </div>
    </aside>
  );
};
