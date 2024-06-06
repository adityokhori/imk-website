import React, { useState, useEffect } from "react";
import { auth, db } from "../config/firebase-config";
import { doc, setDoc, collection } from "firebase/firestore";
import Button from "./Button/button";

const CommentReview = ({ bookId }) => {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user?.uid);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Comment cannot be empty!");
      return;
    }
    if (!user) {
      alert("You must be logged in to leave a comment!");
      return;
    }
  
    try {
      const bookReviewsRef = collection(db, "bookReviews", bookId, "Reviews");
      const userDocRef = doc(bookReviewsRef, user.uid);
  
      await setDoc(userDocRef, {
        comment: comment,
        timestamp: new Date(),
        userId: user.uid,
        userName: user.displayName || user.email,
      });
  
      setComment("");
      alert("Comment added successfully!");
      
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error.message);
      alert("Error adding comment. Please try again later.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <Button type="submit" stats="mt-2 px-4 py-2 bg-orange-900 text-white" onClick={handleSubmit}>
        Submit Comment
      </Button>
    </form>
  );
};

export default CommentReview;
