import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import copy from "../../assets/copy.svg";
import tick from "../../assets/tick.svg";

const CreateBattleModal = ({ showModal, toggleModal }) => {
  const [numQuestions, setNumQuestions] = useState(5); // Default number of questions
  const [questionLang, setQuestionLang] = useState(); // Default number of questions
  const [loading, setLoading] = useState(false);
  const [battleCode, setBattleCode] = useState("");
  const [copied, setCopied] = useState("");

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(e.target.value);
  };

  const handleQuestionLangChange = (e) => {
    setQuestionLang(e.target.value);
  }

  const createBattle = async () => {
    setLoading(true); // Set loading to true to show loader

    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/battle/create",
        "https://pear-lucky-panda.cyclic.cloud/api/battle/create",
        { 
          numOfQuestions: numQuestions,
          language: questionLang,
        }
      );
      if (response.status === 201) {
        // Check for correct status code
        setBattleCode(response.data); // Set battle code
        setLoading(false); // Set loading to false after successful creation
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went Wrong");
      }
      setLoading(false); // Set loading to false if error occurs
    }
  };

  const handleCopy = (code) => {
    setCopied(code);
    navigator.clipboard.writeText(code);
    toast.success("Battle code copied");
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    if (battleCode && !showModal) {
      window.location.href = `/battle/${battleCode}`;
    }
  }, [battleCode, showModal]);

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
            {battleCode ? (
              <div className="">
                <p className="font-mono-bold">Battle Code:</p>
                <div className="flex flex-row w-full bg-gray-200 p-2 rounded-md justify-between">
                  <p className="font-mono-bold2">{battleCode}</p>
                  <div
                    className="copy_btn"
                    onClick={() => handleCopy(battleCode)}
                  >
                    <img
                      src={copied === battleCode ? tick : copy}
                      alt="copy"
                      className="w-[100%] h-[100%] object-contain"
                    />
                  </div>
                </div>
                <span className="font-mono-regular text-xs flex justify-center items-center">
                  Share this code to your friend in order for them to join
                </span>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="numQuestions"
                    className="block mb-2 font-mono-bold"
                  >
                    Number of Questions:
                  </label>
                  <select
                    id="numQuestions"
                    value={numQuestions}
                    onChange={handleNumQuestionsChange}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 outline-none font-mono"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="numQuestions"
                    className="block mb-2 font-mono-bold"
                  >
                    Language of Questions
                  </label>
                  <select
                    id="questionLang"
                    value={questionLang}
                    onChange={handleQuestionLangChange}
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 outline-none font-mono"
                  >
                    <option value={"English"}>English</option>
                    <option value={"German"}>German</option>
                    <option value={"French"}>French</option>
                    {/* <option value={20}>20</option> */}
                  </select>
                </div>
                {loading ? (
                  <button
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-400 flex justify-center items-center"
                    disabled
                  >
                    <Loader2 />
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-orange-600 text-white text-xl font-mono px-4 py-2 rounded-md hover:bg-orange-400"
                      onClick={createBattle}
                    >
                      Create
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBattleModal;
