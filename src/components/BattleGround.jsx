import React from "react";
import Grid from "../assets/grid.svg";
import "../App.css";
import OtpInput from "react-otp-input";
import { useState } from "react";

const BattleGround = () => {
  const [roomCode, setRoomCode] = useState("");
  
  return (
    <>
      {/* <img src={Grid} alt="bg-grid" className='cover'/> */}
      <div className="main">
        {/* Background gradient */}
        <div className="gradient"></div>
        {/* Background image */}
        <img src={Grid} alt="bg-grid" className="cover" />
      </div>
      <div>
        <h3 className="pt-9 text-3xl lg:text-6xl text-center font-mono font-extrabold sm:font-normal">
          Welcome to <br />
          <span className="font-mono-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-700 lg:text-8xl">
            BattleGround
          </span>
        </h3>
        <div className="text-center pt-5 text-2xl lg:text-4xl font-mono font-semibold">
          Challenge your friend in a 1v1 battle.
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="w-60 h-10 rounded-md bg-orange-600 text-white font-mono font-bold">
            Join
          </button>
        </div>
        <span className="font-mono text-black flex justify-center text-xl font-bold">OR</span>
        <div className="flex items-center justify-center">
          <button className="w-60 h-10 rounded-md bg-orange-600 text-white font-mono font-bold">
            Create Room
          </button>
        </div>
        <div className="flex justify-center font-mono font-extrabold text-red-800 pt-6 text-3xl lg:text-6xl">
        Feature Still Under Development!!!
        </div>
      </div>
      
    </>
  );
};

export default BattleGround;

