"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { createPost } from "@/lib/posts";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const categories = ["阅读", "AI学习", "生活"];
const coverColors = [
  { name: "紫粉", value: "from-purple-400 to-pink-400" },
  { name: "蓝青", value: "from-blue-400 to-cyan-400" },
  { name: "橙黄", value: "from-amber-400 to-orange-400" },
  { name: "绿青", value: "from-green-400 to-teal-400" },
  { name: "红橙", value: "from-red-400 to-orange-400" },
];

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("生活");
  const [coverColor, setCoverColor] = useState(coverColors[0].value);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (publish: boolean) => {
    if (!title.trim()) {
      alert("请输入标题");
      return;
    }

    setSaving(true);

    // 生成摘要（取前100字）
    let excerpt = "";
    try {
      const json = JSON.parse(content);
      const extractText = (node: any): string => {
        if (node.type === "text") return node.text || "";
        if (node.content) return node.content.map(extractText).join("");
        return "";
      };
      excerpt = extractText(json).slice(0, 100) + "...";
    } catch {
      excerpt = title;
    }

    const post = await createPost({
      title,
      content,
      excerpt,
      category,
      cover_color: coverColor,
      published: publish,
    });

    setSaving(false);

    if (post) {
      router.push("/");
    } else {
      alert("保存失败，请重试");
    }
  };

  return (
    <main>
      {/* 顶部工具栏 */}
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* 分类选择 */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* 颜色选择 */}
          <select
            value={coverColor}
            onChange={(e) => setCoverColor(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
          >
            {coverColors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>

          {/* 保存草稿 */}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors disabled:opacity-50 text-sm"
          >
            存草稿
          </button>

          {/* 发布按钮 */}
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? "保存中..." : "发布"}</span>
          </button>
        </div>
      </header>

      {/* 标题输入 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="输入文章标题..."
        className="w-full text-3xl font-bold mb-6 bg-transparent border-none outline-none placeholder:text-neutral-300"
      />

      {/* 编辑器 */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <Editor onChange={setContent} />
      </div>
    </main>
  );
}
