
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

  
    const POLLING_INTERVAL = 3000;

    //Function to fetch reviews
    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/getreview');
            const data = await response.json();
            
            setReviews(data.reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

   
    useEffect(() => {
        
        fetchReviews();
        const interval = setInterval(fetchReviews, POLLING_INTERVAL);

    
        return () => clearInterval(interval);
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = { name, rating, review };

        try {
            await fetch('http://localhost:7000/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview),
            });

          
            setName('');
            setRating('');
            setReview('');

           // fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    console.log(reviews.reviews);

    return (
        <div className="App">
            <h1>Real-Time Reviews (Polling)</h1>

           
            

           
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                    min="1"
                    max="5"
                />
                <textarea
                    placeholder="Write your review here"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <strong>{review.name}</strong> ({review.rating}/5): {review.review}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
