import macBookMockUp from "../assets/mockup-macbook.png";
import iphoneMockUp from "../assets/mockup-iphone.png";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Home = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <>
      <hero className="place-items-center h-screen bg-slate-50">
        <div className="text-center pt-16 md:pt-28">
          <span className="text-5xl lg:text-7xl font-mono-bold">
            Welcome to Powr<span className="">Lingo</span>
          </span>
          <p className="text-xl lg:text-3xl font-mono-regular font-medium pt-8">
            One Stop Place To <span className="text-red-500">Learn</span> Any{" "}
            <span className="text-red-500">Language.</span>
          </p>

          {token ? (
            <></>
          ) : (
            <a href="/login" className="block m-8">
              <button className="p-3 w-40 bg-black text-white rounded-md font-mono font-bold hover:bg-gray-800">
                Login
              </button>
            </a>
          )}

          {/* <p className="text-lg font-extrabold font-mono ">
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
        </p> */}
        </div>
      </hero>
      <section className="text-center pt-16">
        <div className="">
          <img
            src={macBookMockUp}
            alt="PowrLingo Mockup"
            sizes="44rem"
            priority
            placeholder="blur"
          />
        </div>
        <div className="p-4">
          <span className="text-xl lg:text-4xl font-mono-bold">
            Challenge your friend in a 1v1 battle.
          </span>
          <p className="text-xs lg:text-sm font-mono-regular text-slate-500 p-2">
            A place for you to test and compete your learnings against your
            friends{" "}
          </p>
        </div>
      </section>
      <section className="flex flex-col md:flex-row md:grid md:grid-cols-2 pt-12">
        <div className="md:order-2 md:ml-auto md:mr-20">
          {/* Second section content */}
          <div className="mx-auto max-w-4xl">
            <img
              src={iphoneMockUp}
              alt="PowrLingo Mockups"
              placeholder="blur"
              sizes=""
            />
          </div>
        </div>
        <div className="md:order-1 md:mr-auto md:ml-20 lg:flex lg:justify-center lg:items-center">
          {/* First section content */}
          <div className="items-center  px-12 py-5 lg:p-0">
            <span className="text-xl lg:text-4xl font-mono-bold">
              Multi-Lingual Support
            </span>
            <p className="text-xs lg:text-sm font-mono-regular text-slate-500 p-2">
              You can practice in three language based on your preference.
              <br />
              Currently we support English, French, German.
              <br />
              <span className="text-red-500">
                Support for more language coming soon!!
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 pt-[4rem] pb-[6rem]">
        <div className="flex flex-col justify-center items-center p-4 mt-8">
          <span className="text-2xl lg:text-7xl font-mono-bold">
            Why Use PowrLingo?
          </span>

          <p className="pt-4 lg:pt-8 text-xs lg:text-base text-slate-500 font-mono-regular">Here's what sets us apart</p>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 p-8 lg:pt-16 ">
          <Card title={"Progress Tracking"} description={"Moniter your Progress with our comprehensive tracking System."}/> 
          <Card title={"LeaderBoard"} description={"Compete against others for the top place in the leaderboard."}/>
          <Card title={"BattleGround"} description={"Compete against your friends to show them who's the boss!"}/>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
