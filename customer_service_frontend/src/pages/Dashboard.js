import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listRepairRequests } from "../lib/repository";
import { isSupabaseConfigured } from "../lib/supabaseClient";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await listRepairRequests();
      if (mounted) {
        setRequests(data);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const counts = requests.reduce((acc, r) => {
      const key = r.status || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return counts;
  }, [requests]);

  return (
    <main className="container">
      <section className="hero">
        <div className="hero__content">
          <h1 className="h1">Book a mobile repair in minutes.</h1>
          <p className="muted">
            Request a technician visit, track status updates, and get billing updates—powered by a clean Ocean Professional
            UI.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/book">
              Book a Repair
            </Link>
            <Link className="btn btn--ghost" to="/requests">
              Track Requests
            </Link>
          </div>
          <div className="hint">
            Data mode:{" "}
            <strong>{isSupabaseConfigured ? "Supabase (env configured)" : "Local preview (no Supabase env)"} </strong>
          </div>
        </div>

        <div className="hero__card">
          <div className="card card--soft">
            <div className="card__title">Status snapshot</div>
            {loading ? (
              <div className="skeleton" style={{ height: 92 }} />
            ) : requests.length === 0 ? (
              <div className="muted">No requests yet. Create one from “Book Repair”.</div>
            ) : (
              <div className="grid grid--2">
                {Object.entries(summary).map(([k, v]) => (
                  <div key={k} className="stat">
                    <div className="stat__label">{k}</div>
                    <div className="stat__value">{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card card--border">
            <div className="card__title">Most recent</div>
            {loading ? (
              <div className="skeleton" style={{ height: 70 }} />
            ) : (
              <>
                {requests[0] ? (
                  <div className="row">
                    <div>
                      <div className="row__title">{requests[0].device_type || "Device"}</div>
                      <div className="muted">{requests[0].issue || "Issue"}</div>
                    </div>
                    <Link className="btn btn--small btn--ghost" to={`/requests/${requests[0].id}`}>
                      View
                    </Link>
                  </div>
                ) : (
                  <div className="muted">Create your first request to see it here.</div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
