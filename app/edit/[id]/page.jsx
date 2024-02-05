import EditForm from "@/components/EditForm";

async function getData(id) {
  const url = process.env.API_URL;
  const res = await fetch(`${url}/api/course/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Edit({ params }) {
  const course = await getData(params.id);
  return (
    <EditForm
      id={course._id}
      title={course.title}
      category={course.category}
      price={course.price}
      description={course.description}
      imageurl={course.imageurl}
      videoeurl={course.videoeurl}
      teacher={course.teacher}
      duration={course.duration}
      level={course.level}
      enrolledstudents={course.enrolledstudents}
      updatedAt={course.updatedAt}
    />
  );
}
