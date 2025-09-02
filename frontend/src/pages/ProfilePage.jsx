import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, LogOut, Mail, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore as useAuth } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { logout } = useAuth();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Card */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-10">
        <div className="mt-6 bg-base-100/90 backdrop-blur-sm rounded-2xl shadow-xl border border-base-300 p-6 sm:p-8">
          {/* Avatar and header */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute -bottom-1 -right-1 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white shadow-md ring-1 ring-gray-200 transition-all duration-200 group-hover:scale-105 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : "hover:shadow-lg"}`}
                aria-label="Upload avatar"
              >
                <Camera className="w-5 h-5 text-gray-700" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="mt-4 text-center">
              <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
              <p className="mt-1 text-base-content/70 text-sm" aria-live="polite">
                {isUpdatingProfile ? "Uploading your new photo..." : "Update your personal information"}
              </p>
            </div>
          </div>

          {/* Info grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-base-300 bg-base-200 p-4">
              <div className="text-xs uppercase tracking-wide text-base-content/70 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="mt-2 font-medium break-words">
                {authUser?.fullName || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-base-300 bg-base-200 p-4">
              <div className="text-xs uppercase tracking-wide text-base-content/70 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="mt-2 font-medium break-words">
                {authUser?.email || "—"}
              </p>
            </div>
          </div>

          {/* Account section */}
          <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-5">
            <h2 className="text-base font-semibold">Account</h2>
            <div className="mt-4 divide-y divide-base-300">
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-base-content/70">Member Since</span>
                <span className="font-medium">{authUser?.createdAt?.split("T")[0] || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-base-content/70">Account Status</span>
                <span className="inline-flex items-center gap-2 font-medium text-success">
                  <span className="h-2 w-2 rounded-full bg-success" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <Link to="/settings" className="btn btn-sm">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Link>
                <button onClick={logout} className="btn btn-sm btn-error text-error-content">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
