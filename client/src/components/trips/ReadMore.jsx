import { useLocation } from "react-router-dom";
import { Star, X } from "lucide-react"; 
import { useState } from "react";
import Navbar from "../Navbar";

const ReadMore = () => {
  const location = useLocation();
  const place = location.state?.place;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]); // Store submitted reviews

  // Function to generate stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-6 h-6 ${
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && review) {
      const newReview = { name, review };
      setReviews([...reviews, newReview]); // Add new review
      setName("");
      setReview("");
      setIsModalOpen(false); // Close modal after submission
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      <Navbar />

      {/* Main content container */}
      <div className="flex flex-col md:flex-row mt-20 p-6 bg-white shadow-lg rounded-lg w-11/12 max-w-5xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full object-cover rounded-lg shadow-md"
            src={place?.image}
            alt={place?.name}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 gap-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {place?.name} <span className="italic">({place?.location})</span>
          </h1>

          {/* Star Rating Section */}
          <div className="flex items-center gap-1 mb-3">
            {renderStars(place?.rating || 0)} 
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">{place?.description}</p>
          <button 
            className="bg-[#f2b50d] px-4 py-2 rounded-[10px] font-[500] cursor-pointer hover:bg-[#e0a60c] transition"
            onClick={() => setIsModalOpen(true)}
          >
            Add Your Review
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-white p-6 shadow-md rounded-lg w-11/12 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, index) => (
              <div key={index} className="border-b pb-3">
                <h3 className="font-semibold text-gray-800">{rev.name}</h3>
                <p className="text-gray-600">{rev.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
            {/* Close Button */}
            <button 
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                required
              />
              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-[#f2b50d]"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-[#f2b50d] px-4 py-2 rounded-[10px] font-[500] cursor-pointer hover:bg-[#e0a60c] transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
