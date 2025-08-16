import mongoose from "mongoose";

const catSchema = new mongoose.Schema(
    {
       
        title:{
            type:String,
        },
        question:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Ques",
        }]


    }
);

export const Cat = mongoose.model("Cat", catSchema);