import React, { useState } from 'react';
import './styles.css';
const StarRatingInput = ({ name }) => {
    const [rating, setRating] = useState(0);
  
    const handleStarClick = (value) => {
      setRating(value);
    };
  
    return (
      <div className="star-rating">
        <input type="hidden" name={name} value={rating} />
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleStarClick(index + 1)}
            className={index < rating ? "star-filled" : "star-empty"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  
  export default StarRatingInput;
  
