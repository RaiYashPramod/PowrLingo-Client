import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
    language: "",
    type: "",
    difficulty: "",
    questionText: "",
    correctAnswer: "",
    incorrectAnswers: ["", "", ""],
  });

  const languages = ["English", "French", "German"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleIncorrectAnswerChange = (index, value) => {
    const newIncorrectAnswers = [...question.incorrectAnswers];
    newIncorrectAnswers[index] = value;
    setQuestion({ ...question, incorrectAnswers: newIncorrectAnswers });
  };

  const handleAddQuestion = async () => {
    const response = await axios.post(
      "https://pear-lucky-panda.cyclic.cloud/api/questions/add-question",
      question
    );
    if (response) {
      toast.success(response.data.message);
      setQuestion({
        language: "",
        type: "",
        difficulty: "",
        questionText: "",
        correctAnswer: "",
        incorrectAnswers: ["", "", ""],
      });
    } else {
      toast.error("Something Went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 space-y-4 font-mono">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add a New Question
        </h1>
        <div>
          <label className="block text-gray-700 font-semibold">Language:</label>
          <select
            name="language"
            value={question.language}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Type:</label>
          <select
            name="type"
            value={question.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select Type of Question</option>
            <option value="Multiple">Multiple</option>
            {/* Add more language options */}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">
            Difficulty:
          </label>
          <select
            name="difficulty"
            value={question.difficulty}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Select Difficulty</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">
            Question Text: <br />
            <span className="text-sm font-thin">
              (Optional: Add Underscore(_) in the question, indicating blank space for
              answer)
            </span>
          </label>
          <textarea
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">
            Correct Answer:
          </label>
          <input
            type="text"
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none "
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">
            Incorrect Answers:
          </label>
          {question.incorrectAnswers.map((answer, index) => (
            <div className="p-2" key={index}>
              <input
                key={index}
                type="text"
                value={answer}
                onChange={(e) =>
                  handleIncorrectAnswerChange(index, e.target.value)
                }
                className="w-full border border-gray-300 rounded p-2 focus:outline-none"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAddQuestion}
          className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-300 hover:text-black transition duration-300"
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;