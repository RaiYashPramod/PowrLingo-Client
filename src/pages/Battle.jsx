import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2Icon, LucideLoader } from "lucide-react";

const Battle = () => {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [loading, setLoading] = useState(true); // Introduce loading state
  const { battleId } = useParams();

  const getBattleInfo = async () => {
    try {
      if (!battleId) return; // Check if battleId exists

      const response = await axios.get(
        `https://pear-lucky-panda.cyclic.cloud/api/battle/getbattle/${battleId}`
      );
      console.log(response);
      if (response.status === 200) {
        setPlayer1(response.data.participants[0]);
        setPlayer2(response.data.participants[1]);
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("You are not a participant of this battle");
      } else {
        toast.error("No Battle With this ID");
      }
      setLoading(false); // Set loading to false if error occurs
    }
  };

  useEffect(() => {
    getBattleInfo();
  }, [battleId]); 

  if (loading) {
    return <p className="flex justify-center items-center"><LucideLoader /> </p>; // Render loading indicator
  }

  return (
    <>
      <p>{player1}</p>
      <p>{player2}</p>
    </>
  );
};

export default Battle;
