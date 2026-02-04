import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/auth.js";

function TableView({ rows }) {
  const columns = useMemo(() => {
    const set = new Set();
    for (const r of rows) Object.keys(r || {}).forEach((k) => set.add(k));
    return Array.from(set);
  }, [rows]);

  if (!rows.length) return <p>No rows.</p>;
  if (!columns.length) return <p>No columns.</p>;

  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx}>
            {columns.map((c) => (
              <td key={c}>
                {typeof r[c] === "object" && r[c] !== null ? JSON.stringify(r[c]) : String(r[c] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminPanel() {
  const [tables, setTables] = useState([]);
  const [selected, setSelected] = useState("");
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loadingTables, setLoadingTables] = useState(true);
  const [loadingRows, setLoadingRows] = useState(false);

  // fetch table list
  useEffect(() => {
    (async () => {
      setErr("");
      setLoadingTables(true);
      try {
        const res = await apiFetch("http://localhost:5000/api/admin/tables");
        if (!res.ok) throw new Error(`Failed to load tables (${res.status})`);
        const data = await res.json();
        setTables(data.tables || []);
        setSelected((data.tables && data.tables[0]) || "");
      } catch (e) {
        setErr(e.message || "Failed to load tables");
      } finally {
        setLoadingTables(false);
      }
    })();
  }, []);

  // fetch rows when selected changes
  useEffect(() => {
    if (!selected) return;
    (async () => {
      setErr("");
      setLoadingRows(true);
      try {
        const res = await apiFetch(`http://localhost:5000/api/admin/tables/${encodeURIComponent(selected)}`);
        if (!res.ok) throw new Error(`Failed to load table (${res.status})`);
        const data = await res.json();
        setRows(data.rows || []);
      } catch (e) {
        setErr(e.message || "Failed to load rows");
        setRows([]);
      } finally {
        setLoadingRows(false);
      }
    })();
  }, [selected]);

  return (
    <div>
      <h1>Admin Panel</h1>

      {err ? <p>{err}</p> : null}

      <section>
        <h2>Tables</h2>
        {loadingTables ? (
          <p>Loading tables...</p>
        ) : (
          <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            {tables.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </section>

      <section>
        <h2>Data: {selected || "-"}</h2>
        {loadingRows ? <p>Loading rows...</p> : <TableView rows={rows} />}
      </section>
    </div>
  );
}
