// components/LoginForm.tsx
"use client";
import { useState } from "react";
import { loginUser } from "@/services/api";
import { validateEmail, validatePassword } from "@/utils/formValidation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password)) {
      setError("Invalid email or password");
      return;
    }
    try {
      await loginUser(email, password);
      // Redirect to dashboard or homepage after login
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-6 bg-gray-800 rounded-lg"
    >
      <h2 className="text-xl font-bold text-white">Login</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded bg-gray-700 text-white"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="py-3 px-6 rounded bg-gradient-to-r from-primary to-secondary text-white"
      >
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
