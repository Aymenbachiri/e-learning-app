"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({
  id,
  title: initialTitle,
  category: initialCategory,
  price: initialPrice,
  description: initialDescription,
  imageurl: initialImageUrl,
  videoeurl: initialVideoUrl,
  duration: initialDuration,
  level: initialLevel,
  enrolledstudents: initialEnrolledStudents,
}) {
  const router = useRouter();
  const session = useSession();
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [imageurl, setImageUrl] = useState(initialImageUrl);
  const [videourl, setVideoUrl] = useState(initialVideoUrl);
  const [duration, setDuration] = useState(initialDuration);
  const [level, setLevel] = useState(initialLevel);
  const [enrolledstudents, setEnrolledStudents] = useState(
    initialEnrolledStudents
  );

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/course/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          imageurl,
          price,
          videourl,
          duration,
          level,
          enrolledstudents,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to edit course");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status === "authenticated") {
    return (
      <div className=" bg-white dark:bg-black dark:text-white min-h-screen max-w-[1640px] mx-auto my-auto flex justify-center items-center p-4">
        <div className="py-8 px-6 max-w-full bg-gray-400 bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-5">
            Welcome to the Course Editing Page.
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-5">
              <label className=" dark:text-white font-semibold mb-2">
                Title
              </label>
              <input
                className="bg-transparent border rounded-lg shadow border-gray-300 outline-none   py-2 px-4 block w-full appearance-none leading-normal"
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Enter the course Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-5 flex items-center gap-4">
              <div className="mb-5">
                <label className=" dark:text-white font-semibold mb-2">
                  Thumbnail ImageUrl
                </label>
                <input
                  className="bg-transparent border rounded-lg shadow border-gray-300 outline-none   py-2 px-4 block w-full appearance-none leading-normal"
                  type="text"
                  name="imageurl"
                  required
                  autoComplete="off"
                  placeholder="Enter the thumbnail image url"
                  value={imageurl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="mb-5 flex-[1]">
                <label className=" dark:text-white font-semibold mb-2">
                  Video Url
                </label>
                <input
                  className="bg-transparent border rounded-lg shadow border-gray-300 outline-none   py-2 px-4 block w-full appearance-none leading-normal"
                  type="text"
                  name="videourl"
                  required
                  autoComplete="off"
                  placeholder="Enter the video url for the course"
                  value={videourl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5 flex items-center gap-8">
              <label className=" dark:text-white font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                className="mb-5 bg-transparent dark:bg-[#4d4d4d] dark:text-white border rounded-lg shadow border-gray-300 outline-none py-2 px-4 block w-full appearance-none leading-normal"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="design">Design</option>
                <option value="development">IT and Software</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
              </select>
              <label className=" dark:text-white font-semibold mb-2">
                Level
              </label>
              <select
                name="level"
                className="mb-5 bg-transparent dark:bg-[#4d4d4d] dark:text-white border rounded-lg shadow border-gray-300 outline-none py-2 px-4 block w-full appearance-none leading-normal"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="mb-5 flex items-center gap-8">
              <div className="mb-5">
                <label className=" dark:text-white font-semibold mb-2">
                  Enrolled Students
                </label>
                <input
                  className="bg-transparent border rounded-lg shadow border-gray-300 outline-none   py-2 px-4 block w-full appearance-none leading-normal"
                  type="number"
                  name="enrolledstudents"
                  required
                  autoComplete="off"
                  placeholder="Enter the number of students enrolled"
                  value={enrolledstudents}
                  onChange={(e) => setEnrolledStudents(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className=" dark:text-white font-semibold mb-2">
                  Price
                </label>
                <input
                  className="bg-transparent border rounded-lg shadow border-gray-300 outline-none   py-2 px-4 block w-full appearance-none leading-normal"
                  type="number"
                  name="price"
                  required
                  autoComplete="off"
                  placeholder="Enter the price of the course"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className=" dark:text-white font-semibold mb-2">
                  Duration in minutes
                </label>
                <input
                  className="bg-transparent border rounded-lg shadow border-gray-300 outline-none   py-2 px-4 block w-full appearance-none leading-normal"
                  type="number"
                  name="duration"
                  required
                  autoComplete="off"
                  placeholder="Enter the duration in minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className=" dark:text-white font-semibold mb-2">
                Description
              </label>
              <textarea
                className="bg-transparent resize-none border rounded-lg shadow border-gray-300 outline-none  py-2 px-4 block w-full appearance-none leading-normal"
                name="description"
                rows="5"
                required
                autoComplete="off"
                placeholder="Enter the course description, it helps when peaple search"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="bg-[#385f7b] text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mb-5"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
