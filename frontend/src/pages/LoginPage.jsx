import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400"
      style={{ minHeight: "100vh" }}
    >
      {/* Glassmorphism Card */}
      <div className="relative z-10 flex flex-col justify-center items-center p-6 sm:p-12 w-full max-w-md rounded-3xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30">
        {/* Logo & Welcome */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center shadow-lg">
            <MessageSquare className="w-7 h-7 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Welcome Back</h1>
          <p className="text-lg text-white/80">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-white/80">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-white/60 text-indigo-900 placeholder-indigo-400 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-white/80">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 bg-white/60 text-indigo-900 placeholder-indigo-400 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-indigo-400" />
                ) : (
                  <Eye className="h-5 w-5 text-indigo-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-bold py-2 rounded-xl shadow-lg hover:from-indigo-600 hover:to-pink-500 transition-all"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/80">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-bold text-pink-200 hover:text-white underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={"Sign in to continue your conversations and catch up with your messages."}
        />
      </div>
    </div>
  );
};
export default LoginPage;
