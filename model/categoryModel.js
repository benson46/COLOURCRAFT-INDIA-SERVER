import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },status:{
        type: String,
        default:"Active",
        enum:["Active","Inactive"]
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
