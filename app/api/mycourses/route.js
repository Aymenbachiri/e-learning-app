import Course from "@/models/Course";
import connectToDB from "@/utils/database";

export async function GET(req) {
  const url = new URL(req.url);

  const teacher = url.searchParams.get("teacher");
  try {
    await connectToDB();

    const courses = await Course.find(teacher && { teacher });
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch my courses", { status: 500 });
  }
}
