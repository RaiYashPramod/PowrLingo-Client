import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddQuestion = () => {
  // State variable to store question data
  const [question, setQuestion] = useState({
    language: "",
    type: "",
    difficulty: "",
    questionText: "",
    correctAnswer: "",
    incorrectAnswers: ["", "", ""],
  });

  // Arrays for language and difficulty options
  const languages = ["English", "French", "German"];
  const difficulties = ["Easy", "Medium", "Hard"];

  // Function to handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  // Function to handle changes in incorrect answer options
  const handleIncorrectAnswerChange = (index, value) => {
    const newIncorrectAnswers = [...question.incorrectAnswers];
    newIncorrectAnswers[index] = value;
    setQuestion({ ...question, incorrectAnswers: newIncorrectAnswers });
  };

  // Function to add a new question
  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(
        "https://pear-lucky-panda.cyclic.cloud/api/questions/add-question",
        question
      );
      if (response) {
        toast.success(response.data.message);
        // Reset the form fields after successfully adding a question
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
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the question.");
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
        {/* Add more form fields for type, difficulty, question text, etc. */}
        {/* ... */}
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
