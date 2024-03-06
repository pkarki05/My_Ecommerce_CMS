import React from 'react';

function TimeBasedGreeting({userName}) {
  const hours = new Date().getHours();
  let partOfDay;
  
  if (hours < 12) {
    partOfDay = "morning";
  } else if (hours >= 12 && hours < 17) {
    partOfDay = "afternoon";
  } else if (hours >= 17 && hours < 20) {
    partOfDay = "evening";
  } else {
    partOfDay = "night";
  }

  return (
    <div>Good {partOfDay}, {userName}</div>
  );
}

export default TimeBasedGreeting;
