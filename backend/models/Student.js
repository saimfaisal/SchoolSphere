import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    className: { type: String, required: true },
    section: { type: String, required: true },
    rollNo: { type: String, required: true }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
