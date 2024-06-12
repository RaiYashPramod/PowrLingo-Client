import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const JoinBattleModal = ({ showModal, toggleModal }) => {
  const [battleID, setBattleID] = useState('');

  const enterBattleID = (e) => {
    e.preventDefault();

    setBattleID(e.target.value);
  };

  const joinBattle = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(
        `https://powrlingo-server.onrender.com/api/battle/join/${battleID}`
        // `http://localhost:3000/api/battle/join/${battleID}`
      );

      if (response.status === 200) {
        toast.success("Joined Successfully");
        window.location.href = `/battle/${battleID}`;
      } else {
        toast.error("Something broke down");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Battle not found");
        } else if (error.response.status === 401) {
          toast.error("Unauthorized");
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
          toast.error("Internal server error");
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="absolute bg-white p-8 rounded-lg shadow-lg z-10 lg:w-[40rem] flex flex-col">
            <span
              className="absolute -top-2 -right-2 mr-4 mt-2 text-gray-500 cursor-pointer text-2xl font-bold"
              onClick={toggleModal}
            >
              &times;
            </span>
            <input
              type="text"
              placeholder="Paste the battle Id to join."
              className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-4 outline-none"
              value={battleID}
              onChange={enterBattleID}
            />
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-400"
              onClick={joinBattle}
            >
              Join
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinBattleModal;
