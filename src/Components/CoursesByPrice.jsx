import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'
import { Link } from "react-router-dom";
 

const CoursesByPrice = () => {
  const [courses, setCourses] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const getPriceRange = (price) => {
    if (price < 100) return "Under $100";
    if (price >= 100 && price <= 500) return "$100 - $500";
    if (price >=500 && price <= 1100) return "$500 - $1100";
     
  };

  useEffect(() => {
    axios
      .get("http://localhost:5400/courses")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const allCourses = response.data;
          setCourses(allCourses); 
          const ranges = [
            ...new Set(allCourses.map((course) => getPriceRange(course.price))),
          ];
          setPriceRanges(ranges);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses.");
      });
  }, []);

  const handlePriceRangeChange = (event) => {
    const range = event.target.value;
    setSelectedRange(range);
    setLoading(true);
    setError(null);

    const filtered = courses.filter((course) => getPriceRange(course.price) == range);
    setFilteredCourses(filtered);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">🎓Courses🎓</h1>

      <div className="dropdown-container">
        <label>Select a Price Range: </label>
        <select onChange={handlePriceRangeChange} value={selectedRange}>
          <option value="">-- Select --</option>
          {priceRanges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="loading">Loading courses...</p>}
      {error && <p className="error">{error}</p>}

      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <h2>{course.name}</h2>
              <p>💵 ${course.price}</p>
              <Link to={`/courses/${courses.id}`} className="c-link">
              </Link>
            </div>
          ))
        ) : (
          <p className="no-data">No courses found for this price range.</p>
        )}
      </div>
    </div>

  );
};

export default CoursesByPrice;
