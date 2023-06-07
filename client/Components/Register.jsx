import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function RegisterForm() {
  const { pathname } = useLocation();
  return (
    <div className="register-page">
      <form className="register-form">
        {" "}
        <label>
          {" "}
          {pathname === "/register" ? (
            <h2>
              Do not have an account? Register or
              <Link to="/login"> Login</Link>
            </h2>
          ) : (
            <h2>
              <Link to="/register">Register</Link>
              Or Login
            </h2>
          )}
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
