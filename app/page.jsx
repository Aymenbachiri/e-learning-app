import Image from "next/image";
import learn from "/public/undraw_mathematics_4otb.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1640px] mx-auto p-4 h-[80vh] flex flex-col justify-center items-center ">
      <h1 className="text-4xl font-bold mb-4">LEARN WITHOUT LIMITS</h1>
      <p className="text-lg text-center mb-8 px-4">
        Start, redirect, or advance your career with over 5,800 courses,
        professional certificates, and degrees from internationally renowned
        universities and companies.
      </p>
      <div className="max-w-lg">
        <Image
          src={learn}
          alt="learn"
          layout="responsive"
          width={500}
          height={500}
        />
      </div>
      <Link
        href="/courses"
        className="mt-8 underline text-xl md:text-3xl font-bold"
      >
        Learn Now
      </Link>
    </div>
  );
}
