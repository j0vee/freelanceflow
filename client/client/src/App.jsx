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

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newLead = await res.json();
      setLeads((prev) => [...prev, newLead]);
      setFormData({ name: "", email: "", budget: "", notes: "" }); //reset form
    } catch (err) {
      console.error("Failed to submit lead:", err);
      alert("Error submitting lead");
    } finally {
      setSubmitting(false);
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
            </li>
          ))}
        </ul>
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
