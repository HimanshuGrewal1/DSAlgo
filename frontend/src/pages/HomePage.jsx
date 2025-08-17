// import { motion } from "framer-motion";
// import { useAuthStore } from "../store/authStore";
// import { formatDate } from "../utils/date";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import LoadingSpinner from "../components/LoadingSpinner";

// const HomePage = () => {
//     const { user, logout } = useAuthStore();


//     const handleLogout = () => {
//         logout();
//     };

//     const [Cat, setCat] = useState({});
//   const [total, setTotal] = useState(0);
   
//     const fetchQuestions = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/GETQUES/GetCat");
     
//        setCat(res.data.data); 
//          setTotal(res.data.total);

//     } catch (err) {
//       console.error(err);
//     }
//       console.log(Cat);
//   };
// fetchQuestions()
//    return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         DSAlgo
//       </h1>
  
      
//       <div className="grid gap-4 max-w-2xl mx-auto">
//         {Cat.length > 0 ? (
//           Cat.map((q) => (
//             <div
//               key={q._id}
//               className="bg-white p-4 shadow-md rounded-lg border"
//             >
//               <h2 className="text-lg font-semibold">{q.title}</h2>
//               <p className="text-sm text-gray-600">Difficulty: </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No questions found.</p>
//         )}
//       </div>

      
   
//     </div>
   
//   );
// };

// export default HomePage;

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
  console.log(cats);

  useEffect(() => {
    fetchQuestions();
  }, []);

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
                            <li
                              key={q._id || i}
                              className="border rounded-md"
                            >
                      
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
                                      {q.difficulty || "Unknown"}
                                    </p>
                                     <p>
                                 <span className="font-semibold">Youtube:</span>{" "}
                                     <a
                                          href={q.YURL}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                                 className="text-blue-500 underline"
                                     >
                                     {q.YURL || "Unknown"}
                                    </a>
                                    </p>
                                         {/* <p>
                                 <span className="font-semibold">Problem 1:</span>{" "}
                                     <a
                                          href={q.P1URL}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                                 className="text-blue-500 underline"
                                     >
                                     {q.P1URL || "Unknown"}
                                    </a>
                                    </p> */}
                                         {/* <p>
                                 <span className="font-semibold">Problem 2:</span>{" "}
                                     <a
                                          href={q.P2URL}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                                 className="text-blue-500 underline"
                                     >
                                     {q.P2URL || "Unknown"}
                                    </a>
                                    </p> */}
                                    {/* <p>
                                      <span className="font-semibold">
                                        Created At:
                                      </span>{" "}
                                      {q.createdAt
                                        ? new Date(
                                            q.createdAt
                                          ).toLocaleDateString()
                                        : "N/A"}
                                    </p> */}
                                    {q.P1URL && (
                                      <a
                                        href={q.P1URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        View Problem
                                      </a>
                                    )}
                                     {q.P2URL && (
                                      <a
                                        href={q.P2URL}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        View Problem
                                      </a>
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
