"use client";

import { save } from "@/redux-toolkit/courseSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBookmark } from "react-icons/fa";
import teacher from "/public/teacher.png";
import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";

async function getData() {
  const res = await fetch("/api/course", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
      setCourses(fetchedData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center text-center mx-auto mt-8  border-gray-300 h-[100px] w-[100px] animate-spin rounded-full border-8 border-t-blue-600" />
    );
  }

  const notify = () =>
    toast.success("Course Saved successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const filterType = (category) => {
    const filteredCourses = data.filter((item) => {
      const match = item.category.toLowerCase() === category.toLowerCase();

      return match;
    });

    setCourses(filteredCourses);
  };
  const filterPrice = (minPrice, maxPrice) => {
    const filteredCourses = data.filter((item) => {
      const itemPrice = parseFloat(item.price);
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      return itemPrice >= min && itemPrice <= max;
    });

    setCourses(filteredCourses);
  };
  const filterStudents = (minStudents, maxStudents) => {
    const filteredCourses = data.filter((item) => {
      const itemStudent = parseFloat(item.enrolledstudents);
      const min = parseFloat(minStudents);
      const max = parseFloat(maxStudents);

      return itemStudent >= min && itemStudent <= max;
    });

    setCourses(filteredCourses);
  };

  return (
    <div className="mt-4 mb-16">
      <div className="text-center max-w-[1640px] mx-auto flex justify-between items-center p-4">
        <div className="flex justify-center items-center flex-col text-center mx-auto">
          <h1 className="font-bold text-4xl mb-4">
            Welcome to our E-learning,{" "}
          </h1>
          <h1 className="text-xl">Skills that drive you forward</h1>
          <p className="text-xl">
            Technology and the world of work change fast —
          </p>
          <p className="text-xl">
            with us, you’re faster. Get the skills to achieve goals and stay
            competitive.{" "}
          </p>
        </div>
      </div>
      <div className="text-center max-w-[1640px]  mx-auto flex justify-between items-center p-4">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
          <button
            onClick={() => setCourses(data)}
            className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
          >
            All
          </button>
          <button
            onClick={() => filterType("design")}
            className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
          >
            Design
          </button>
          <button
            onClick={() => filterType("development")}
            className="m-1 border border-[#365f7c]  hover:bg-[#365f7c] hover:text-white"
          >
            IT and Software
          </button>
          <button
            onClick={() => filterType("marketing")}
            className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
          >
            Marketing
          </button>
          <button
            onClick={() => filterType("business")}
            className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
          >
            Business
          </button>
        </div>
        <div>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
            <button
              onClick={() => filterPrice(0, 0)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              Free
            </button>
            <button
              onClick={() => filterPrice(5, 10)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              10$
            </button>
            <button
              onClick={() => filterPrice(10, 15)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              15$
            </button>
            <button
              onClick={() => filterPrice(15, 20)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              20$
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
            <button
              onClick={() => filterStudents(0, 1000)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              &gt;100
            </button>
            <button
              onClick={() => filterStudents(1000, 10000)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              &gt;1000
            </button>
            <button
              onClick={() => filterStudents(10000, 20000)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              &gt;10,000
            </button>
            <button
              onClick={() => filterPrice(20000, 100000)}
              className="m-1 border border-[#365f7c] hover:bg-[#365f7c] hover:text-white"
            >
              &gt;100,000
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-7xl mt-8">
        {courses.map((item) => (
          <section
            key={item._id}
            className="w-fit mx-auto justify-items-center justify-center "
          >
            <div className="w-72 shadow-md rounded-xl duration-500 hover:shadow-xl">
              <div className="">
                <Link href={`/courses/${item._id}`}>
                  <img
                    src={item.imageurl}
                    alt="Product"
                    className=" w-72 object-cover rounded-t-xl"
                  />
                </Link>
                <div className="px-4 py-3 w-72">
                  <Link href={`/courses/${item._id}`}>
                    <p className="text-lg font-bold truncate block capitalize">
                      {item.title}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold cursor-auto my-3">
                      ${item.price}
                    </p>
                    <button
                      onClick={() => {
                        dispatch(save(item));
                        notify();
                        setIsClicked(true);
                      }}
                      className="ml-auto"
                    >
                      <FaBookmark
                        className={
                          isClicked
                            ? "text-black dark:text-white"
                            : "text-gray-300 dark:text-blue-600"
                        }
                        size={30}
                      />
                    </button>
                  </div>
                  <div className="flex items-center mb-4 gap-3">
                    <IoTimeOutline size={30} />
                    <p className="text-lg font-semibold cursor-auto">
                      {item.duration} minutes
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[60px] text-black">
                      <Image
                        src={teacher}
                        width={50}
                        height={50}
                        alt="teacher"
                        className="bg-white p-1 rounded-md"
                      />{" "}
                    </div>
                    <h1>{item.teacher} </h1>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </section>
        ))}
      </div>
    </div>
  );
}
