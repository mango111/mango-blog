"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// 动态导入 Novel 编辑器，避免 SSR 问题
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const categories = ["阅读", "AI学习", "生活"];

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("生活");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("请输入标题");
      return;
    }
    
    setSaving(true);
    // TODO: 保存到 Supabase
    console.log({ title, category, content });
    
    setTimeout(() => {
      setSaving(false);
      alert("保存成功！");
    }, 1000);
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

        <div className="flex items-center gap-4">
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

          {/* 保存按钮 */}
          <button
            onClick={handleSave}
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
