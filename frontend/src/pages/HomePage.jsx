import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const { user, logout } = useAuthStore(); 

  const [cats, setCats] = useState([]);
  const [total, setTotal] = useState(0);
  const [openCat, setOpenCat] = useState(null);
  const [openQues, setOpenQues] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/GETQUES/GetCat");
      setCats(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDone = async (qid) => {
    try {
      await axios.post(
        `http://localhost:5000/api/user/MarkDone/${qid}`,
      
        { withCredentials: true }
      );
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBookmark = async (qid) => {
    try {
      await axios.post(
        `http://localhost:5000/api/user/MarkBookMark/${qid}`,
    
        { withCredentials: true }
      );
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  
  const getDifficultyBadge = (diff) => {
    const colors = {
      easy: "bg-green-200 text-green-800",
      medium: "bg-yellow-200 text-yellow-800",
      hard: "bg-red-200 text-red-800",
    };
    
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded ${colors[diff] || "bg-gray-200 text-gray-800"}`}
      >
        {diff}
      </span>
    );
  };

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">DSAlgo</h1>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {cats.length > 0 ? (
              cats.map((cat, index) => (
                <div
                  key={cat._id || index}
                  className="bg-white shadow-md rounded-lg border"
                >
         
                  <button
                    onClick={() =>
                      setOpenCat(openCat === index ? null : index)
                    }
                    className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    {cat.title}
                    <span className="text-gray-500">
                      {openCat === index ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openCat === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-3"
                      >
                        {cat.question && cat.question.length > 0 ? (
                          <ul className="space-y-2 mt-2">
                            {cat.question.map((q, i) => (
                              <li key={q._id || i} className="border rounded-md">
                               
                                <button
                                  onClick={() =>
                                    setOpenQues(
                                      openQues === q._id ? null : q._id
                                    )
                                  }
                                  className="w-full flex justify-between items-center p-2 text-left text-gray-700 hover:bg-gray-50"
                                >
                                  {q.title}
                                  <span className="text-gray-500">
                                    {openQues === q._id ? "−" : "+"}
                                  </span>
                                </button>

                             
                                <AnimatePresence>
                                  {openQues === q._id && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="px-4 pb-3 text-sm text-gray-600"
                                    >
                                      <p>
                                        <span className="font-semibold">
                                          Difficulty:
                                        </span>{" "}
                                       {getDifficultyBadge(q.difficulty)}
                                      </p>
                                      <p>
                                        <span className="font-semibold">
                                          Youtube:
                                        </span>{" "}
                                        <a
                                          href={q.YURL}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-500 underline"
                                        >
                                          {q.YURL || "Unknown"}
                                        </a>
                                      </p>
                                      {q.P1URL && (
                                        <a
                                          href={q.P1URL}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 hover:underline block"
                                        >
                                          View Problem 1
                                        </a>
                                      )}
                                      {q.P2URL && (
                                        <a
                                          href={q.P2URL}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 hover:underline block"
                                        >
                                          View Problem 2
                                        </a>
                                      )}

                                    
                                      {user && (
                                        <div className="flex gap-4 mt-3">
                                          <label className="flex items-center gap-2">
                                            <input
                                              type="checkbox"
                                              onChange={() => toggleDone(q._id)}
                                            />
                                            Done
                                          </label>
                                          <label className="flex items-center gap-2">
                                            <input
                                              type="checkbox"
                                              onChange={() =>
                                                toggleBookmark(q._id)
                                              }
                                            />
                                            Bookmark
                                          </label>
                                        </div>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 mt-2">
                            No questions in this category.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No categories found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
