import useAuth from "../hooks/auth";
export function Profile() {
  const { user } = useAuth();
  console.log("user: ", user);
  return (
    <div className="profile-page">
      <h1>Welcome Home !</h1>
      <footer>
        <button> logout ?</button>
      </footer>
    </div>
  );
}
