-- Mango Blog 数据库表结构
-- 在 Supabase SQL Editor 中执行

-- 文章表
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content JSONB, -- Novel 编辑器的 JSON 内容
  excerpt TEXT, -- 摘要
  category TEXT DEFAULT '生活',
  cover_color TEXT DEFAULT 'from-purple-400 to-pink-400',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 启用 RLS（行级安全）
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 公开读取已发布文章
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- 匿名用户可以读取所有文章（管理后台用）
CREATE POLICY "Anon can read all posts"
  ON posts FOR SELECT
  TO anon
  USING (true);

-- 匿名用户可以插入/更新/删除（简化版，后续可加认证）
CREATE POLICY "Anon can insert posts"
  ON posts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can update posts"
  ON posts FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Anon can delete posts"
  ON posts FOR DELETE
  TO anon
  USING (true);

-- 插入示例文章
INSERT INTO posts (title, content, excerpt, category, cover_color, published) VALUES
(
  '开始我的博客之旅',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"这是我的第一篇博客文章。"}]}]}',
  '记录生活，分享思考，这是我的第一篇博客...',
  '生活',
  'from-purple-400 to-pink-400',
  true
),
(
  'AI 学习笔记：大模型入门',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"从 Transformer 到 GPT，理解现代 AI 的基础架构。"}]}]}',
  '从 Transformer 到 GPT，理解现代 AI 的基础架构...',
  'AI学习',
  'from-blue-400 to-cyan-400',
  true
),
(
  '《思考，快与慢》读书笔记',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"丹尼尔·卡尼曼带我们探索人类思维的两个系统。"}]}]}',
  '丹尼尔·卡尼曼带我们探索人类思维的两个系统...',
  '阅读',
  'from-amber-400 to-orange-400',
  true
);
