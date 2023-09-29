import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="text-center h-screen flex flex-col justify-center items-center -mt-24">
        <img src="https://illustrations.popsy.co/gray/crashed-error.svg" alt="404" height={'450'} width={'450'} className=""/>
        <h1 className="p-2 text-9xl">404</h1>
        <h2 className="p-2 text-3xl">Opps!Page Not Found</h2>
      </div>
    </>
  );
};

export default NotFound;
