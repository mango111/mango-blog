import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/posts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, cover_color, published } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "标题不能为空" }, { status: 400 });
    }

    const post = await createPost({
      title,
      content: content || null,
      excerpt: excerpt || null,
      category: category || "生活",
      cover_color: cover_color || "from-purple-400 to-pink-400",
      published: published ?? false,
    });

    if (!post) {
      return NextResponse.json({ error: "创建失败" }, { status: 500 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
