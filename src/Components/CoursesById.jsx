import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios"; 

const CoursesById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5400/courses/${id}`)
      .then((response) => {
        setCourse(response.data);  
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch course details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="course-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>

      <h1 className="course-title">{course.name}</h1>
      <img
        src={course.image || "/default-course.jpg"}
        alt={course.name}
        className="course-detail-image"
      />
      <p className="course-info">🎓 Instructor: {course.instructor || "N/A"}</p>
      <p className="course-info">💵 Price: ${course.price}</p>
      <p className="course-info">📝 Description: {course.description || "No description available."}</p>
    </div>
  );
};

export default CoursesById;
