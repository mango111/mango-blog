# Mango's Blog

个人博客网站 - 记录阅读、AI学习、生活感悟

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS
- **编辑器**: Novel (Notion 风格)
- **数据库**: Supabase
- **评论**: Giscus (GitHub Discussions)
- **部署**: Vercel

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 绑定域名 www.lxlmango.online

## 目录结构

```
src/
├── app/
│   ├── page.tsx          # 首页（文章列表）
│   ├── write/page.tsx    # 写文章页面
│   ├── post/[id]/page.tsx # 文章详情页
│   ├── layout.tsx        # 全局布局
│   └── globals.css       # 全局样式
├── components/
│   └── editor.tsx        # Novel 编辑器封装
└── lib/
    └── supabase.ts       # Supabase 客户端
```
