import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser  } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-300 fixed w-full top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="rounded-lg bg-primary/10 flex items-center justify-center p-2">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-semibold">SocioX</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/settings" className="text-gray-700 hover:text-primary transition-colors">
            <Settings className="w-5 h-5" />
          </Link>

          {authUser  && (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors">
                <User  className="w-5 h-5" />
              </Link>

              <button
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
