import React, { useEffect, useState } from "react";
import { getReports, submitReport } from "../../services/Apiservice";
import { uploadToIPFS } from "../../services/Ipfsservice";
import { submitThreatReport } from "../../services/Threatintelservice";

const Reportstab = ({ userAddress }) => {
  const [category, setCategory] = useState("Malware");
  const [details, setDetails] = useState("");
  const [reports, setReports] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error("Failed to load reports:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userAddress) {
      alert("Connect wallet first.");
      return;
    }
    if (!details.trim()) {
      alert("Enter report details.");
      return;
    }

    try {
      setSubmitting(true);

      // 1. Upload to IPFS
      const ipfsHash = await uploadToIPFS(details.trim());

      // 2. Submit to smart contract
      await submitThreatReport(ipfsHash);

      // 3. Submit to backend API
      await submitReport({
        wallet: userAddress,
        category,
        data: details.trim(),
        hash: ipfsHash,
      });

      setDetails("");
      await loadReports();
    } catch (error) {
      alert(error?.error || error?.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <form
        onSubmit={onSubmit}
        style={{
          border: "1px solid rgba(34, 211, 238, 0.35)",
          background: "rgba(0, 0, 0, 0.35)",
          borderRadius: 8,
          padding: 16,
          display: "grid",
          gap: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Submit Threat Report</h3>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Malware">Malware</option>
          <option value="Phishing">Phishing</option>
        </select>
        <textarea
          rows={4}
          placeholder="Describe indicator, payload, IOC, or behavior"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      <section
        style={{
          border: "1px solid rgba(34, 211, 238, 0.35)",
          background: "rgba(0, 0, 0, 0.35)",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Recent Reports</h3>
        {reports.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No reports yet.</p>
        ) : (
          reports.slice(0, 10).map((report) => (
            <div key={report._id} style={{ padding: "10px 0", borderBottom: "1px solid #1f2937" }}>
              <div>
                <strong>{report.category}</strong> by {report.wallet}
              </div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>hash: {report.hash}</div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Reportstab;
