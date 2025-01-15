import { NextResponse } from "next/server";
import { client } from "../../lib/client";

export async function GET() {
  const categories = await client.fetch(
    `*[_type == "category"]{_id, title, slug}`
  );
  return NextResponse.json(categories);
}
