import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const QuestionCard = ({ question, onAnswer, isAnswered }) => {
  // State variables for managing selected answer, shuffled answers, correctness, and clicked option
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [clickedOption, setClickedOption] = useState("");

  // Function to shuffle an array
  const shuffleAnswers = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Function to determine border color based on difficulty
  const getBorderColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "green";
      case "medium":
        return "orange";
      case "hard":
        return "red";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    // Shuffle the answers when the component is initially rendered or when the question changes
    setShuffledAnswers(
      shuffleAnswers([question.correctAnswer, ...question.incorrectAnswers])
    );
  }, [question]);

  const handleAnswerClick = (answer) => {
    setClickedOption(answer);
    if (!isAnswered && !selectedAnswer) {
      const isCorrectAnswer = answer === question.correctAnswer;

      setIsCorrect(isCorrectAnswer);
      onAnswer(isCorrectAnswer);

      // Send question details to the server
      sendQuestionDetails(isCorrectAnswer);
    }
  };

  const sendQuestionDetails = async (isCorrectAnswer) => {
    const answerData = {
      questionId: question._id,
      questionLanguage: question.language,
      isCorrect: isCorrectAnswer,
      questionDifficulty: question.difficulty,
    };

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/questions/answer",
        "https://powrlingo-server.onrender.com/api/questions/answer",
        answerData
      );

      if (response.status === 200) {
        setSelectedAnswer(null);
      } else {
        console.error("Failed to send answer.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const difficultyBorderColor = getBorderColor(question.difficulty);

  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 mb-4 w-80`}
      style={{ border: `2px solid ${difficultyBorderColor}` }}
    >
      <div className="text-xl font-semibold">{question.questionText}</div>
      <div className="mt-4">
        {shuffledAnswers.map((answer, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 border border-gray-300 rounded-lg mb-2 ${
              isAnswered
                ? selectedAnswer === answer
                  ? isCorrect
                    ? "bg-green-200" // Correctly selected answer
                    : "bg-red-200" // Incorrectly selected answer
                  : answer === question.correctAnswer
                  ? "bg-green-200" // Correct answer
                  : clickedOption === answer
                  ? "bg-red-200" // Incorrect option clicked by user
                  : ""
                : ""
            }`}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired,
};

export default QuestionCard;
