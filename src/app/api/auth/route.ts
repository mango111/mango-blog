import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "mango2026";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // 设置登录 cookie，7 天有效
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  
  if (token?.value === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false });
}
