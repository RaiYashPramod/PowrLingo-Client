import React from 'react';

const Card = ({ title, description}) => {
  return (
    <div className={`max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border-slate-500 border-2`}>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 font-mono-bold">{title}</h2>
        <p className="text-gray-600 mt-2 font-mono-regular">{description}</p>
      </div>
    </div>
  );
};

export default Card;
