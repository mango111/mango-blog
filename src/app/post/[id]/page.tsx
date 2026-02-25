import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

// 将 Novel JSON 转换为 HTML（简化版）
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
      if (mark.type === "link") text = `<a href="${mark.attrs?.href}">${text}</a>`;
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
          <span className="text-sm text-muted">
            {new Date(post.created_at).toLocaleDateString("zh-CN")}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
      </header>

      {/* 文章内容 */}
      <article
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* 评论区 - 暂时禁用，需要配置 Giscus */}
      {/* <section className="border-t border-neutral-200 pt-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
          <MessageCircle size={24} />
          <span>评论</span>
        </h2>
      </section> */}
    </main>
  );
}
