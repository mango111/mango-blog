import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

// 将 Novel JSON 转换为 HTML
function renderContent(content: string | null): string {
  if (!content) return "<p>暂无内容</p>";
  
  try {
    const json = JSON.parse(content);
    return renderNode(json);
  } catch {
    return "<p>内容解析错误</p>";
  }
}

function renderNode(node: any): string {
  if (!node) return "";
  
  if (node.type === "doc") {
    return (node.content || []).map(renderNode).join("");
  }
  
  if (node.type === "paragraph") {
    const text = (node.content || []).map(renderNode).join("");
    return `<p>${text || "<br>"}</p>`;
  }
  
  if (node.type === "heading") {
    const level = node.attrs?.level || 2;
    const text = (node.content || []).map(renderNode).join("");
    return `<h${level}>${text}</h${level}>`;
  }
  
  if (node.type === "bulletList") {
    const items = (node.content || []).map(renderNode).join("");
    return `<ul>${items}</ul>`;
  }
  
  if (node.type === "orderedList") {
    const items = (node.content || []).map(renderNode).join("");
    return `<ol>${items}</ol>`;
  }
  
  if (node.type === "listItem") {
    const content = (node.content || []).map(renderNode).join("");
    return `<li>${content}</li>`;
  }
  
  if (node.type === "blockquote") {
    const content = (node.content || []).map(renderNode).join("");
    return `<blockquote>${content}</blockquote>`;
  }
  
  if (node.type === "codeBlock") {
    const text = (node.content || []).map(renderNode).join("");
    return `<pre><code>${text}</code></pre>`;
  }
  
  if (node.type === "text") {
    let text = node.text || "";
    const marks = node.marks || [];
    
    for (const mark of marks) {
      if (mark.type === "bold") text = `<strong>${text}</strong>`;
      if (mark.type === "italic") text = `<em>${text}</em>`;
      if (mark.type === "code") text = `<code>${text}</code>`;
      if (mark.type === "link") text = `<a href="${mark.attrs?.href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    }
    
    return text;
  }
  
  return "";
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  
  if (!post) {
    notFound();
  }

  const htmlContent = renderContent(post.content);

  return (
    <article>
      {/* 返回链接 */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-8 text-sm"
      >
        <ArrowLeft size={16} />
        <span>返回首页</span>
      </Link>

      {/* 文章头部 */}
      <header className="mb-10 pb-8 border-b border-[var(--border)]">
        {/* 分类 */}
        <div className="mb-4">
          <span className="tag">
            <Tag size={12} className="mr-1" />
            {post.category}
          </span>
        </div>
        
        {/* 标题 */}
        <h1 
          className="text-3xl font-semibold text-[var(--text-primary)] leading-tight mb-4"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {post.title}
        </h1>
        
        {/* 元信息 */}
        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(post.created_at).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </header>

      {/* 文章内容 */}
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* 文章底部 */}
      <footer className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            ← 返回文章列表
          </Link>
        </div>
      </footer>
    </article>
  );
}
