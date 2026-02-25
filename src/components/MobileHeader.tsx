"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, User, PenLine, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "首页", icon: Home },
    { href: "/about", label: "关于", icon: User },
    { href: "/write", label: "写文章", icon: PenLine },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="mobile-header fixed top-0 left-0 right-0 h-14 bg-[var(--bg-sidebar)] border-b border-[var(--border)] flex items-center justify-between px-4 z-50 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🥭</span>
          <span className="font-semibold text-[var(--text-primary)]">Mango</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all"
            aria-label="切换主题"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all"
            aria-label="菜单"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav 
        className={`fixed top-14 left-0 right-0 bg-[var(--bg-sidebar)] border-b border-[var(--border)] z-40 md:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all"
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
