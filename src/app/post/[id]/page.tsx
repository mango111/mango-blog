import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

// 模拟数据
const post = {
  id: "1",
  title: "开始我的博客之旅",
  content: `
    <p>这是我的第一篇博客文章。</p>
    <p>我决定开始记录自己的阅读、AI学习和生活感悟。写作是一种思考的方式，通过文字整理自己的想法，也许能帮助到其他人。</p>
    <h2>为什么要写博客？</h2>
    <p>在这个信息爆炸的时代，我们每天接收大量的信息，但真正内化成自己知识的却很少。写博客是一种强迫自己深度思考的方式。</p>
    <h2>我会写什么？</h2>
    <ul>
      <li><strong>阅读笔记</strong>：分享读过的好书和思考</li>
      <li><strong>AI学习</strong>：记录学习人工智能的过程</li>
      <li><strong>生活感悟</strong>：日常生活中的思考和感悟</li>
    </ul>
    <p>希望这个博客能成为我成长的记录，也希望能对你有所帮助。</p>
  `,
  category: "生活",
  createdAt: "2026-02-25",
};

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <main>
      {/* 返回按钮 */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted hover:text-neutral-900 transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>返回首页</span>
      </Link>

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm px-3 py-1 rounded-full bg-neutral-100 text-muted">
            {post.category}
          </span>
          <span className="text-sm text-muted">{post.createdAt}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
      </header>

      {/* 文章内容 */}
      <article
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 评论区 */}
      <section className="border-t border-neutral-200 pt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
          <MessageCircle size={24} />
          <span>评论</span>
        </h2>
        
        {/* Giscus 评论组件占位 */}
        <div className="bg-neutral-50 rounded-xl p-8 text-center text-muted">
          <p>评论功能即将上线</p>
          <p className="text-sm mt-2">基于 GitHub Discussions</p>
        </div>
      </section>
    </main>
  );
}
