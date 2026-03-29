import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewUsers() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminaccessToken");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/get-all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("users=", res.data.data.users);
        setUsers(res.data.data.users);
      } catch (err) {
        console.error(err);
        alert("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A002B] text-white px-4 py-10">
      {/* Glow */}
      <div className="absolute w-72 h-72 bg-[#7B2CBF] opacity-30 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-[#C8A2FF] opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="relative max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-[#7B2CBF]/30 rounded-3xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#C8A2FF]">All Users</h2>

          <button
            onClick={() => navigate("/admin-profile")}
            className="text-sm border border-[#C8A2FF]/40 px-3 py-1 rounded-lg hover:bg-[#7B2CBF]/30 transition"
          >
            Back
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-[#C8A2FF]/60">Loading users...</p>
        )}

        {/* Empty */}
        {!loading && users.length === 0 && (
          <p className="text-center text-[#C8A2FF]/60">No users found 😔</p>
        )}

        {/* USERS LIST */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-[#2A0A3D] p-4 rounded-xl flex justify-between items-center hover:scale-[1.02] transition"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                <img
                  src={u.ProfilePicture}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover border border-[#C8A2FF]"
                />

                <div>
                  <h3 className="text-[#C8A2FF] font-semibold">{u.fullname}</h3>

                  <p className="text-xs text-[#C8A2FF]/60">@{u.username}</p>

                  <p className="text-xs text-[#C8A2FF]/50">{u.email}</p>
                </div>
              </div>

              {/* RIGHT SIDE (CHARITY) */}
              <div className="text-right">
                {u.charity ? (
                  <div className="flex items-center gap-2 justify-end">
                    <img
                      src={u.charity.image}
                      alt="charity"
                      className="w-10 h-10 rounded object-cover border border-[#C8A2FF]"
                    />

                    <span className="text-sm text-[#C8A2FF]">
                      {u.charity.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-[#C8A2FF]/50">No Charity</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER STATS */}
        {users.length > 0 && (
          <div className="mt-6 bg-[#2A0A3D] p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold text-[#C8A2FF]">{users.length}</h3>
            <p className="text-xs text-[#C8A2FF]/60">Total Users</p>
          </div>
        )}
      </div>
    </div>
  );
}
