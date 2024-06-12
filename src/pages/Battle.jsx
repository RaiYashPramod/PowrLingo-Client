import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LucideLoader } from "lucide-react";

const Battle = () => {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [battle, setBattle] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentTurn, setCurrentTurn] = useState(
    localStorage.getItem("currentTurn") || null
  ); 
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const { battleId } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const getBattleInfo = async () => {
    try {
      if (!battleId) return;

      const response = await axios.get(
        // `http://localhost:3000/api/battle/getbattle/${battleId}`
        `https://powrlingo-server.onrender.com/api/battle/getbattle/${battleId}`
      );

      if (response.status === 200) {
        setBattle(response.data);
        const player1Details = await getUserDetails(
          response.data.participants[0]
        );
        const player2Details = await getUserDetails(
          response.data.participants[1]
        );
        setPlayer1(player1Details);
        setPlayer2(player2Details);
        // if (!localStorage.getItem('currentTurn')) {
        // }
        setCurrentTurn(response.data.challenger);
        localStorage.setItem("currentTurn", response.data.challenger);
        setLoading(false);
      }
    } catch (error) {
      console.log("1", error);
      handleErrors(error);
    }
  };

  const getUserDetails = async (id) => {
    try {
      const response = await axios.get(
        // `http://localhost:3000/api/users/getuserdetails/${id}`
        `https://powrlingo-server.onrender.com/api/users/getuserdetails/${id}`
      );
      return response.data.user;
    } catch (error) {
      console.log("2", error);
      handleErrors(error);
    }
  };

  const getUser = async (token) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(
        // "http://localhost:3000/api/users/getuser"
        "https://powrlingo-server.onrender.com/api/users/getuser"
      );
      setCurrentPlayer(response.data.user);
      // Set the initial turn based on the challenger of the battle
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  const switchTurn = async () => {
    const nextTurn = currentTurn === player1._id ? player2._id : player1._id;
    try {
      console.log(answers)
      const response = axios.post(
        // `http://localhost:3000/api/battle/changeturn/${battleId}`,
        `https://powrlingo-server.onrender.com/api/battle/changeturn/${battleId}`,
        { challenger: nextTurn }
      );

      if (response.status === 200) {
        setCurrentTurn(nextTurn);
        localStorage.setItem("currentTurn", nextTurn);
      }
    } catch (error) {
      console.log("Error updating challenger:", error);
      toast.error("An error occurred while updating the challenger");
    }
  };

  

  const handleQuestionFetch = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(
        // `http://localhost:3000/api/battle/fetchQuestions/${battleId}`
        `https://powrlingo-server.onrender.com/api/battle/fetchQuestions/${battleId}`
      );

      console.log(response.data.randomQuestions);

      if (response.status === 200) {
        setQuestions(response.data.randomQuestions);
        
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle bad request (e.g., missing language)
        toast.error("Please Select a Language");
      } else if (error.response && error.response.status === 404) {
        // Handle case where no questions are found
        toast.error("No Questions Found");
      } else {
        toast.error("Something went wrong!");
        console.error(error);
      }
      // setIsLoading(false); // Set isLoading to false when an error occurs
    }
  };

  const handleAnswerSelect = (e, question) => {
    const selectedAnswer = e.target.value;
    // Update the answer state for the question
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question._id]: selectedAnswer,
    }));
  };

  useEffect(() => {
    getUser(token);
    getBattleInfo();
  }, []);

  useEffect(() => {
    handleQuestionFetch()
  }, [localStorage.getItem("currentTurn")])

  const handleErrors = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("You are not a participant of this battle");
      } else {
        toast.error("No Battle With this ID");
      }
    } else if (error.request) {
      console.error("Request Error:", error.request);
      toast.error("Request Error");
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LucideLoader />
      </div>
    );
  }

  if (!battle) {
    return <p className="text-center">No battle data available</p>;
  }

  if (!player1 || !player2) {
    return <p className="text-center">Fetching players' details...</p>;
  }

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col justify-center items-center">
      <p className="text-3xl mb-4 text-center text-yellow-800">
        Let's Begin this Battle
      </p>
      <div className="bg-white rounded-lg p-6 shadow-md font-mono-regular">
        {currentPlayer._id === currentTurn ? (
          <>
            <p className="text-2xl text-center text-green-700 p-4">
              Your Turn:{" "}
              {currentTurn === player1._id ? player1.Name : player2.Name}
            </p>
            {questions.map((question) => (
              <div key={question._id} className="mb-4">
                <p className="text-xl">{question.questionText}</p>
                <select
                  className="mt-2 p-2 border rounded"
                  onChange={(e) => handleAnswerSelect(e, question)}
                >
                  <option value="" disabled selected>
                    Select an answer
                  </option>
                  <option value={question.correctAnswer}>
                    {question.correctAnswer}
                  </option>
                  {question.incorrectAnswers.map((incorrectAnswer, index) => (
                    <option key={index} value={incorrectAnswer}>
                      {incorrectAnswer}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button onClick={() => switchTurn()} className="p-2 bg-black text-white font-mono-regular rounded-md">Submit</button>
          </>
        ) : (
          <div className="text-2xl text-center text-red-700">
            Opponent's Turn:{" "}
            {currentTurn === player1._id ? player1.Name : player2.Name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Battle;
