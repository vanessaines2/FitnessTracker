import useAuth from "../hooks/auth";
import { logOut } from "../API/registerUser";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, loggedIn } = useAuth();
  console.log("user: ", user);
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <h1>Welcome Home !</h1>
      <footer>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await logOut();
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
