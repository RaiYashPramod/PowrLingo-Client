import React from "react";
import Grid from "../assets/grid.svg";
import "../App.css";
import { useState } from "react";
import JoinBattleModal from "../components/BattleModal/JoinBattleModal";
import CreateBattleModal from "../components/BattleModal/CreateBattleModal";
import OnGoingBattle from "../components/OnGoingBattle";

const BattleGround = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const toggleJoinModal = () => setShowJoinModal(!showJoinModal);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const toggleCreateModal = () => setShowCreateModal(!showCreateModal);

  return (
    <>
      <div className="main">
        <div className="gradient"></div>
        <img src={Grid} alt="bg-grid" className="cover" />
      </div>
      <div>
        <h3 className="pt-9 text-3xl lg:text-6xl text-center font-mono font-extrabold sm:font-normal">
          Welcome to <br />
          <span className="font-mono-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-700 lg:text-8xl">
            Battle-Ground
          </span>
        </h3>
        <div className="text-center pt-5 text-2xl lg:text-4xl font-mono font-semibold">
          Challenge your friend in a 1v1 battle.
        </div>

        <div className="flex items-center justify-center mt-6">
          <button className="w-60 h-10 rounded-md bg-orange-600 text-white font-mono font-bold" onClick={toggleCreateModal}>
            Create Battle
          </button>
        </div>
        <span className="font-mono text-black flex justify-center text-xl font-bold">
          OR
        </span>
        <div className="flex items-center justify-center">
          <button className="w-60 h-10 rounded-md bg-orange-600 text-white font-mono font-bold" onClick={toggleJoinModal}>
            Join
          </button>
        </div>
      </div>

      <CreateBattleModal showModal={showCreateModal} toggleModal={toggleCreateModal} />
      <JoinBattleModal showModal={showJoinModal} toggleModal={toggleJoinModal} />

      <div className="p-10">
        <OnGoingBattle />
      </div>
    </>
  );
};

export default BattleGround;
