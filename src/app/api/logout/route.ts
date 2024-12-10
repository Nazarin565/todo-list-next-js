import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  // Видаляємо cookie для displayName
  cookieStore.delete("displayName");

  // Можна також видалити інші куки, якщо вони є

  const url = new URL("/login", process.env.NEXT_PUBLIC_SITE_URL); // Use the base URL (e.g., https://yourdomain.com)

  return NextResponse.redirect(url);
}
