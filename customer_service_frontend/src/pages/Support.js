import React from "react";

export default function Support() {
  return (
    <main className="container">
      <div className="pageHead">
        <h1 className="h2">Support</h1>
        <p className="muted">Need help? Here are quick options to resolve common issues.</p>
      </div>

      <div className="grid grid--2">
        <div className="card card--border">
          <div className="card__title">Common questions</div>
          <ul className="list">
            <li>How do I change my preferred time? (Create a new request for now.)</li>
            <li>What if my device model is uncommon? (Use “Other” and describe it in the issue.)</li>
            <li>Do you provide spare parts? (Service centers manage inventory in their portal.)</li>
          </ul>
        </div>
        <div className="card card--soft">
          <div className="card__title">Contact</div>
          <div className="muted">
            For preview builds this is placeholder content. In production, connect this to your support inbox.
          </div>
          <div className="kv" style={{ marginTop: 12 }}>
            <div className="kv__row">
              <div className="kv__k">Email</div>
              <div className="kv__v">support@example.com</div>
            </div>
            <div className="kv__row">
              <div className="kv__k">Phone</div>
              <div className="kv__v">+1 555 0123</div>
            </div>
            <div className="kv__row">
              <div className="kv__k">Hours</div>
              <div className="kv__v">Mon–Sat, 9am–6pm</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
