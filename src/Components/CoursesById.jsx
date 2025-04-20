import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ById.css';

const CoursesById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 5,
    comment: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5400/courses/${id}`).then((res) => {
      setCourse(res.data);
      setLoading(false);
    })
    .catch(()=> {
  setError("Failed...................!")
  setLoading(false)
    })
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const updatedReviews = [...(course.reviews || []), newReview];
    setCourse({ ...course, reviews: updatedReviews });

     
    axios.post(`http://localhost:5400/courses/${id}/review`, newReview);

     
    setNewReview({ username: "", rating: 5, comment: "" });
  };

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  const averageRating = course.reviews?.length
    ? (course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length).toFixed(1)
    : "No Ratings Yet";

  return (
    <div className="courses-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">⬅ Go Back</button>
      <h1>{course.title}</h1>
      <img src={course.image || "/default.jpg"} alt={course.title} />
      <p><strong>Price:</strong> ${course.price}</p>
      <p><strong>Average Rating:</strong> ⭐ {averageRating} / 5</p>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {course.reviews?.length ? (
          course.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p><strong>{review.username}</strong> ⭐ {review.rating}/5</p>
              <p>"{review.comment}"</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div className="add-review-section">
        <h2>Add a Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.username}
            onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
            required
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
          <textarea
            placeholder="Write a review..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default CoursesById;
