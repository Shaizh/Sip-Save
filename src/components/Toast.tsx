import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-sage shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-terracotta shrink-0" />,
    info: <Info className="w-5 h-5 text-caramel shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-warm-white border border-sage/30 text-charcoal shadow-lg',
    error: 'bg-warm-white border border-terracotta/30 text-charcoal shadow-lg',
    info: 'bg-warm-white border border-caramel/30 text-charcoal shadow-lg',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md transition-all ${bgStyles[toast.type]}`}
      >
        {icons[toast.type]}
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  );
};
