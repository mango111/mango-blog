"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Quote, Heading2 } from "lucide-react";

interface EditorProps {
  onChange?: (content: string) => void;
  initialContent?: string;
}

export default function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "开始写作...",
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

  if (!editor) return null;

  return (
    <div className="novel-editor">
      {/* 工具栏 */}
      <div className="flex items-center gap-1 p-2 border-b border-neutral-100">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("bold") ? "bg-neutral-100" : ""}`}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("italic") ? "bg-neutral-100" : ""}`}
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("heading", { level: 2 }) ? "bg-neutral-100" : ""}`}
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("bulletList") ? "bg-neutral-100" : ""}`}
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("orderedList") ? "bg-neutral-100" : ""}`}
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${editor.isActive("blockquote") ? "bg-neutral-100" : ""}`}
        >
          <Quote size={18} />
        </button>
      </div>

      {/* 编辑区 */}
      <EditorContent editor={editor} />
    </div>
  );
}
