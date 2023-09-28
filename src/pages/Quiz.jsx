import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import QuestionCard from "../components/QuestionCard";

const Quiz = () => {
  // State variables
  const [questions, setQuestions] = useState([]); // To store the fetched questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // To track the index of the current question
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // To track which questions have been answered
  const [noMoreQuestions, setnoMoreQuestions] = useState(false); // To indicate if there are no more questions
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Fetch questions when the component mounts
    handleQuestionFetch();
  }, []);

  // Function to fetch questions from the server
  const handleQuestionFetch = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(
        `https://pear-lucky-panda.cyclic.cloud/api/questions/get-questions`
      );

      if (response.status === 200) {
        // If questions are fetched successfully
        toast.success("Questions fetched successfully!");
        setQuestions(response.data.questions);
        setAnsweredQuestions([]); // Reset the answered questions
        setIsLoading(false); // Set isLoading to false when questions are fetched
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
      setIsLoading(false); // Set isLoading to false when an error occurs
    }
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < questions.length) {
      // If there are more questions
      setCurrentQuestionIndex(nextQuestionIndex);
      setAnsweredQuestions([]);
    } else {
      // If all questions are answered
      toast.success(
        "You've answered all Existing questions!. We will add More Questions Soon!"
      );
      setnoMoreQuestions(true); // Indicate that there are no more questions
    }
  };

  // Function to handle answering a question
  const handleAnswer = () => {
    setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  };

  return (
    <>
      <div className="flex flex-col p-4">
        {/* Informational messages */}
        <p className="font-mono bg-yellow-200 p-4">
          Information:{" "}
          <span>
            Border indicates the difficulty of the question.{" "}
            <span className="text-red-600">Red</span> = Hard(5 Pts.),{" "}
            <span className="text-orange-600">Orange</span> = Medium(3 Pts.),{" "}
            <span className="text-green-600">Green</span> = Easy(1 Pts).
          </span>
        </p>
        <br />
        <p className="font-mono bg-green-200 p-4">
          Bonus: Learnt some new words? Make a question out of it for others to
          try! Move to{" "}
          <a href="/add-question" className="underline">
            Add Questions
          </a>{" "}
          now to do so.
        </p>
      </div>
      <div className="p-8">
        {isLoading ? ( // Check if isLoading is true
          <div className="text-center font-mono text-2xl font-semibold">
            <p>Loading...</p>
          </div>
        ) : questions.length === 0 ? ( // Check if there are no questions
          <div className="text-center">
            <h3 className="text-xl">
              <span className="font-mono text">
                {" "}
                Yay!! You've completed all the questions. More Coming soon!!!
              </span>
            </h3>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            {currentQuestionIndex < questions.length && (
              // Render the question card for the current question
              <QuestionCard
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                isAnswered={answeredQuestions.includes(currentQuestionIndex)}
              />
            )}
            {noMoreQuestions ? (
              // If there are no more questions
              <div className="text-center bg-gray-200 p-4 rounded-md">
                <p className="text-xl">More questions coming soon!</p>
              </div>
            ) : (
              // Render the "Next Question" button
              <button
                className="p-4 bg-black text-white rounded-lg"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
