import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OnGoingBattle = () => {
  const [battle, setBattle] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [position, setPosition] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const onGoingBattles = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.get(
        // "http://localhost:3000/api/battle/ongoingbattle"
        "https://pear-lucky-panda.cyclic.cloud/api/battle/ongoingbattle"
      );

      if (response.status === 200) {
        setBattle(response.data);
        // Fetch user details for each participant in the battle
        response.data.participants.forEach((userId) => getUserDetails(userId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        // `http://localhost:3000/api/users/getuserdetails/${id}`
        `https://pear-lucky-panda.cyclic.cloud/api/users/getuserdetails/${id}`
      );
      setUserDetails((prevState) => ({
        ...prevState,
        [id]: response.data.user, // Store user details in state with user ID as key
      }));
      // console.log(userDetails);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const toBattle = () => {
    window.location.href = `/battle/${battle?.battleId}`;
  };

  useEffect(() => {
    onGoingBattles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => prevPosition + 1);
    }, 500); // Adjust the speed of the carousel here

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-center m-4">
        {!battle ? (
          // <div className="font-mono-bold2 text-lg">No ongoing battle</div>
          <div className="overflow-hidden whitespace-nowrap">
            <div
              className="inline-block font-mono-bold2 text-lg animate-marquee w-screen"
              style={{ transform: `translateX(${-position}px)` }}
            >
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span> <span>No ongoing battle</span>{" "}
              <span>No ongoing battle</span>{" "}
            </div>
          </div>
        ) : (
          <div
            className="bg-black text-white rounded-lg shadow-md p-4 absolute cursor-pointer max-w-lg flex flex-col"
            onClick={() => toBattle()}
          >
            <div>
              <div className="text-lg font-mono-bold flex items-center">
                {battle?.participants.map((userId) => (
                  <React.Fragment key={userId}>
                    {userDetails[userId] && (
                      <>
                        <h1>{isloading ? "..." : userDetails[userId].Name}</h1>
                        {battle.participants.indexOf(userId) !==
                          battle.participants.length - 1 && (
                          <span className="mx-2">VS</span>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <h3 className="text-sm font-mono-bold2 mb-2">
              Battle-ID: {battle?.battleId}
            </h3>
            <div className="flex items-center">
              <div className="text-green-500 animate-pulse h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-sm font-mono-regular">
                Status: {battle?.status}
              </p>
            </div>
            <p className="text-sm font-mono-regular">
              Number of Questions: {battle?.numOfQuestions}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default OnGoingBattle;
