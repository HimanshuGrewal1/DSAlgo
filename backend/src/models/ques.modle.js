import mongoose from "mongoose";

const quesSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true,
        },
        difficulty:{
            type:String,
            enum:["easy","medium","hard"]
        },
        
        YURL:{
            type:String
        },
        P1URL:{
            type:String
        },
        P2URL:{
            type:String
        },
        tag:{
            type:String,
            enum:["Learn the basics","Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]","Recursion [PatternWise]","Bit Manipulation [Concepts & Problems]","Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]","Sliding Window & Two Pointer Combined Problems","Heaps [Learning, Medium, Hard Problems]","Greedy Algorithms [Easy, Medium/Hard]","Binary Trees [Traversals, Medium and Hard Problems]","Binary Search Trees [Concept and Problems]","Graphs [Concepts & Problems]","Dynamic Programming [Patterns and Problems]","Tries","Strings"]
        }
        


    }
);

export const Ques = mongoose.model("Ques", quesSchema);