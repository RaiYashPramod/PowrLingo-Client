import { Link } from "react-router-dom";
import { UserCircle2, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import logo from './../assets/logo.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg text-white bg-black font-mono h-auto p-8"
        role="navigation"
      >
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-white font-mono text-xl">
            <Link to="/" aria-label="Home" className="flex">
              <img
                src={logo}
                alt="logo"
                className="w-12 h-12"
              />
              <h1 className="px-4 text-4xl">PowrLingo</h1>
            </Link>
          </h3>
          <div className="lg:flex lg:flex-row-reverse justify-between text-xl w-[40rem] hidden">
            <Link to="/userprofile" aria-label="User Profile">
              <UserCircle2 className="w-8 h-8" />
            </Link>
            <a href="/" onClick={handleLogOut} aria-label="Logout" className="bg-gray-light text-black w-32 h-8 text-center rounded-md">
              Logout
            </a>
            <Link to="/practice" aria-label="Quiz" className="lg:hover:border-b-2 transition duration-300 ease-in-out">
              Practice
            </Link>
            <Link to="/leaderboard" aria-label="Leaderboard" className="lg:hover:border-b-2 transition duration-300 ease-in-out">
              LeaderBoard
            </Link>
            <Link to="/battleGround" aria-label="BattleGround" className="lg:hover:border-b-2 transition duration-300 ease-in-out">
              Battle
            </Link>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            <MenuIcon className="text-white h-6 w-6 cursor-pointer" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-black text-white transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center space-y-6 p-6 text-xl">
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <X className="text-white h-6 w-6 cursor-pointer" />
          </button>
          <Link to="/userprofile" onClick={closeMenu}>
            <UserCircle2 className="w-20 h-20" />
          </Link>
          <a href="/" onClick={handleLogOut}>
            Logout
          </a>
          <Link to="/practice" onClick={closeMenu}>
            Practice
          </Link>
          <Link to="/leaderboard" onClick={closeMenu}>
            Leader-Board
          </Link>
          <Link to="/battleGround" aria-label="BattleGround" onClick={closeMenu}>
            Battle
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
