import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import heroIllustration from "../../assets/hero-illustration.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [credentials, setCredentials] = useState({
    admin: { email: "", password: "" },
    teacher: { email: "", password: "" },
    student: { email: "", password: "" }
  });
  const [selectedRole, setSelectedRole] = useState("admin");
  const [errors, setErrors] = useState({ admin: "", teacher: "", student: "" });
  const [pendingRole, setPendingRole] = useState("");

  const handleChange = (role, field, value) => {
    setCredentials((prev) => ({ ...prev, [role]: { ...prev[role], [field]: value } }));
  };

  const handleSubmit = async (role) => {
    setErrors((prev) => ({ ...prev, [role]: "" }));
    const { email, password } = credentials[role];
    if (!email || !password) {
      setErrors((prev) => ({ ...prev, [role]: "Email and password are required." }));
      return;
    }
    setPendingRole(role);
    try {
      await login({ email, password, role });
      navigate(`/${role}`);
    } catch (err) {
      setErrors((prev) => ({ ...prev, [role]: err.message }));
    } finally {
      setPendingRole("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_50%)]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between border-b border-slate-100 bg-white/90 px-6 py-4 backdrop-blur shadow-sm">
        <div className="flex items-center gap-2 text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-lg">🎓</span>
          <div>
            <p className="text-sm font-semibold">SchoolSphere</p>
            <p className="text-xs text-slate-500">School Management</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">Home</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Features</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Contact</span>
        </div>
      </nav>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-2xl backdrop-blur-xl grid md:grid-cols-2 md:min-h-[520px]">
          {/* Left: login card */}
          <div className="bg-white/90 text-slate-900 px-10 py-12 h-full flex flex-col">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Access portal</p>
              <h2 className="text-3xl font-bold">Sign in to SchoolSphere</h2>
              <p className="text-sm text-slate-500">Use your seeded credentials or any user you created via admin.</p>
            </div>

            <div className="space-y-4 rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Login</p>
                  <p className="text-sm text-slate-500">Choose role and enter credentials</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                  {selectedRole}
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Login as</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Email</label>
                  <input
                    type="email"
                    value={credentials[selectedRole].email}
                    onChange={(e) => handleChange(selectedRole, "email", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
                    placeholder={`your.${selectedRole}@campus.edu`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Password</label>
                  <input
                    type="password"
                    value={credentials[selectedRole].password}
                    onChange={(e) => handleChange(selectedRole, "password", e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {errors[selectedRole] ? <p className="text-xs text-red-600">{errors[selectedRole]}</p> : null}
              <button
                onClick={() => handleSubmit(selectedRole)}
                disabled={isLoading || pendingRole === selectedRole}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90 disabled:opacity-50"
              >
                {pendingRole === selectedRole ? "Signing in..." : `Login as ${selectedRole}`}
              </button>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Seeded: admin@school.com / Admin@123, teacher@school.com / Teacher@123, student@school.com / Student@123 (or any you created).
            </p>
          </div>

          {/* Right: school illustration */}
          <div className="hidden md:flex bg-slate-900/60 p-8 relative h-full items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-emerald-400/20" />
            <div className="relative h-full w-full flex flex-col items-center justify-center gap-4">
              <img src={heroIllustration} alt="School illustration" className="h-full w-full object-cover drop-shadow-2xl rounded-2xl" />
              <div className="text-sm text-white/80 text-center">
                <p className="font-semibold">SchoolSphere</p>
                <p>Secure, role-based portals for your FYP demo.</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 hidden">
              <p className="font-semibold">SchoolSphere</p>
              <p>Secure, role-based portals for your FYP demo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
