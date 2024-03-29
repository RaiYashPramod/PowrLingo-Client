import React, { useState } from "react";

const CreateBattleModal = ({ showModal, toggleModal }) => {
  const [numQuestions, setNumQuestions] = useState(5); // Default number of questions

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };

  const createBattle = () => {
    
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="absolute bg-white p-8 rounded-lg shadow-lg z-10 w-[40rem] flex flex-col">
            <span className="absolute -top-2 -right-2 mr-4 mt-2 text-gray-500 cursor-pointer text-2xl font-bold" onClick={toggleModal}>&times;</span>
            <div className="mb-4">
              <label htmlFor="numQuestions" className="block mb-2 font-bold">Number of Questions:</label>
              <select id="numQuestions" value={numQuestions} onChange={handleNumQuestionsChange} className="block w-full border border-gray-300 rounded-md px-4 py-2 outline-none">
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-400" onClick={createBattle}>Create</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBattleModal;
