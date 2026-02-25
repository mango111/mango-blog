import Link from "next/link";
import { BookOpen, Brain, Heart, PenLine } from "lucide-react";

// 模拟数据，后续接 Supabase
const posts = [
  {
    id: "1",
    title: "开始我的博客之旅",
    excerpt: "记录生活，分享思考，这是我的第一篇博客...",
    category: "生活",
    createdAt: "2026-02-25",
    coverColor: "from-purple-400 to-pink-400",
  },
  {
    id: "2", 
    title: "AI 学习笔记：大模型入门",
    excerpt: "从 Transformer 到 GPT，理解现代 AI 的基础架构...",
    category: "AI学习",
    createdAt: "2026-02-24",
    coverColor: "from-blue-400 to-cyan-400",
  },
  {
    id: "3",
    title: "《思考，快与慢》读书笔记",
    excerpt: "丹尼尔·卡尼曼带我们探索人类思维的两个系统...",
    category: "阅读",
    createdAt: "2026-02-23",
    coverColor: "from-amber-400 to-orange-400",
  },
];

const categories = [
  { name: "全部", icon: BookOpen, count: 12 },
  { name: "阅读", icon: BookOpen, count: 5 },
  { name: "AI学习", icon: Brain, count: 4 },
  { name: "生活", icon: Heart, count: 3 },
];

export default function Home() {
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
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <article className="card-hover bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
              <div className="flex">
                {/* 彩色装饰条 */}
                <div className={`w-2 bg-gradient-to-b ${post.coverColor}`} />
                
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-muted">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted">{post.createdAt}</span>
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
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-neutral-200 text-center text-sm text-muted">
        <p>© 2026 Mango. Built with Next.js</p>
      </footer>
    </main>
  );
}
