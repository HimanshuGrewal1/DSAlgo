import mongoose from "mongoose";
import { Cat } from "../models/Catogries.modle.js"; 
import { Ques } from "../models/ques.modle.js";     
import axios from "axios";

const SeedDB = async () => {
  try {
   
    const { data } = await axios.get("https://test-data-gules.vercel.app/data.json");

  
    await Ques.deleteMany({});
    await Cat.deleteMany({});
    console.log("Old data cleared");

 
    const difficulties = ["easy", "medium", "hard"];
    const getRandomDifficulty = () =>
      difficulties[Math.floor(Math.random() * difficulties.length)];

    for (const category of data.data) {
      const quesIds = [];

      for (const q of category.ques) {
        if (!q.title) continue;

        const newQ = await Ques.create({
          title: q.title,
          difficulty: getRandomDifficulty(), 
          YURL: q.yt_link || null,
          P1URL: q.p1_link || null,
          P2URL: q.p2_link || null,
          tag: category.title,
        });

        quesIds.push(newQ._id);
      }

      await Cat.create({
        title: category.title,
        question: quesIds,
      });

      console.log(`Inserted Category: ${category.title} (${quesIds.length} questions)`);
    }

    console.log("Data Imported Successfully");

  } catch (error) {
    console.error(" Error:", error.message);
    process.exit(1);
  }
};

export default SeedDB;
