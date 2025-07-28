 //import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CourseDetails = () => {
//   const { id } = useParams(); // Get course ID from URL
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5400/courses/${id}`)
//       .then((res) => {
//         setCourse(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch course details.");
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p>Loading course details...</p>;
//   if (error) return <p>{error}</p>;
//   if (!course) return <p>No course found.</p>;

//   return (
//     <div className="course-details">
//       <h1>{course.name}</h1>
//       <p><strong>Price:</strong> ${course.price}</p>
//       <p><strong>Description:</strong> {course.description || "No description available."}</p>
//       {course.image && <img src={course.image} alt={course.name} />}
//     </div>
//   );
// };

// export default CourseDetails;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5400/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch course details.");
        setLoading(false);
      });
  }, [id]);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_xxxxxxxx", // Replace with your Razorpay key
      amount: course.price * 100, // price in paise
      currency: "INR",
      name: "Course Purchase",
      description: `Buying course: ${course.name}`,
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div className="course-details">
      <h1>{course.name}</h1>
      <p><strong>Price:</strong> ${course.price}</p>
      <p><strong>Description:</strong> {course.description || "No description available."}</p>
      {course.image && <img src={course.image} alt={course.name} />}
      <button onClick={handleBuyNow} className="buy-btn">Buy Now</button>
    </div>
  );
};

export default CourseDetails;
 