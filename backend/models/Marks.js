import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    subject: { type: String, required: true },
    marks: { type: Number, required: true }
  },
  { timestamps: true }
);

const Marks = mongoose.model("Marks", marksSchema);
export default Marks;
