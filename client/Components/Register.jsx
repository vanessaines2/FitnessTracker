export function RegisterForm() {
  return (
    <div className="register-page">
      <h1> Do not have an account? Sign up! or Login </h1>
      <form className="register-form">
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
          minLength={5}
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
