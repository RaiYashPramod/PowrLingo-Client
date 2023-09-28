import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Get the user's token from local storage
const token = JSON.parse(localStorage.getItem("token"));

const UserProfile = () => {
  // State variables to manage user data and form input
  const [user, setUser] = useState({}); // To store user data
  const [formData, setFormData] = useState({
    name: "",
    languageToLearn: "",
    languageFamiliarity: "",
  }); // To manage form data for updating user profile

  useEffect(() => {
    // Function to fetch user data and populate the form on component mount
    getUser(token);
  }, []); // Run this effect when the token changes (e.g., user logs in or out)

  const getUser = async (token) => {
    // Fetch user data from the server using the token
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get("https://pear-lucky-panda.cyclic.cloud/api/users/getuser");
    setUser(response.data.user); // Set user data in state
    setFormData({
      name: response.data.user.Name,
      languageToLearn: response.data.user.languageToLearn,
      languageFamiliarity: response.data.user.languageFamiliarity,
    }); // Populate the form with user data
  };

  const handleChange = (e) => {
    // Handle form input changes and update the formData state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      axios.defaults.headers.common["Authorization"] = token; // Set the Authorization header with the token

      // Send a PATCH request to update the user's profile on the server
      const response = await axios.patch(
        "https://pear-lucky-panda.cyclic.cloud/api/users/updateprofile",
        formData
      );

      if (response.data.ok) {
        // If the update is successful, update the user's data in the state and show a success toast
        getUser(token);
        toast.success("Profile updated successfully!");
      } else {
        // If the update fails, show an error toast
        toast.error("Profile update failed.");
      }
    } catch (error) {
      console.error(error);
      // Handle errors and show an error toast
      toast.error("An error occurred while updating your profile.");
    }
  };

  const ResetProgress = async () =>{
    axios.defaults.headers.common["Authorization"] = token; // Set the Authorization header with the token
    const response = await axios.patch("https://pear-lucky-panda.cyclic.cloud/api/users/resetprogress");
    if(response.data.ok){
      getUser(token);
      toast.success("Progress reset successfully!");
    } else {
      toast.error("Progress reset failed, please try again later.");
    }
  }

  return (
    <div className="user-profile bg-gray-100 max-h-screen lg:min-h-screen p-4 font-mono">
      {user ? (
        <>
          <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              User Profile
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="flex">
                  <label className="font-semibold mr-2" htmlFor="name">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="font-mono focus:outline-none bg-black"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-semibold">
                    Email:{" "}
                  </label>
                  {user.Email} {/* Display the user's email */}
                </div>
                <div className="flex">
                  <label
                    className="font-semibold mr-2"
                    htmlFor="languageToLearn"
                  >
                    Language to Learn:
                  </label>
                  <select
                    id="languageToLearn"
                    name="languageToLearn"
                    className="font-mono focus:outline-none bg-black"
                    value={formData.languageToLearn}
                    onChange={handleChange}
                  >
                    <option value="English">English</option>
                    <option value="German">German</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <div className="flex">
                  <label
                    className="font-semibold mr-2"
                    htmlFor="languageFamiliarity"
                  >
                    Language Familiarity:
                  </label>
                  <select
                    id="languageFamiliarity"
                    name="languageFamiliarity"
                    className="font-mono focus:outline-none bg-black"
                    value={formData.languageFamiliarity}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-600 hover:text-white transition duration-300"
              >
                Update Profile
              </button>
            </form>
          </div>

          <div className="max-w-md mx-auto p-6 mt-4 bg-black text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Statistic
            </h2>
            <div className="flex flex-row">
              <span className="font-semibold">Total Solved:{" "}</span>
              <p className="ml-4">
                {Array.isArray(user.AttemptedQuestions)
                  ? user.totalQuestions.length
                  : 0}
              </p>
            </div>
            <div className="flex flex-row">
              <span className="font-semibold">Question Attempted:{" "}</span>
              <p className="ml-4">
                {Array.isArray(user.totalQuestions)
                  ? user.totalQuestions.filter(
                      (language) => language === formData.languageToLearn
                    ).length
                  : 0}
              </p>
            </div>

            <span className="font-semibold flex flex-row">
              Points Scored: <p className="ml-4">{user.PointsScored}</p>
            </span>

            <button className="p-2 bg-rose-600 rounded-md mt-4 text-white" onClick={ResetProgress}>Reset Progress</button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}
    </div>
  );
};

export default UserProfile;
