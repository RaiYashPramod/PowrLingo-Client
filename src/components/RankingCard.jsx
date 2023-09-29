import PropTypes from 'prop-types';

export const RankingCard = ({ name, points, questionsSolved, rank }) => {
  return (
    <div className="flex flex-col max-w-md mx-auto p-6 bg-black text-white w-80 rounded-lg shadow-2xl shadow-black">
      <div className="flex mb-4">
        <span className="font-bold text-xl mr-2">#{rank}.</span>
        <span className="text-xl">{name}</span>
      </div>
      <div className="">
        <p>
          <span className="font-bold">Points:</span> {points}
        </p>
        <p>
          <span className="font-bold">Questions Solved:</span> {questionsSolved}
        </p>
      </div>
      {/* You can add additional information or styling here */}
    </div>
  );
};

RankingCard.propTypes = {
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  questionsSolved: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};