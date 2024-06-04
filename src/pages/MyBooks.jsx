import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Button from "../components/Button/button";
import axios from "axios";
import { useParams } from "react-router-dom";


const MyBooks = () => {
  const { bookId } = useParams();
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [download, setDownload] = useState(false);
  const [book, setBook] = useState(null);

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
    const fetchSavedBooks = async () => {
      if (user && emailVerified) {
        try {
          const userDocRef = collection(db, "users", user.uid, "savedBooks");
          const savedBooksSnapshot = await getDocs(userDocRef);
          const savedBooksList = savedBooksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setSavedBooks(savedBooksList);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, [user, emailVerified, deleteBookId]);


  const handleDelete = async (bookId) => {
    try {
      console.log(user.uid);
      await deleteDoc(doc(db, "users", user.uid, "savedBooks", String(bookId)));
      setDeleteBookId(bookId);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  if (loading) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-black">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-black">
        Error: {error.message}
      </p>
    );
  }

  if (!user || !emailVerified) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-black">
        Please log in and verify your email to see your saved books.
      </p>
    );
  }

  const handleConfirmDelete = (bookId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");
    if (isConfirmed) {
      handleDelete(bookId);
    }
  };

  const downloadBook = async (bookId) => {
    console.log("Downloading book", bookId);
    console.log(`${bookId}`);
    try {
      const response = await axios.get(`http://localhost:3001/proxy/${bookId}`, {
        responseType: 'blob' 
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'book.zip');
      document.body.appendChild(link);
      link.click(); 
      setDownload(true);
      console.log("Download complete!");
    } catch (error) {
      console.error("Error downloading book:", error);
      alert('Error downloading book. Please try again later.');
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-20 ">
        {savedBooks.length === 0 ? (
          <p className="text-white text-2xl">No saved books found.</p>
        ) : (
          savedBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col border-2 border-inherit p-4 rounded-lg shadow-lg "
            >
              <div className="flex flex-row">
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="w-1/2 h-50 object-fill rounded-lg"
                />
                <div className="flex flex-col justify-center ml-2 w-1/2">
                  <h2 className="text-lg font-semibold line-clamp-3">
                    {book.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2">
                    {book.authors.map((author) => author.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex-grow"></div>
              <div className="flex flex-row items-center justify-center  mt-4">
                <Button stats="py-1 px-2 mx-2 bg-green-700 text-white hover:bg-green-600" to={`/book/read/${user.uid}/${book.id}`}>Read</Button>
                <Button stats="py-1 px-2 mx-2 border border-black" onClick={() => downloadBook(book.id)} >Download</Button>
                <Button stats="py-1 px-2 mx-2 bg-red-500 text-white hover:bg-red-400" onClick={() => handleConfirmDelete(book.id)}>Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBooks;
