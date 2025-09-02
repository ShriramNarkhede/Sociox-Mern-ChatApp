import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import logo2 from "../assets/logo2.png";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = validateForm();
    if (ok === true) signup(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100 relative pt-12">
      {/* Removed decorative pattern to keep background consistent under navbar */}

      {/* Neomorphic Card */}
      <div className={`relative z-10 w-full max-w-md px-6 sm:px-10 py-8 sm:py-10 rounded-3xl bg-[#f3f6fb] shadow-[10px_10px_30px_#D2D7E1,-10px_-10px_30px_#FFFFFF] border border-white/60 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0 scale-[1]" : "opacity-0 translate-y-3 scale-[0.99]"}`}>
        {/* Header with brand icon */}
        <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-16 h-16 flex items-center justify-center">
        <img src={logo2} alt="App logo" className="w-16 h-16 object-contain" height={64} width={64} />
          </div>
          <h1 className="text-2xl font-extrabold text-indigo-800">Create Account</h1>
          <p className="text-indigo-500/70">Join our community</p>
        </div>

        {/* Toggle Tabs with animated indicator */}
        <div className="mb-6 relative p-1 rounded-2xl bg-[#f3f6fb] shadow-[inset_6px_6px_12px_#d2d7e1,inset_-6px_-6px_12px_#ffffff]">
          {/* Sliding indicator (on SignUp page it's at the second tab) */}
          <div className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-white shadow transition-transform duration-300 ease-out translate-x-[calc(100%+0.5rem)]" />
          <div className="grid grid-cols-2 gap-2 relative z-10">
            <Link
              to="/login"
              className="py-2 rounded-xl text-center font-medium text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="py-2 rounded-xl text-center font-medium text-indigo-600"
              aria-current="page"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#f3f6fb] text-indigo-900 placeholder-indigo-300 border border-white/60 shadow-[inset_6px_6px_12px_#d2d7e1,inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Shriram Narkhede"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-2">Email</label>
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

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[6px_6px_12px_#d2d7e1,-6px_-6px_12px_#ffffff] hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin inline-block mr-2 align-middle" />
                Loading...
              </>
            ) : (
                "Sign Up"
            )}
          </button>
        </form>

        {/* Bottom switch */}
        <div className="text-center mt-6">
          <p className="text-indigo-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-700 hover:text-indigo-900 underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
