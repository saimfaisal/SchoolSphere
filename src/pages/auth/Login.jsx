import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import heroIllustration from "../../assets/hero-illustration.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    setPending(true);
    try {
      await login({ email: form.email, password: form.password, role: form.role });
      navigate(`/${form.role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_45%)]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-2 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-lg">🎓</span>
          <div>
            <p className="text-sm font-semibold">SchoolSphere</p>
            <p className="text-xs text-white/70">Smart campus suite</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          <span className="rounded-full bg-white/5 px-3 py-1">Home</span>
          <span className="rounded-full bg-white/5 px-3 py-1">Features</span>
          <span className="rounded-full bg-white/5 px-3 py-1">Contact</span>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 space-y-8">
        <div className="text-center text-white space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">SchoolSphere</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">SchoolSphere Management</h1>
          <p className="text-base md:text-lg text-white/75">
            Admin, Teacher, and Student dashboards with role-based access. Choose a role, enter your email and password, and jump in.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div className="flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-2xl min-h-[520px] rounded-2xl border border-white/10 bg-white/95 shadow-2xl shadow-black/15 backdrop-blur transition hover:-translate-y-1 hover:shadow-3xl">
              <div className="h-2 rounded-t-2xl bg-gradient-to-r from-primary via-indigo-500 to-emerald-500" />
              <div className="p-8 md:p-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unified Login</p>
                    <p className="text-sm text-slate-500">Pick a role, add your email/password, and continue.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
                    {form.role}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Login as</label>
                    <select
                      value={form.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
                    >
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
                      placeholder={`your.${form.role}@campus.edu`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Password</label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary focus:bg-white focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  {error ? <p className="text-xs text-red-600">{error}</p> : null}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || pending}
                    className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-50"
                  >
                    {pending ? "Signing in..." : `Login as ${form.role}`}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-2xl min-h-[520px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30 bg-white/5 backdrop-blur">
              <img
                src={heroIllustration}
                alt="SchoolSphere school management illustration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/70">
          Tip: start as Admin to explore the setup, then try Teacher and Student flows. Sign out from the top bar anytime.
        </p>
      </main>
    </div>
  );
};

export default Login;
