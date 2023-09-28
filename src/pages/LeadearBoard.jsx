import { RankingCard } from "../components/RankingCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LeadearBoard = () => {
  // State variable to store leaderboard data
  const [data, setData] = useState([]);

  // Function to fetch leaderboard data from the server
  const fetchLeaderBoard = async () => {
    try {
      const response = await fetch(
        "https://pear-lucky-panda.cyclic.cloud/api/users/leaderboard"
      );
      const data = await response.json();
      setData(data); // Update the state with the fetched leaderboard data
    } catch (error) {
      toast.error("Something went wrong!"); // Handle errors with a toast notification
    }
  };

  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    fetchLeaderBoard();
  }, []);

  console.log(data.leaderboard); // Log the fetched leaderboard data for debugging

  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 font-mono min-h-screen">
        <h3 className="p-6 text-4xl font-extrabold">LeaderBoard</h3>
        {data.leaderboard ? (
          // Map through the leaderboard data and render RankingCard components
          data.leaderboard.map((userData, index) => (
            <div className="py-4 mx-auto" key={userData.UUI}>
              <RankingCard
                rank={index + 1} // Calculate and display the rank
                name={userData.Name}
                points={userData.PointsScored}
                questionsSolved={userData.totalQuestions.length}
              />
            </div>
          ))
        ) : (
          <p>Loading...</p> // Display a loading message while fetching data
        )}
      </div>
    </>
  );
};

export default LeadearBoard;
