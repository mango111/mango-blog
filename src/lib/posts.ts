import { createClient } from "@/lib/supabase";

export interface Post {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  category: string;
  cover_color: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// 获取所有已发布文章
export async function getPosts(): Promise<Post[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return data || [];
}

// 获取单篇文章
export async function getPost(id: string): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }
  return data;
}

// 创建文章
export async function createPost(post: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  cover_color?: string;
  published?: boolean;
}): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return null;
  }
  return data;
}

// 更新文章
export async function updatePost(
  id: string,
  post: Partial<Post>
): Promise<Post | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    return null;
  }
  return data;
}

// 删除文章
export async function deletePost(id: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Error deleting post:", error);
    return false;
  }
  return true;
}
