import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogOut, MessageSquareText, Settings, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const navLinkBase =
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200';

const Navbar = () => {
  const { authUser, logout, isLoggingOut } = useAuthStore();

  const getNavLinkClass = ({ isActive }) =>
    `${navLinkBase} ${
      isActive
        ? 'border-primary bg-primary text-primary-content shadow-lg'
        : 'border-base-300 bg-base-200/80 text-base-content hover:border-primary/40 hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 text-base-content backdrop-blur">
      <div className="page-shell flex min-h-16 w-full flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <Link
          to={authUser ? '/' : '/login'}
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-base-content transition-all duration-200 hover:border-primary/40 hover:bg-base-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
            <MessageSquareText size={18} />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight">EazyChat</p>
            <p className="text-xs opacity-60">Stay connected</p>
          </div>
        </Link>

        <nav className="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
          <NavLink to="/settings" className={getNavLinkClass}>
            <Settings size={16} />
            <span>Settings</span>
          </NavLink>

          {authUser && (
            <>
              <NavLink to="/profile" className={getNavLinkClass}>
                <User size={16} />
                <span>Profile</span>
              </NavLink>

              <button
                type="button"
                onClick={logout}
                disabled={isLoggingOut}
                className={`${navLinkBase} border-base-300 bg-base-200 text-base-content hover:border-error/40 hover:bg-error hover:text-error-content`}
              >
                {isLoggingOut ? <span className="loading loading-spinner loading-xs" /> : <LogOut size={16} />}
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
