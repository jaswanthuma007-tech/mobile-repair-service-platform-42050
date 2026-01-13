import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRepairRequestById } from "../lib/repository";

const STEPS = ["Requested", "Assigned", "In Progress", "Completed"];

function stepIndex(status) {
  const idx = STEPS.findIndex((s) => s.toLowerCase() === (status || "").toLowerCase());
  return idx >= 0 ? idx : 0;
}

export default function RequestDetail() {
  const { requestId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const found = await getRepairRequestById(requestId);
      if (mounted) {
        setItem(found);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [requestId]);

  const activeIdx = useMemo(() => stepIndex(item?.status), [item?.status]);

  return (
    <main className="container">
      <div className="pageHead pageHead--row">
        <div>
          <h1 className="h2">Request details</h1>
          <p className="muted">ID: {requestId}</p>
        </div>
        <Link className="btn btn--ghost" to="/requests">
          Back to requests
        </Link>
      </div>

      {loading ? (
        <div className="card card--border">
          <div className="skeleton" style={{ height: 220 }} />
        </div>
      ) : !item ? (
        <div className="card card--border empty">
          <div className="empty__title">Request not found</div>
          <div className="muted">This request might not exist in the current data source.</div>
          <Link className="btn btn--primary" to="/book">
            Create a new request
          </Link>
        </div>
      ) : (
        <div className="grid grid--2">
          <div className="card card--border">
            <div className="card__title">Summary</div>
            <div className="kv">
              <div className="kv__row">
                <div className="kv__k">Customer</div>
                <div className="kv__v">{item.customer_name}</div>
              </div>
              <div className="kv__row">
                <div className="kv__k">Phone</div>
                <div className="kv__v">{item.phone}</div>
              </div>
              <div className="kv__row">
                <div className="kv__k">Device</div>
                <div className="kv__v">{item.device_type}</div>
              </div>
              <div className="kv__row">
                <div className="kv__k">Status</div>
                <div className="kv__v">
                  <span className="pill pill--info">{item.status}</span>
                </div>
              </div>
              <div className="kv__row">
                <div className="kv__k">Preferred time</div>
                <div className="kv__v">{item.preferred_time || "—"}</div>
              </div>
              <div className="kv__row">
                <div className="kv__k">Address</div>
                <div className="kv__v">{item.address}</div>
              </div>
            </div>
          </div>

          <div className="card card--soft">
            <div className="card__title">Tracking</div>
            <ol className="steps" aria-label="Repair status steps">
              {STEPS.map((s, idx) => {
                const state = idx < activeIdx ? "done" : idx === activeIdx ? "active" : "todo";
                return (
                  <li key={s} className={`steps__item steps__item--${state}`}>
                    <div className="steps__dot" aria-hidden="true" />
                    <div>
                      <div className="steps__label">{s}</div>
                      <div className="muted small">
                        {s === "Requested" && "We received your request."}
                        {s === "Assigned" && "A technician is being assigned."}
                        {s === "In Progress" && "Repair is underway."}
                        {s === "Completed" && "Repair completed and ready for billing."}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="card__note">
              In a full deployment, this page would subscribe to realtime updates via Supabase or a backend.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
