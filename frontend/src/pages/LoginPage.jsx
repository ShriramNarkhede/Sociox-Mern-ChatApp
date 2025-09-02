import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import logo2 from "../assets/logo2.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100 relative pt-12"
    >
      {/* Removed decorative pattern to keep background consistent under navbar */}

      {/* Neomorphic Card */}
      <div className={`relative z-10 w-full max-w-md px-6 sm:px-10 py-8 sm:py-10 rounded-3xl bg-[#f3f6fb] shadow-[10px_10px_30px_#d2d7e1,-10px_-10px_30px_#ffffff] border border-white/60 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0 scale-[1]" : "opacity-0 translate-y-3 scale-[0.99]"}`}>
        {/* Header with brand icon */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={logo2} alt="App logo" className="w-16 h-16 object-contain" height={64} width={64} />
          </div>
          <h1 className="text-2xl font-extrabold text-indigo-800">Welcome Back</h1>
          <p className="text-indigo-500/70">Sign in to your account</p>
        </div>

        {/* Toggle Tabs with animated indicator */}
        <div className="mb-6 relative p-1 rounded-2xl bg-[#f3f6fb] shadow-[inset_6px_6px_12px_#d2d7e1,inset_-6px_-6px_12px_#ffffff]">
          {/* Sliding indicator (on Login page it's at the first tab) */}
          <div className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-white shadow transition-transform duration-300 ease-out translate-x-0" />
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <Link
              to="/login"
              className="py-2 rounded-xl text-center font-medium text-indigo-600"
              aria-current="page"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="py-2 rounded-xl text-center font-medium text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-2">Email / Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#f3f6fb] text-indigo-900 placeholder-indigo-300 border border-white/60 shadow-[inset_6px_6px_12px_#d2d7e1,inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#f3f6fb] text-indigo-900 placeholder-indigo-300 border border-white/60 shadow-[inset_6px_6px_12px_#d2d7e1,inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-400 hover:text-indigo-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-indigo-700/80">
              <input type="checkbox" className="accent-indigo-500 rounded-md" />
              <span className="text-sm">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-indigo-500 hover:text-indigo-700">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[6px_6px_12px_#d2d7e1,-6px_-6px_12px_#ffffff] hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline-block mr-2 align-middle" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Bottom switch */}
        <div className="text-center mt-6">
          <p className="text-indigo-600">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-700 hover:text-indigo-900 underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
