import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <img
                  src={
                    theme === "business"
                      ? "./TextLogo(inv).png"
                      : "./TextLogo.png"
                  }
                  alt="Text Logo"
                  className="h-20"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm gap-2"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <img
                src={theme === "business" ? "./Sun.svg" : "./Moon.svg"}
                alt={theme === "business" ? "Light Mode" : "Dark Mode"}
                className="w-5 h-5"
              />
              <span className="hidden sm:inline">
                {theme === "business" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
