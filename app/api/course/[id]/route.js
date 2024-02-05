import Course from "@/models/Course";
import connectToDB from "@/utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const course = await Course.findById(id);
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the course", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const body = await req.json();
  try {
    await connectToDB();
    // Find the exisitingFood
    const existingCourse = await Course.findById(params.id);

    if (!existingCourse) {
      return new Response("Course not found", { status: 404 });
    }

    // Update the product with the new data
    Object.assign(existingCourse, body);
    await existingCourse.save();

    return new Response("Course updated successfully", { status: 201 });
  } catch (error) {
    return new Response("Failed to Update Course", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();

    await Course.findByIdAndDelete(id);
    return new Response("Course deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Course", { status: 500 });
  }
};
