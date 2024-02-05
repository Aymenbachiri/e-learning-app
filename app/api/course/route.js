import Course from "@/models/Course";
import connectToDB from "@/utils/database";

export async function POST(req) {
  const body = await req.json();
  const newCourse = new Course(body);
  try {
    await connectToDB();
    await newCourse.save();

    return new Response("Course has been created", { status: 201 });
  } catch (error) {
    console.error("Error creating course", error);
    return new Response("Failed to create course", { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const course = await Course.find();

    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all courses", { status: 500 });
  }
}
