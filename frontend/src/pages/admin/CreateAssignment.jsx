import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

const API = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:5000";

export default function CreateAssignment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    category: "",
    setupSQL: "",
    solutionSQL: "",
    hint: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/admin/addassignment`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to create assignment.");
        return;
      }

      setSuccess("Assignment created successfully!");
      setForm({
        title: "",
        description: "",
        difficulty: "easy",
        category: "",
        setupSQL: "",
        solutionSQL: "",
        hint: "",
      });

      // Redirect to assignments list after 1.5s
      setTimeout(() => navigate("/admin/assignments"), 1500);
    } catch (err) {
      setError(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page1 create-assignment">
      <div className="create-assignment__header">
        <h1>Create Assignment</h1>
        <p>Add a new SQL assignment for students.</p>
      </div>

      {error && <div className="create-assignment__alert create-assignment__alert--error">{error}</div>}
      {success && <div className="create-assignment__alert create-assignment__alert--success">{success}</div>}

      <form className="create-assignment__form" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="create-assignment__group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. SQL SELECT Basics"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="create-assignment__group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe what the student needs to do..."
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Difficulty + Category (side by side) */}
        <div className="create-assignment__row">
          <div className="create-assignment__group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="create-assignment__group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              placeholder="e.g. SELECT, JOIN, GROUP BY"
              value={form.category}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Setup SQL */}
        <div className="create-assignment__group">
          <label htmlFor="setupSQL">
            Setup SQL
            <span className="create-assignment__hint">CREATE TABLE + INSERT statements</span>
          </label>
          <textarea
            id="setupSQL"
            name="setupSQL"
            placeholder={`CREATE TABLE employees (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100),\n  salary INT\n);\n\nINSERT INTO employees (name, salary) VALUES\n('Alice', 50000),\n('Bob', 60000);`}
            rows={8}
            value={form.setupSQL}
            onChange={handleChange}
            className="create-assignment__code"
          />
        </div>

        {/* Solution SQL */}
        <div className="create-assignment__group">
          <label htmlFor="solutionSQL">
            Solution SQL
            <span className="create-assignment__hint">The correct query (hidden from students)</span>
          </label>
          <textarea
            id="solutionSQL"
            name="solutionSQL"
            placeholder="SELECT * FROM employees WHERE salary > 50000;"
            rows={4}
            value={form.solutionSQL}
            onChange={handleChange}
            className="create-assignment__code"
          />
        </div>

        {/* Hint */}
        <div className="create-assignment__group">
          <label htmlFor="hint">
            Hint
            <span className="create-assignment__hint">Optional hint for students</span>
          </label>
          <input
            id="hint"
            name="hint"
            type="text"
            placeholder="e.g. Use WHERE clause to filter rows"
            value={form.hint}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="create-assignment__actions">
          <button
            type="submit"
            className="create-assignment__btn create-assignment__btn--primary"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Assignment"}
          </button>
          <button
            type="button"
            className="create-assignment__btn create-assignment__btn--secondary"
            onClick={() => navigate("/admin/assignments")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}