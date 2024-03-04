const Home = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="place-items-center h-screen bg-gradient-to-b from-blue-300 to-purple-300">
      <div className="text-center text-black">
        <h3 className="text-5xl lg:text-9xl font-mono pt-8 ">PowrLingo</h3>
        <p className="text-xl lg:text-5xl font-extrabold font-mono p-8 ">
          One Stop Place To Learn Any Language
        </p>
        <p className="text-lg font-extrabold font-mono ">
          This is a place where you can learn, practice your knowledge of any
          language.
        </p>
        <p className="text-md font-mono font-extrabold p-2 ">
          You can practice English, German, French.
        </p>
        <p className="text-md font-extrabold font-mono p-2 ">
          Support for more languages Coming Soon!!!
        </p>
        <p className="text-md font-extrabold font-mono ">
          Invite your friends to compete with you for the top place in the
          leaderboard!!
        </p>
        <p className="font-mono font-extrabold text-md ">
          More Features Coming Soon!!!
        </p>

        {token ? (
          <></>
        ) : (
          <a href="/login" className="block mt-8">
            <button className="p-3 w-40 bg-black text-white rounded-md font-mono font-bold hover:bg-gray-800">
              Login
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Home;
