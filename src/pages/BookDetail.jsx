import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import Button from "../components/Button/button";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import CommentReview from "../components/commentReview";

const BookDetail = () => {
  const { id } = useParams();
  const [download, setDownload] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [comments, setComments] = useState([]);
  const [showCommentReview, setShowCommentReview] = useState(false);

  const toggleCommentReview = () => {
    setShowCommentReview(!showCommentReview);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}/`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setEmailVerified(currentUser.emailVerified);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (book && user) {
          const bookReviewsRef = collection(db, "bookReviews", id, "Reviews");
          const commentSnapshot = await getDocs(bookReviewsRef);
          const commentsList = commentSnapshot.docs.map((doc) => doc.data());
          setComments(commentsList);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    if (user && book) {
      fetchComments();
    }
  }, [id, user, book]);

  if (loading) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Loading...
      </p>
    );
  }

  if (error) {
    console.log(error.message);
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Error: {error.message}
      </p>
    );
  }

  const saveBook = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const savedBooksCollectionRef = collection(userDocRef, "savedBooks");
        const bookDocRef = doc(savedBooksCollectionRef, String(book.id));
        await setDoc(bookDocRef, book);

        alert("Book saved successfully!");
      } else {
        console.log("User not logged in!");
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const downloadBook = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/proxy/${book.id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "book.zip");
      document.body.appendChild(link);
      link.click();
      setDownload(true);
    } catch (error) {
      console.error("Error downloading book:", error);
      alert("Error downloading book. Please try again later.");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center ">
      <div className="fixed left-40 top-40 w-1/5 h-full ">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-full h-auto"
        />
      </div>
      <div className="w-1/4"></div>
      <div className="mt-40 flex flex-col w-1/2 ">
        <div>
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-2xl text-slate-500">
            {book.authors.map((author) => author.name).join(", ")}
          </p>
          <p className="mt-4">
            Translators:{" "}
            {book.translators.map((translator) => translator.name).join(", ")}
          </p>
          <p>Language: English</p>
          <p>
            Genres: <br />
            {book.subjects}
          </p>
          <p className="font-bold">{book.bookshelves}</p>
          <br />
          <p>
            Total downloaded:{" "}
            <span className="font-semibold">{book.download_count}</span>
          </p>
          <br />
          <div className="flex flex-col">
            <Button
              stats="px-2 py-1 w-40 bg-green-700 text-white font-semibold hover:bg-green-500"
              to={`/book/read/${user?.uid}/${book.id}`}
            >
              Read Now
            </Button>
            <div className="flex flex-row mt-2">
              <Button
                onClick={downloadBook}
                stats="px-2 py-1 border border-black"
              >
                Download
              </Button>
              <Button
                onClick={saveBook}
                stats="ml-2 px-2 py-1 border border-black"
              >
                + Save
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full mt-8">
          <button
            onClick={toggleCommentReview}
            className="bg-orange-800 text-white py-2 px-4 rounded"
          >
            {showCommentReview ? "Hide Comment Review" : "Write a Review"}
          </button>
          {showCommentReview && <CommentReview bookId={id} />}
          <div className="mt-8 overflow-auto">
            <h2 className="text-2xl font-bold">Community Reviews</h2>
            {comments.length > 0 ? (
              <div>
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between shadow-md p-4 my-4"
                  >
                    <div className="flex flex-col">
                      <p className="text-black font-bold">
                        {comment.userName}:
                      </p>
                      <p className="text-gray-800 ml-2">"{comment.comment}"</p>
                    </div>
                    <div className="flex jus">
                      <p className="text-gray-800 ml-2">
                      {new Date(comment.timestamp.seconds * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p>No comments yet. Be the first to comment!</p>
                <br />
                <br />
                <br />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
