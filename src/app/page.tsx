import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">最新文章</h1>
        <p className="page-desc">记录阅读、学习与生活的点滴</p>
      </header>

      <div>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>还没有文章，去写一篇吧</p>
            <Link href="/write" className="btn btn-primary">
              开始写作
            </Link>
          </div>
        ) : (
          posts.map((post, index) => (
            <Link key={post.id} href={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
              <article className="post-card" style={{ animationDelay: `${index * 0.05}s` }}>
                <span className="post-category">{post.category}</span>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt || "暂无摘要"}</p>
                <div className="post-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    {new Date(post.created_at).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageCircle size={14} />
                    暂无评论
                  </span>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
