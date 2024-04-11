// CollegeCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {
  return (
    <div key={college.id} className="college-card1">
      {college.logo && <img src={`${college.logo}`} alt={college.collegename} className="college-image1" />}
      <Link to={`/Collegeportal/${college.collegefeild}`} key={college.id}>
        <h3 className="college-name1">{college.collegename}</h3>
      </Link>
      <p className="university-name">Affiliated to {college.university}</p>
      <p className="address">{college.address}</p>
    </div>
  );
};

export default CollegeCard;
