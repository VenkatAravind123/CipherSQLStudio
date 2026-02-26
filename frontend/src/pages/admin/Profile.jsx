import React, { useEffect, useState } from "react";
import "../app/Profile.scss";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = () => {
      try {
        const userData = globalThis.localStorage?.getItem("user");

        if (!userData) {
          setError("No user data found. Please log in.");
          setProfile(null);
          return;
        }

        const parsed = JSON.parse(userData);
        setProfile(parsed);
        setError("");
      } catch (e) {
        console.error("Error fetching user data:", e);
        setError("Error loading user data");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="page1 profile">
      <div className="profile__header">
        <div>
          <h1>Profile</h1>
          <p>Manage and view your account details.</p>
        </div>
      </div>

      {loading ? (
        <div className="profile__panel">
          <p className="profile__muted">Loading...</p>
        </div>
      ) : error ? (
        <div className="profile__panel">
          <p className="profile__error">{error}</p>
        </div>
      ) : profile ? (
        <div className="profile__panel">
          <div className="profile__grid">
            <Row label="Name" value={profile.name ?? "—"} />
            <Row label="Email" value={profile.email ?? "—"} />
            <Row label="Role" value={profile.role ?? "—"} />
          </div>
        </div>
      ) : (
        <div className="profile__panel">
          <p className="profile__muted">No profile loaded.</p>
        </div>
      )}
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="profile__row">
      <div className="profile__label">{label}</div>
      <div className="profile__value">{value}</div>
    </div>
  );
}