// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import './Courses.css';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5400/Courses")
//       .then((response) => {
//         setCourses(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Courses</h1>
//       <ul>
//         {courses.map((course) => (
//           <li key={course.id}>
//             <Link to={`/courses/:price${course.id}`}>{course.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Courses;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id,setId] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5400/Courses")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="courses-container">
      <h1>Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <img
              src={course.image || "/ai"} 
              alt={course.title}
              className="course-image"
            />
            <div className="course-details">
              <h2>{course.title}</h2>
              <p className="course-price">Price: ${course.price}</p>
              <Link to={`/courses/${course.id}`} className="course-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
