"use client";
import { clear, removeFromSave } from "@/redux-toolkit/courseSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Saved() {
  const savedCourses = useSelector((state) => state.course.courses);
  const dispatch = useDispatch();

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      <div>
        {savedCourses.length > 0 ? (
          <div className="m-5">
            {savedCourses.map((item) => (
              <div
                key={item._id}
                className="group mx-2 mt-10 grid max-w-screen-lg grid-cols-1 space-x-8 overflow-hidden rounded-lg border text-gray-700 shadow transition hover:shadow-lg sm:mx-auto sm:grid-cols-5"
              >
                <a
                  href="#"
                  className="col-span-2 text-left text-gray-600 hover:text-gray-700"
                >
                  <div className="group relative h-full w-full overflow-hidden">
                    <img
                      src={item.imageurl}
                      alt="courseimage"
                      className="h-full w-full border-none object-cover text-gray-700 transition"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">
                      {item.category}
                    </span>
                    <img
                      src="/images/AnbWyIjnwNbW9Wz6c_cja.svg"
                      className="absolute inset-1/2 w-10 max-w-full -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-125"
                      alt=""
                    />
                  </div>
                </a>
                <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
                  <a
                    href="#"
                    className="mt-3 dark:text-white overflow-hidden text-2xl font-semibold"
                  >
                    {" "}
                    {item.title}
                  </a>
                  <p className="overflow-hidden dark:text-white text-sm">
                    {item.description.substring(0, 100)}...
                  </p>
                  <a
                    href="#"
                    className="text-sm font-semibold text-gray-500 hover:text-gray-700"
                  >
                    {item.teacher}
                  </a>
                  <div className="flex flex-col text-gray-700 sm:flex-row">
                    <div className="flex h-fit space-x-2 text-sm font-medium">
                      <div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                        {item.level}
                      </div>

                      <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                        {item.enrolledstudents} Enrolled
                      </div>
                    </div>
                    <Link
                      href={`/courses/${item._id}`}
                      className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-[#365f7c] text-white sm:ml-auto"
                    >
                      Enroll Now{" "}
                    </Link>
                    <button
                      onClick={() => dispatch(removeFromSave(item.id))}
                      className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-black text-white sm:ml-auto"
                    >
                      Unsave
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-col md:flex md:flex-row flex justify-center items-center">
            <h1>There is no Saved Course.</h1>
            <Link href="/courses" className="ml-8 underline">
              Learn{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
