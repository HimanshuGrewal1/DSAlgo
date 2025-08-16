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
            enum:["easy","medium","difficult"]
        },
        
        YURL:{
            type:string
        },
        P1URL:{
            type:string
        },
        P2URL:{
            type:string
        },
        tag:{
            type:string,
            enum:["Learn the basics","Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]","Recursion [PatternWise]","Bit Manipulation [Concepts & Problems]","Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]","Sliding Window & Two Pointer Combined Problems","Heaps [Learning, Medium, Hard Problems]","Greedy Algorithms [Easy, Medium/Hard]","Binary Trees [Traversals, Medium and Hard Problems]","Binary Search Trees [Concept and Problems]","Graphs [Concepts & Problems]","Dynamic Programming [Patterns and Problems]","Tries"]
        }
        


    }
);

export const Ques = mongoose.model("Ques", quesSchema);