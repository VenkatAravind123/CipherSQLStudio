import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const API = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:5000";

export default function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/auth/getallassignments`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch");
        setAssignments(data.assignments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

   const displayAssignment = async (id) => {
    try{
      navigate(`/app/assignment/${id}`)
    }
    catch(err){
      console.error(err.message);
    }
  };
  // const handleDelete = async (id) => {
  //   if (!globalThis.confirm("Delete this assignment? This cannot be undone.")) return;

  //   try {
  //     const res = await fetch(`${API}/api/user/assignments/${id}`, {
  //       method: "DELETE",
  //       credentials: "include",
  //     });
  //     if (res.ok) {
  //       setAssignments((prev) => prev.filter((a) => a._id !== id));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const badge = (d) =>
    d === "easy"
      ? "admin-assignments__badge--easy"
      : d === "medium"
      ? "admin-assignments__badge--medium"
      : "admin-assignments__badge--hard";

  return (
    <section className="page1 admin-assignments">
      <div className="admin-assignments__header">
        <div>
          <h1>Assignments</h1>
          <p>Complete all SQL assignments.</p>
        </div>
      </div>

      {loading ? (
        <div className="admin-assignments__panel">
          <p className="admin-assignments__muted">Loading assignments...</p>
        </div>
      ) : error ? (
        <div className="admin-assignments__panel">
          <p className="admin-assignments__error">{error}</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="admin-assignments__empty">
          <h2>No assignments yet</h2>
          <p>Contact the Administrator to get started.</p>
          
        </div>
      ) : (
        <div className="admin-assignments__grid">
          {assignments.map((a) => (
            <div key={a._id} className="admin-assignments__card">
              <div className="admin-assignments__card-top">
                <span className={`admin-assignments__badge ${badge(a.difficulty)}`}>
                  {a.difficulty}
                </span>
                {a.category && (
                  <span className="admin-assignments__category">{a.category}</span>
                )}
                <span className="admin-assignments__date">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h2>{a.title}</h2>
              <p className="admin-assignments__desc">{a.description}</p>

              <div className="admin-assignments__status">
                {a.setupSQL && a.solutionSQL ? (
                  <span className="admin-assignments__tag admin-assignments__tag--ready">
                    ✓ SQL Ready
                  </span>
                ) : (
                  <span className="admin-assignments__tag admin-assignments__tag--draft">
                    ⚠ Draft — SQL not configured
                  </span>
                )}
              </div>

              <div className="admin-assignments__card-actions">
                <button
                  className="admin-assignments__action-btn admin-assignments__action-btn--edit"
                  onClick={() => displayAssignment(a._id)}
                >
                  Attempt
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}