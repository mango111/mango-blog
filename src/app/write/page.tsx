"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("生活");
  const [coverColor, setCoverColor] = useState(coverColors[0].value);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // 检查登录状态
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
    } else {
      setLoginError("密码错误");
    }
  };

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

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          category,
          cover_color: coverColor,
          published: publish,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("保存失败，请重试");
      }
    } catch {
      alert("保存失败，请重试");
    }

    setSaving(false);
  };

  // 加载中
  if (authenticated === null) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted">加载中...</div>
      </main>
    );
  }

  // 未登录，显示登录表单
  if (!authenticated) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock size={24} className="text-neutral-400" />
              <h1 className="text-xl font-semibold">管理员登录</h1>
            </div>
            
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入密码"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-200 mb-4"
                autoFocus
              />
              
              {loginError && (
                <p className="text-red-500 text-sm mb-4">{loginError}</p>
              )}
              
              <button
                type="submit"
                className="w-full py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors"
              >
                登录
              </button>
            </form>
            
            <Link
              href="/"
              className="block text-center text-sm text-muted mt-4 hover:text-neutral-900"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 已登录，显示编辑器
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
