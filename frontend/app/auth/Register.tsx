import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    enrollment_no: "",
    branch: "",
    department: "",
    semester: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    gender: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = role === "student" 
      ? {
          role,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          enrollment_no: formData.enrollment_no,
          branch: formData.branch,
          department: formData.department,
          semester: formData.semester,
        }
      : {
          role,
          email: formData.email,
          password: formData.password,
          firstname: formData.firstname,
          lastname: formData.lastname,
          phonenumber: formData.phonenumber,
          department: formData.department,
          gender: formData.gender,
        };

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      navigate("/login"); // Redirect after successful registration
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded-md ${role === "student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`px-4 py-2 rounded-md ${role === "teacher" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Teacher
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="hidden" name="role" value={role} />

          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 border rounded-md w-full"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              placeholder="Enter your password"
              className="p-2 border rounded-md w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Conditional Fields */}
          {role === "student" ? (
            <>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  className="p-2 border rounded-md w-full"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Enrollment No</label>
                <input
                  type="text"
                  name="enrollment_no"
                  placeholder="Enter enrollment number"
                  className="p-2 border rounded-md w-full"
                  value={formData.enrollment_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Branch</label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Enter branch"
                  className="p-2 border rounded-md w-full"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Semester</label>
                <input
                  type="number"
                  name="semester"
                  placeholder="Enter semester"
                  className="p-2 border rounded-md w-full"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Enter first name"
                  className="p-2 border rounded-md w-full"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter last name"
                  className="p-2 border rounded-md w-full"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Enter phone number"
                  className="p-2 border rounded-md w-full"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  className="p-2 border rounded-md w-full"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Register as {role === "student" ? "Student" : "Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
