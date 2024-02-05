import CourseCard from "@/components/CourseCard";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/course/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function generateMetadata({ params }) {
  const course = await getData(params.id);
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function Course({ params }) {
  const data = await getData(params.id);

  return (
    <CourseCard
      id={data._id}
      title={data.title}
      category={data.category}
      price={data.price}
      description={data.description}
      imageurl={data.imageurl}
      videoeurl={data.videoeurl}
      teacher={data.teacher}
      duration={data.duration}
      level={data.level}
      enrolledstudents={data.enrolledstudents}
      updatedAt={data.updatedAt}
    />
  );
}
