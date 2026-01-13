import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRepairRequest } from "../lib/repository";

const DEVICE_TYPES = ["Phone", "Tablet", "Laptop", "Other"];

export default function BookRepair() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    device_type: "Phone",
    issue: "",
    address: "",
    preferred_time: "",
  });

  const isValid = useMemo(() => {
    return (
      form.customer_name.trim().length >= 2 &&
      form.phone.trim().length >= 6 &&
      form.issue.trim().length >= 5 &&
      form.address.trim().length >= 5
    );
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    try {
      const created = await createRepairRequest(form);
      navigate(`/requests/${created.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container">
      <div className="pageHead">
        <h1 className="h2">Book a repair</h1>
        <p className="muted">Tell us what needs fixing and when/where you want the technician to arrive.</p>
      </div>

      <form className="card card--border form" onSubmit={onSubmit}>
        <div className="grid grid--2">
          <label className="field">
            <span className="field__label">Full name</span>
            <input
              className="input"
              name="customer_name"
              value={form.customer_name}
              onChange={onChange}
              autoComplete="name"
              placeholder="Jane Doe"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Phone</span>
            <input
              className="input"
              name="phone"
              value={form.phone}
              onChange={onChange}
              autoComplete="tel"
              placeholder="+1 555 0100"
              required
            />
          </label>
        </div>

        <div className="grid grid--2">
          <label className="field">
            <span className="field__label">Device type</span>
            <select className="input" name="device_type" value={form.device_type} onChange={onChange}>
              {DEVICE_TYPES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Preferred time</span>
            <input
              className="input"
              name="preferred_time"
              value={form.preferred_time}
              onChange={onChange}
              placeholder="Tomorrow 2–4pm"
            />
          </label>
        </div>

        <label className="field">
          <span className="field__label">Issue description</span>
          <textarea
            className="input input--textarea"
            name="issue"
            value={form.issue}
            onChange={onChange}
            placeholder="Screen cracked, touch not responding..."
            required
          />
        </label>

        <label className="field">
          <span className="field__label">Address</span>
          <input
            className="input"
            name="address"
            value={form.address}
            onChange={onChange}
            autoComplete="street-address"
            placeholder="123 Ocean Ave, Suite 5"
            required
          />
        </label>

        <div className="form__actions">
          <button className="btn btn--primary" type="submit" disabled={!isValid || submitting}>
            {submitting ? "Submitting…" : "Submit request"}
          </button>
          <div className="muted small">
            We’ll show your request immediately (Supabase if configured, otherwise local preview storage).
          </div>
        </div>
      </form>
    </main>
  );
}
