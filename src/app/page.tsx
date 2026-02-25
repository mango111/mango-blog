import Link from "next/link";
import { Calendar, MessageCircle, ChevronRight } from "lucide-react";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      {/* 页面标题 */}
      <header className="mb-10">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
          最新文章
        </h1>
        <p className="text-[var(--text-muted)] mt-2 text-sm">
          记录阅读、学习与生活的点滴
        </p>
      </header>

      {/* 文章列表 */}
      <div className="space-y-5">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-[var(--text-muted)]">还没有文章，去写一篇吧</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <article className="post-card group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* 分类标签 */}
                    <div className="mb-3">
                      <span className="tag">{post.category}</span>
                    </div>
                    
                    {/* 标题 */}
                    <h2 className="post-title mb-2">
                      {post.title}
                    </h2>
                    
                    {/* 摘要 */}
                    <p className="post-excerpt mb-3">
                      {post.excerpt || "暂无摘要"}
                    </p>
                    
                    {/* 元信息 */}
                    <div className="post-meta flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {new Date(post.created_at).toLocaleDateString("zh-CN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={13} />
                        暂无评论
                      </span>
                    </div>
                  </div>
                  
                  {/* 箭头指示 */}
                  <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors mt-8">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>

      {/* 分页占位 */}
      {posts.length > 0 && (
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="px-3 py-1.5 bg-[var(--accent)] text-white rounded">1</span>
          </div>
        </div>
      )}
    </div>
  );
}
