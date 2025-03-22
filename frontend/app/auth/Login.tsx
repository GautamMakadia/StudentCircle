import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { email, password, role };

    try {
      const response = await fetch("http://10.150.148.207:5500/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("user_role", data.role);
      
      navigate(role === "student" ? "/student/dashboard" : "/teacher/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-md ${
              role === "student" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-md ${
              role === "teacher" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Teacher
          </button>
        </div>

        
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        
        <form onSubmit={handleLogin} className="flex flex-col">
          
          <input type="hidden" name="role" value={role} />

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="p-2 border rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="p-2 border rounded-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login as {role === "student" ? "Student" : "Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
