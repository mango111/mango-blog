"use client";

import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { useState } from "react";

interface EditorProps {
  onChange?: (content: string) => void;
  initialContent?: string;
}

export default function Editor({ onChange, initialContent }: EditorProps) {
  const [content, setContent] = useState(initialContent || "");

  return (
    <div className="novel-editor">
      <EditorRoot>
        <EditorContent
          initialContent={initialContent ? JSON.parse(initialContent) : undefined}
          onUpdate={({ editor }) => {
            const json = JSON.stringify(editor.getJSON());
            setContent(json);
            onChange?.(json);
          }}
          className="min-h-[400px] p-4 prose prose-lg max-w-none focus:outline-none"
          editorProps={{
            attributes: {
              class: "focus:outline-none",
            },
          }}
        />
      </EditorRoot>
    </div>
  );
}
