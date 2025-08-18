import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/user/getUser`, {
          withCredentials: true,
        });
        setUser(data.user);

      
        const totalQues = data.total;
        const completed = data.user.QuesDone?.length || 0;
        console.log(data);
        setProgress(((completed / totalQues) * 100).toFixed(1));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading Dashboard...</p>
      </div>
    );
  }
  // console.log("User Data:", user);

  return (
    <div className="pt-20">
    <div className="min-h-screen bg-gray-50 p-6">
   
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user.name} 👋
        </h1>
        <p className="text-gray-600">
          Last Login: {new Date(user.lastLogin).toLocaleString()}
        </p>
      </div>

 
      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Progress Tracker</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-gray-700">{progress}% Completed</p>
      </div>


      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Bookmarked Questions</h2>
        {user.BookMark && user.BookMark.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {user.BookMark.map((q) => (
              <li key={q._id} className="text-gray-700">
                {q.title || "Untitled Question"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bookmarks yet.</p>
        )}
      </div>

    
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">Completed Questions</h2>
        {user.QuesDone && user.QuesDone.length > 0 ? (
          <ul className="list-decimal pl-5 space-y-2">
            {user.QuesDone.map((q) => (
              <li key={q._id} className="text-gray-700">
                {q.title || "Untitled Question"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No completed questions yet.</p>
        )}
      </div>
    </div>
    </div>
  );
}
