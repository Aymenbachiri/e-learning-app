import { Schema, model, models } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    videoeurl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    enrolledstudents: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", courseSchema);
export default Course;
