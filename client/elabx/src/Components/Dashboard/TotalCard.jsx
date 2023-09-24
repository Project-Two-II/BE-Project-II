
import React, { useEffect, useState } from 'react';
import { PiStudentFill } from 'react-icons/pi';
import { GiBlackBook } from 'react-icons/gi';

const TotalCard = ({ title, count, type }) => {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let interval;
    if (currentCount < count) {
      interval = setInterval(() => {
        setCurrentCount((prevCount) => prevCount + 1);
      }, 100); 
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentCount, count]);

  let icon = null;

  if (type === 'student') {
    icon = <PiStudentFill size={50} />;
  } else {
    icon = (
      <>
        <GiBlackBook size={50} />
        <GiBlackBook size={50} />
      </>
    );
  }

  return (
    <div className="total-card">
      <h2>{title}</h2>
      {icon}
      <p className="count-number">{currentCount}</p>
    </div>
  );
};

export default TotalCard;
