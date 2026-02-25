import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  // 解析内容
  let htmlContent = "";
  try {
    const json = JSON.parse(post.content);
    htmlContent = renderContent(json);
  } catch {
    htmlContent = `<p>${post.content}</p>`;
  }

  return (
    <div>
      <Link 
        href="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--text-muted)',
          textDecoration: 'none',
          marginBottom: '32px',
          fontSize: '0.9rem'
        }}
      >
        <ArrowLeft size={16} /> 返回首页
      </Link>

      <article>
        <header className="article-header">
          <span className="post-category">{post.category}</span>
          <h1 className="article-title">{post.title}</h1>
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
              <Tag size={14} />
              {post.category}
            </span>
          </div>
        </header>

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}

function renderContent(node: any): string {
  if (!node) return "";
  
  if (node.type === "doc") {
    return node.content?.map(renderContent).join("") || "";
  }
  
  if (node.type === "paragraph") {
    const inner = node.content?.map(renderContent).join("") || "";
    return inner ? `<p>${inner}</p>` : "<p><br></p>";
  }
  
  if (node.type === "heading") {
    const level = node.attrs?.level || 2;
    const inner = node.content?.map(renderContent).join("") || "";
    return `<h${level}>${inner}</h${level}>`;
  }
  
  if (node.type === "text") {
    let text = node.text || "";
    if (node.marks) {
      for (const mark of node.marks) {
        if (mark.type === "bold") text = `<strong>${text}</strong>`;
        if (mark.type === "italic") text = `<em>${text}</em>`;
        if (mark.type === "code") text = `<code>${text}</code>`;
      }
    }
    return text;
  }
  
  if (node.type === "bulletList") {
    const items = node.content?.map(renderContent).join("") || "";
    return `<ul>${items}</ul>`;
  }
  
  if (node.type === "orderedList") {
    const items = node.content?.map(renderContent).join("") || "";
    return `<ol>${items}</ol>`;
  }
  
  if (node.type === "listItem") {
    const inner = node.content?.map(renderContent).join("") || "";
    return `<li>${inner}</li>`;
  }
  
  if (node.type === "blockquote") {
    const inner = node.content?.map(renderContent).join("") || "";
    return `<blockquote>${inner}</blockquote>`;
  }
  
  if (node.type === "codeBlock") {
    const code = node.content?.map((n: any) => n.text || "").join("") || "";
    return `<pre><code>${code}</code></pre>`;
  }
  
  if (node.type === "image") {
    return `<img src="${node.attrs?.src}" alt="${node.attrs?.alt || ''}" />`;
  }
  
  if (node.type === "hardBreak") {
    return "<br>";
  }
  
  return node.content?.map(renderContent).join("") || "";
}
