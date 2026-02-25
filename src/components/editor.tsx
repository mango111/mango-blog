"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Quote, Heading2, ImageIcon, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface EditorProps {
  onChange?: (content: string) => void;
  initialContent?: string;
}

export default function Editor({ onChange, initialContent }: EditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "开始写作...",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full",
        },
      }),
    ],
    content: initialContent ? JSON.parse(initialContent) : "",
    onUpdate: ({ editor }) => {
      onChange?.(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        editor.chain().focus().setImage({ src: url }).run();
      } else {
        alert("上传失败，请重试");
      }
    } catch {
      alert("上传失败，请重试");
    }

    setUploading(false);
    // 清空 input，允许重复上传同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!editor) return null;

  return (
    <div className="novel-editor">
      {/* 工具栏 */}
      <div className="flex items-center gap-1 p-2 border-b border-neutral-100">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("bold") ? "bg-neutral-100" : ""}`}
          title="粗体"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("italic") ? "bg-neutral-100" : ""}`}
          title="斜体"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("heading", { level: 2 }) ? "bg-neutral-100" : ""}`}
          title="标题"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("bulletList") ? "bg-neutral-100" : ""}`}
          title="无序列表"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("orderedList") ? "bg-neutral-100" : ""}`}
          title="有序列表"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("blockquote") ? "bg-neutral-100" : ""}`}
          title="引用"
        >
          <Quote size={18} />
        </button>
        
        <div className="w-px h-6 bg-neutral-200 mx-1" />
        
        {/* 图片上传 */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="p-2 rounded hover:bg-neutral-100 disabled:opacity-50"
          title="插入图片"
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* 编辑区 */}
      <EditorContent editor={editor} />
    </div>
  );
}
