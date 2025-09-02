import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, User } from "lucide-react";
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  const { authUser  } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-base-content">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={logo2} alt="App logo" className="w-6 h-6 object-contain" height={32} width={32} />
          <h1 className="text-lg font-semibold">SocioX</h1>
        </Link>

        <div className="flex items-center gap-4">
          {authUser  && (
            <>
              <Link to="/profile" className="text-base-content/80 hover:text-primary transition-colors">
                <User  className="w-5 h-5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
