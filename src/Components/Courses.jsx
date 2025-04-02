import React,{useEffect,useState} from "react";
import axios from "axios";
 

const Courses = () => {

const [courses,setCourses] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(null);

useEffect(() => {
    axios.get("http://localhost:5400/courses")
    .then((response)=>{ 
        console.log("API Response",response.data);
        if (Array.isArray(response.data)){
            setCourses(response.data);
        }else{
            setLoading(false);
        }
    })
    .catch((error)=>{
        console.error("Error fetching data",error);
        setError(error.message);
        setLoading(false);
    });
},[]);
 
return(
    <div>
        <h1>Courses</h1>
        <ul>
            {Array.isArray(courses)  && courses.length > 0 ? (
                courses.map((course) => (
                    <li key={course.id}>{course.title} - {course.price}
                    <strong>
                        <a href={`/courses/${courses.id}`}>{courses.courses}</a>
              </strong>  

              <p>
                <a href={`/getAllCoursesById/${courses.id}`}>
                  See more courses in {courses.id}
                </a>
              </p>
              </li> 
                ))
            ) : (
                <p>No courses found</p>
                )}
            
        </ul>
    </div>
)
}
export default Courses;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5400/courses")
//       .then((response) => {
//         console.log("API Response", response.data);
//         if (Array.isArray(response.data)) {
//           setCourses(response.data);
//         }
//         setLoading(false); // make sure to set loading false here too
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Courses</h1>
//       <ul>
//         {courses.length > 0 ? (
//           courses.map((course) => (
//             <li key={course.id}>
//               {course.title} - {course.price}
//               <strong>
//                 <a href={`/courses/${course.id}`}>{course.title}</a>
//               </strong>

//               <p>
//                 <a href={`/getAllCoursesById/${course.id}`}>
//                   See more courses in {course.id}
//                 </a>
//               </p>
//             </li>
//           ))
//         ) : (
//           <p>No courses found</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Courses;
