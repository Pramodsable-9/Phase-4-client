import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Courses from "./Components/Courses";
import CoursesById from "./Components/CoursesById";
import CoursesByPrice from "./Components/CoursesByPrice";
import CourseDetails from "./Components/CourseDetails";

 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Courses/>}/>
        {/* <Route path="/courses/:price" element={<CoursesByPrice/>}/> */}
        <Route path="/courses/:id" element={<CourseDetails />} />
         
        </Routes>
    </Router>
  );
};

export default App;
