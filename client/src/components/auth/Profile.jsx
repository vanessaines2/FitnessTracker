import useAuth from "../../hooks/auth";
import { logOut } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRoutines } from "../../api/user";

export function Profile() {
  const { user, setUser, setLoggedIn } = useAuth();
  console.log("user: ", user);
  const navigate = useNavigate();
  const [myRoutines, setMyRoutines] = useState("");
  // const [createdRoutines, setMyCreatedRoutines] = useState("");

  // useEffect(() => {
  //   async function getMyRoutines() {
  //     const response = await getUserRoutines(user);
  //     console.log("response from profile: ", response);
  //     setMyRoutines(response);
  //   }
  //   getMyRoutines();
  // }, []);

  return (
    <div className="profile-page">
      <h1>Welcome Home {user.username}!</h1>

      <footer>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await logOut();
            setLoggedIn(false);
            navigate("/");
          }}
        >
          {" "}
          logout ?
        </button>
      </footer>
    </div>
  );
}
