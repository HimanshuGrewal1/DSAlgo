
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";

const PaginationPage = () => {
  const { user ,isAuthenticated} = useAuthStore(); 
//   const isAuthenticated=true
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
   const [doneSet, setDoneSet] = useState(new Set());
  const [bookmarkSet, setBookmarkSet] = useState(new Set());

  useEffect(() => {
    fetchQuestions();
  }, [search, difficulty, page, limit]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/GETQUES", {
        params: { search, difficulty, page, limit },
      });

      setQuestions(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
        if (user) {
        setDoneSet(new Set(user.QuesDone || []));
        setBookmarkSet(new Set(user.BookMark || []));
      }
    } catch (err) {
      console.error(err);
    }
  };

  
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


  const toggleDone = async (qid) => {
    try {
      await axios.post(
        `http://localhost:5000/api/user/MarkDone/${qid}`,
      
        { withCredentials: true }
      );
       setDoneSet((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(qid)) newSet.delete(qid);
        else newSet.add(qid);
        return newSet;
      });
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
        setBookmarkSet((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(qid)) newSet.delete(qid);
        else newSet.add(qid);
        return newSet;
      });
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };
  return (
     <div className="pt-20">
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        DSAlgo
      </h1>

 
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 rounded-lg w-full sm:w-64"
        />

        <select
          value={difficulty}
          onChange={(e) => {
            setPage(1);
            setDifficulty(e.target.value);
          }}
          className="border p-2 rounded-lg w-full sm:w-auto"
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
          className="border p-2 rounded-lg w-full sm:w-auto"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>


      <div className="grid gap-4 max-w-2xl mx-auto">
        {questions.length > 0 ? (
          questions.map((q) =>{ 
             const isDone = doneSet.has(q._id);
                              const isBookmarked = bookmarkSet.has(q._id);
            
            return (
            <div
              key={q._id}
              className={`${ isDone
                                      ? "bg-green-100 border-green-400"
                                      : "bg-white"
                                  } p-4 shadow-md rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}
            >
 
              <div>
                <h2 className="text-lg font-semibold">{q.title}</h2>
                <p className="text-sm mt-1">
                  Difficulty: {getDifficultyBadge(q.difficulty)}
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
              </div>


              {isAuthenticated && (
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-1">
                    <input type="checkbox"  checked={isDone} onChange={()=>toggleDone(q._id)} className="accent-green-600" />
                    <span className="text-sm">Done</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox"  checked={isBookmarked} onChange={()=>toggleBookmark(q._id)} className="accent-blue-600" />
                    <span className="text-sm">Bookmark</span>
                  </label>
                </div>
              )}
            </div>
          )})
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
    </div>
  );
};

export default PaginationPage;
