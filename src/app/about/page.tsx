import { Github, Mail, MapPin } from "lucide-react";

export default function AboutPage() {
  const milestones = [
    { date: "2026-02", content: "博客全新改版，采用 Next.js 14 重构" },
    { date: "2025-12", content: "开始系统学习 AI 相关技术" },
    { date: "2025-06", content: "建立个人博客，记录学习与生活" },
  ];

  return (
    <div className="animate-fade-in">
      {/* 页面标题 */}
      <header className="mb-10">
        <h1 
          className="text-2xl font-semibold text-[var(--text-primary)]"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          关于
        </h1>
      </header>

      {/* 个人介绍 */}
      <section className="post-card mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center text-3xl flex-shrink-0">
            🥭
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Mango
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              一个热爱阅读、探索 AI 技术、记录生活的普通人。相信科技应该普惠大众，
              希望通过文字分享自己的学习心得与生活感悟。
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                中国
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 关于本站 */}
      <section className="mb-10">
        <h2 
          className="text-lg font-semibold text-[var(--text-primary)] mb-4"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          关于本站
        </h2>
        <div className="prose-content text-[var(--text-secondary)]">
          <p>
            本站使用 Next.js 14 + Tailwind CSS 构建，是我的个人试验场，
            会不断尝试新技术、新想法。博客主要记录三个方向的内容：
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)]">📚</span>
              <span><strong>阅读</strong> — 读书笔记与书评分享</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)]">🤖</span>
              <span><strong>AI学习</strong> — 人工智能技术探索与实践</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent)]">💭</span>
              <span><strong>生活</strong> — 日常感悟与随笔</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 时光机 / 里程碑 */}
      <section className="mb-10">
        <h2 
          className="text-lg font-semibold text-[var(--text-primary)] mb-6"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          时光机
        </h2>
        <div className="timeline">
          {milestones.map((item, index) => (
            <div 
              key={index} 
              className="timeline-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">{item.content}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 联系方式 */}
      <section>
        <h2 
          className="text-lg font-semibold text-[var(--text-primary)] mb-4"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          联系我
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="post-card flex items-center justify-center sm:justify-start gap-3 px-5 py-3 hover:border-[var(--accent)]"
          >
            <Github size={20} className="text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-secondary)]">GitHub</span>
          </a>
          <a
            href="mailto:hello@example.com"
            className="post-card flex items-center justify-center sm:justify-start gap-3 px-5 py-3 hover:border-[var(--accent)]"
          >
            <Mail size={20} className="text-[var(--text-secondary)]" />
            <span className="text-sm text-[var(--text-secondary)]">Email</span>
          </a>
        </div>
      </section>

      {/* 版权声明 */}
      <footer className="mt-12 pt-8 border-t border-[var(--border)]">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed text-center sm:text-left">
          本站作品采用 
          <a 
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline mx-1"
          >
            CC BY-NC-SA 4.0
          </a>
          许可协议进行许可。
        </p>
      </footer>
    </div>
  );
}
