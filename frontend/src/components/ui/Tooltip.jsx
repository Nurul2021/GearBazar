"use client";

import { useState } from 'react';
import { Info } from 'lucide-react';
import { Transition } from '@headlessui/react';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top',
  className = '',
  ...props 
}) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="inline-flex items-center group relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      {...props}
    >
      {children || (
        <div className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-help group-hover:scale-110">
          <Info className="w-5 h-5" />
        </div>
      )}
      
      <Transition
        show={show}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className={`absolute z-50 whitespace-nowrap bg-slate-900 dark:bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl shadow-slate-900/20 pointer-events-none select-none ${
          position === 'top' ? '-translate-y-full translate-y-2 left-1/2 -translate-x-1/2' :
          position === 'right' ? 'translate-x-full translate-x-2 -translate-y-1/2 left-full' :
          position === 'bottom' ? 'translate-y-full translate-y-2 left-1/2 -translate-x-1/2' :
          ' -translate-x-full -translate-x-2 -translate-y-1/2 right-full'
        } ${className}`}>
          {content}
          {position === 'top' && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-slate-900" />}
          {position === 'bottom' && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-slate-900" />}
        </div>
      </Transition>
    </div>
  );
};

export default Tooltip;

