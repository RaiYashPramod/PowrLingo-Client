import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src="https://illustrations.popsy.co/gray/surreal-hourglass.svg" alt="LOADING..." height={350} width={350} />
        <p className="font-mono text-2xl text-center font-semibold">Hold On! This just takes a second!</p>
      </div>
    </>
  );
};

export default Loading;
