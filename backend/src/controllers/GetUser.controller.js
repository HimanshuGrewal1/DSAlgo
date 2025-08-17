import { User } from "../models/user.modle.js";
import { Ques } from "../models/ques.modle.js";


export const MarkDone = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    console.log("User ID:", userId);
    console.log("Question ID:", id);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.QuesDone.includes(id)) {
            user.QuesDone.push(id);
            console.log("Question marked as done:", id);
            await user.save();
            
        }
        else {
            user.QuesDone = user.QuesDone.filter(quesId => quesId.toString() !== id);
            await user.save();
        }

        res.status(200).json({ message: "Question marked as done" });
    } catch (error) {
        console.error("Error marking question as done:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const MarkBookMark = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.BookMark.includes(id)) {
            user.BookMark.push(id);
            await user.save();
        }
        else {
            user.BookMark = user.BookMark.filter(quesId => quesId.toString() !== id);
            await user.save();
        }

        res.status(200).json({ message: "Question bookmarked" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getUser = async (req, res) => {
    const userId = req.userId;
   console.log("User ID:", userId);
    try {
        const user = await User.findById(userId).populate("QuesDone").populate("BookMark");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            total: await Ques.countDocuments(),
            user: {
                ...user._doc,
                password: undefined, 
            },
        });
    } catch (error) {
        console.log("Error in getUser ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}