import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listRepairRequests } from "../lib/repository";

function StatusPill({ status }) {
  const normalized = (status || "Unknown").toLowerCase();
  const cls =
    normalized.includes("complete") || normalized.includes("done")
      ? "pill pill--success"
      : normalized.includes("progress") || normalized.includes("assigned")
        ? "pill pill--info"
        : normalized.includes("cancel")
          ? "pill pill--danger"
          : "pill pill--warn";
  return <span className={cls}>{status || "Unknown"}</span>;
}

export default function MyRequests() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await listRepairRequests();
      if (mounted) {
        setItems(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="container">
      <div className="pageHead">
        <h1 className="h2">My requests</h1>
        <p className="muted">Track live progress and view details of each booking.</p>
      </div>

      <div className="card card--border">
        {loading ? (
          <div className="skeleton" style={{ height: 180 }} />
        ) : items.length === 0 ? (
          <div className="empty">
            <div className="empty__title">No requests yet</div>
            <div className="muted">Create your first booking to start tracking repairs.</div>
            <Link className="btn btn--primary" to="/book">
              Book Repair
            </Link>
          </div>
        ) : (
          <div className="table">
            <div className="table__head">
              <div>Device</div>
              <div>Status</div>
              <div className="hideSm">Preferred time</div>
              <div />
            </div>
            {items.map((r) => (
              <div key={r.id} className="table__row">
                <div>
                  <div className="row__title">{r.device_type || "Device"}</div>
                  <div className="muted small">{r.issue || "—"}</div>
                </div>
                <div>
                  <StatusPill status={r.status} />
                </div>
                <div className="hideSm">{r.preferred_time || "—"}</div>
                <div style={{ textAlign: "right" }}>
                  <Link className="btn btn--small btn--ghost" to={`/requests/${r.id}`}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
