export function RegisterForm() {
  return (
    <div className="register-page">
      <form className="register-form">
        {" "}
        <label>
          {" "}
          Do not have an account? --if its sign up path = register else /login--
        </label>
        <label className="label" htmlFor="username">
          {" "}
          username:{" "}
        </label>
        <input
          required
          minLength={5}
          type="text"
          id="username"
          name="username"
          className="input"
          placeholder="Enter your username"
        />
        <label className="label" htmlFor="password">
          password:
        </label>
        <input
          required
          minLength={8}
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="Enter your password"
        />
      </form>
    </div>
  );
}
