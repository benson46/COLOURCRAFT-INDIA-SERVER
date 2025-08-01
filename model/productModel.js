import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
  },
  description: {
    type: String,
    required: true,
    trim:true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price:{
    type:Number,
    required:true,
    min:1,
  },images:{
    type: [String],
    required: true,
    validate:(arr) => arr.length >=3 
  },
  stock:{
    type: Number,
    required: true,
    default:1,
    min:0,
  },ratings:{
    type:[String],
    default:[],
  },isBlocked:{
    type: Boolean,
    default:false
  },
},{
    timestamps:true
}
);

export default mongoose.model("Product",productSchema);