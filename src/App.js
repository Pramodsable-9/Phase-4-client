import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Courses from "./Components/Courses";
import CoursesById from "./Components/CoursesById";
import CoursesByPrice from "./Components/CoursesByPrice";

 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoursesByPrice/>}/>
        <Route path="/courses/:id" element={<CoursesById />} />
         
        </Routes>
    </Router>
  );
};

export default App;
