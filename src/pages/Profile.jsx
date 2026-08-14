import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view your profile.");
      setLoading(false);
      return;
    }

    api.get("profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PROFILE:", response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to load profile.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger"></div>
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }

  const firstLetter = user.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  const joinedDate = user.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="container py-5">

      {/* Page Heading */}
      <div className="mb-4">
        <h1 className="fw-bold">My Profile</h1>
        <p className="text-muted">
          Manage your account information
        </p>
      </div>

      <div className="row g-4">

        {/* Profile Card */}
        <div className="col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 text-center p-4">

            {/* Avatar */}
            <div
              className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "110px",
                height: "110px",
                fontSize: "45px",
                fontWeight: "700",
              }}
            >
              {firstLetter}
            </div>

            <h3 className="fw-bold mb-1">
              {user.username}
            </h3>

            <p className="text-muted mb-3">
              {user.email}
            </p>

            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
              ● Active Account
            </span>

          </div>

        </div>

        {/* Account Information */}
        <div className="col-lg-8">

          <div className="card border-0 shadow-sm rounded-4 p-4">

            <h4 className="fw-bold mb-4">
              Account Information
            </h4>

            {/* Username */}
            <div className="d-flex align-items-center border-bottom py-3">

              <div
                className="bg-light rounded-3 d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                👤
              </div>

              <div>
                <small className="text-muted">
                  Username
                </small>

                <div className="fw-semibold">
                  {user.username}
                </div>
              </div>

            </div>

            {/* Email */}
            <div className="d-flex align-items-center border-bottom py-3">

              <div
                className="bg-light rounded-3 d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                📧
              </div>

              <div>
                <small className="text-muted">
                  Email Address
                </small>

                <div className="fw-semibold">
                  {user.email || "Not available"}
                </div>
              </div>

            </div>

            {/* Date Joined */}
            <div className="d-flex align-items-center py-3">

              <div
                className="bg-light rounded-3 d-flex align-items-center justify-content-center me-3"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              >
                📅
              </div>

              <div>
                <small className="text-muted">
                  Member Since
                </small>

                <div className="fw-semibold">
                  {joinedDate}
                </div>
              </div>

            </div>

          </div>

          {/* Account Actions */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">

            <h4 className="fw-bold mb-3">
              Account Actions
            </h4>

            <div className="d-flex gap-2 flex-wrap">

              <button
                className="btn btn-outline-danger px-4"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                className="btn btn-outline-dark px-4"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
