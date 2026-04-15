"use client";

import { useState, forwardRef } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Transition } from '@headlessui/react';

const DropdownMenu = forwardRef(({ 
  trigger, 
  items = [], 
  className = '',
  ...props 
}, ref) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 font-semibold focus:outline-none focus:ring-4 focus:ring-navy-500/20 rounded-2xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group"
        aria-haspopup="true"
        aria-expanded={open}
        {...props.triggerProps}
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <Transition
        show={open}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 ring-1 ring-slate-200/50 dark:ring-slate-800/50 origin-top-right z-50 overflow-hidden">
          <div className={`divide-y divide-slate-200/50 dark:divide-slate-800/50 ${className}`}>
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 px-6 py-5 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 first:pt-6 last:pb-6 hover:text-slate-900 dark:hover:text-slate-100 transition-all font-medium group relative"
                onClick={() => setOpen(false)}
              >
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block truncate font-semibold">{item.label}</span>
                  {item.description && (
                    <span className="text-sm text-slate-500 truncate">{item.description}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;

