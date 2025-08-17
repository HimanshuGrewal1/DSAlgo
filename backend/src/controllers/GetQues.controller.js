import { Ques } from "../models/ques.modle.js";
import { Cat } from "../models/Catogries.modle.js";


export const GETQUES = async (req, res) =>{
     try {
    let { search, difficulty, page, limit } = req.query;

    console.log(difficulty, search, page, limit);
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; 
    }
    if (difficulty) {
      query.difficulty = difficulty.toLowerCase(); 
      
    }

  
    const skip = (page - 1) * limit;
   
    const questions = await Ques.find(query)
      .skip(skip)
      .limit(limit);

  
     const total = await Ques.countDocuments(query);

   
    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: questions,
    });

    
  } catch (err) {
    console.error("Error in GETQUES controller:", err);
    return res.status(500).json({ error: err.message });
  }
};


export const GetCat=async (req,res) => {
       try {
   let query={}
    const Cato = await Cat.find(query).populate("question", "title difficulty YURL P1URL P2URL tag");

     const total = await Cat.countDocuments(query);

   
    res.json({
      total,
      data: Cato,
    });

    
  } catch (err) {
    console.error("Error in GetCat controller:", err);
    return res.status(500).json({ error: err.message });
  }
}
