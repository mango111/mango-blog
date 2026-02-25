import Link from "next/link";
import { BookOpen, Brain, Heart, PenLine } from "lucide-react";
import { getPosts } from "@/lib/posts";

const categoryIcons: Record<string, typeof BookOpen> = {
  "阅读": BookOpen,
  "AI学习": Brain,
  "生活": Heart,
};

export const dynamic = "force-dynamic"; // 强制动态渲染

export default async function Home() {
  const posts = await getPosts();

  // 统计分类
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = [
    { name: "全部", icon: BookOpen, count: posts.length },
    ...Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      icon: categoryIcons[name] || BookOpen,
      count,
    })),
  ];

  return (
    <main>
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mango's Blog</h1>
            <p className="text-muted mt-1">阅读 · AI学习 · 生活感悟</p>
          </div>
          <Link
            href="/write"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <PenLine size={18} />
            <span>写文章</span>
          </Link>
        </div>

        {/* 分类标签 */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 hover:border-neutral-400 transition-colors text-sm"
            >
              <cat.icon size={14} />
              <span>{cat.name}</span>
              <span className="text-muted">({cat.count})</span>
            </button>
          ))}
        </div>
      </header>

      {/* 文章卡片列表 */}
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted">
            <p>还没有文章，去写一篇吧！</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <article className="card-hover bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
                <div className="flex">
                  {/* 彩色装饰条 */}
                  <div className={`w-2 bg-gradient-to-b ${post.cover_color}`} />

                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-muted">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted">
                        {new Date(post.created_at).toLocaleDateString("zh-CN")}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold mb-2 text-neutral-900">
                      {post.title}
                    </h2>

                    <p className="text-neutral-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-neutral-200 text-center text-sm text-muted">
        <p>© 2026 Mango. Built with Next.js</p>
      </footer>
    </main>
  );
}
