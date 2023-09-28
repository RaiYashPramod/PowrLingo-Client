import { UserCircle2, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg text-white bg-black font-mono h-auto p-8">
        <div className="flex flex-row justify-between">
          <h3 className="text-white font-mono text-xl">
            <a href="/">PowrLingo</a>
          </h3>
          <div className="lg:flex lg:flex-row-reverse justify-between text-lg w-[30rem] hidden">
            <a href="/user">
              <UserCircle2 className="w-8 h-8"/>
            </a>
            <a href="/" onClick={handleLogOut}>
              Logout
            </a>
            <a href="/quiz">Quiz</a>
            <a href="/leaderboard">LeaderBoard</a>
            {/* <a href="/add-question">Add Questions</a> */}
          </div>
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
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
        <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <X className="text-white h-6 w-6 cursor-pointer" />
          </button>
          <a href="/user">
            <UserCircle2 className="w-20 h-20"/>
          </a>
          <a href="/" onClick={handleLogOut}>
            Logout
          </a>
          <a href="/quiz">Quiz</a>
          <a href="/leaderboard">Leader-Board</a>
          <a href="/add-question">Add Questions</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
