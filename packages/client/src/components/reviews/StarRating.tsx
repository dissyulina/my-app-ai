import { FaRegStar, FaStar } from 'react-icons/fa';

type StarRatingProps = {
  value: number;
};
const StarRating = ({ value }: StarRatingProps) => {
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1 text-yellow-500">
      {placeholders.map((p) =>
        p <= value ? <FaStar key={p} /> : <FaRegStar key={p} />
      )}
    </div>
  );
};

export default StarRating;
