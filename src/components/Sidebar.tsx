import Link from "next/link";
import { Home, User, BookOpen, PenLine, Github, Mail } from "lucide-react";

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = "/" }: SidebarProps) {
  const navItems = [
    { href: "/", label: "首页", icon: Home },
    { href: "/about", label: "关于", icon: User },
  ];

  return (
    <aside className="sidebar fixed left-0 top-0 h-screen w-64 flex flex-col p-6 overflow-y-auto">
      {/* 个人信息区 */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="sidebar-avatar mx-auto bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-3xl">
            🥭
          </div>
        </div>
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">
          Mango
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          阅读 · AI学习 · 生活感悟
        </p>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 写文章按钮 */}
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <Link href="/write" className="btn-primary w-full justify-center">
            <PenLine size={16} />
            <span>写文章</span>
          </Link>
        </div>
      </nav>

      {/* 底部社交链接 */}
      <div className="pt-6 border-t border-[var(--border)]">
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:hello@example.com"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
        <p className="text-xs text-[var(--text-muted)] text-center mt-4">
          © 2026 Mango
        </p>
      </div>
    </aside>
  );
}
