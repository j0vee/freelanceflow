import { useEffect, useState } from "react";

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("/api/leads")
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setLeads(data);
        } catch (e) {
          setError("Could not parse server response");
        }
      })
      .catch(() => {
        setError("Failed to load leads from backend");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(""); // Clear any previous message

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Network response was not ok");

      const newLead = await res.json();
      setLeads((prev) => [...prev, newLead]);
      setFormData({ name: "", email: "", budget: "", notes: "" });
      setSuccessMessage("Lead added successfully!");
    } catch (err) {
      console.error("Failed to submit lead:", err);
      alert("Error submitting lead");
    } finally {
      setSubmitting(false);
      //Remove the success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete lead with id ${id}`);
      }

      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("There was a problem deleting the lead.");
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Leads List</h1>

      {loading && <p>Loading leads...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && leads.length === 0 && (
        <p>No leads yet. Add some below.</p>
      )}

      {!loading && !error && leads.length > 0 && (
        <ul style={{ paddingLeft: 0 }}>
          {leads.map((lead) => (
            <li key={lead.id} style={{ marginBottom: "1rem" }}>
              <strong>{lead.name}</strong>
              <br />
              {lead.email}
              <br />
              Budget:${lead.budget}
              <br />
              {lead.notes || "No notes"}
              <br />
              <button
                onClick={() => handleDelete(lead.id)}
                style={{
                  marginTop: "0.5rem",
                  color: "white",
                  background: "red",
                  border: "none",
                  padding: "0.25rem 0.5rem",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
      )}
      <hr style={{ margin: "2rem 0" }} />
      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Budget:</label>
          <br />
          <input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <br />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={submitting}
          style={{ marginTop: "1rem" }}
        >
          {submitting ? "Submitting..." : "Add Lead"}
        </button>
      </form>
    </main>
  );
}

export default App;
