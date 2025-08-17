import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const PaginationPage = () => {
    const { user, logout } = useAuthStore();


    const handleLogout = () => {
        logout();
    };

    const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [totalPages,settotalPages] = useState(0);

 useEffect(() => {
    fetchQuestions();
  }, [search, difficulty, page, limit]);
   
    const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/GETQUES", {
        params: {
          search,
          difficulty,
          page,
          limit,
        },
      });
     
      +   setQuestions(res.data.data); 
+   setTotal(res.data.total);
+   settotalPages(res.data.totalPages); 
    } catch (err) {
      console.error(err);
    }
      settotalPages(Math.ceil(total / limit));
  };

   return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Questions Explorer
      </h1>

    
      <div className="flex gap-4 mb-6 justify-center">
       
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 rounded-lg w-64"
        />

     
        <select
          value={difficulty}
          onChange={(e) => {
            setPage(1);
            setDifficulty(e.target.value);
          }}
          className="border p-2 rounded-lg"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

      
        <select
          value={limit}
          onChange={(e) => {
            setPage(1);
            setLimit(parseInt(e.target.value));
          }}
          className="border p-2 rounded-lg"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      
      <div className="grid gap-4 max-w-2xl mx-auto">
        {questions.length > 0 ? (
          questions.map((q) => (
            <div
              key={q._id}
              className="bg-white p-4 shadow-md rounded-lg border"
            >
              <h2 className="text-lg font-semibold">{q.title}</h2>
              <p className="text-sm text-gray-600">Difficulty: {q.difficulty}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No questions found.</p>
        )}
      </div>

      
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationPage;