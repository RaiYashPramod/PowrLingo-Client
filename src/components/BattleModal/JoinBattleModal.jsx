import React from "react";

const JoinBattleModal = ({ showModal, toggleModal }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="absolute bg-white p-8 rounded-lg shadow-lg z-10 w-[40rem] flex flex-col">
            <span className="absolute -top-2 -right-2 mr-4 mt-2 text-gray-500 cursor-pointer text-2xl font-bold" onClick={toggleModal}>&times;</span>
            <input type="text" placeholder="Paste link to join the battle" className="block w-full border border-gray-300 rounded-md px-4 py-2 mb-4 outline-none" />
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-400">Join</button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinBattleModal;
