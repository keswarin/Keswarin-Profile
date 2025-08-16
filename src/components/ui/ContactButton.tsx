// src/components/ui/ContactButton.tsx

import React from 'react';
import { LucideProps } from 'lucide-react';
import './ContactButton.css';

interface ContactButtonProps {
  icon: React.ComponentType<LucideProps>;
  label: string;
  href: string;
  hoverBgColor: string; 
}

export function ContactButton({ icon: Icon, label, href, hoverBgColor }: ContactButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-button-3d group"
    >
      <div className="tile-wrapper">
        <div className="tile-face">
          <Icon className="h-6 w-6 text-white" />
          <span className="font-semibold">{label}</span>
        </div>
        <div className={`tile-edge ${hoverBgColor}`}></div>
      </div>
    </a>
  );
}