"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Teach() {
  const session = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const imageurl = e.target[1].value;
    const videoeurl = e.target[2].value;
    const category = e.target[3].value;
    const level = e.target[4].value;
    const enrolledstudents = e.target[5].value;
    const price = e.target[6].value;
    const duration = e.target[7].value;
    const description = e.target[8].value;

    try {
      const res = await fetch("/api/course", {
        method: "POST",
        body: JSON.stringify({
          title,
          videoeurl,
          category,
          level,
          enrolledstudents,
          price,
          imageurl,
          description,
          duration,
          teacher: session.data.user.name,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to create course");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className=" bg-white dark:bg-black dark:text-white min-h-screen max-w-[1640px] mx-auto my-auto flex justify-center items-center p-4">
        <div className="py-8 px-6 max-w-full bg-gray-400 bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-5">
            Welcome to the Course Creation Page.
          </h1>
          <p className="text-lg text-center dark:text-white mb-8">
            Here, you can input all the details for your new course.
          </p>
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
              />
            </div>
            <button
              className="bg-[#385f7b] text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mb-5"
              type="submit"
            >
              Publish
            </button>
          </form>
        </div>
      </div>
    );
  }
}
