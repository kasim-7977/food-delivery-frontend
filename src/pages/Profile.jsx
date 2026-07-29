import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    axios.get(
      "https://food-delivery-api-cyuc.onrender.com/api/profile/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>

      <div className="card p-3">
        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Date Joined:</strong> {user.date_joined}
        </p>
      </div>
    </div>
  );
}

export default Profile;
