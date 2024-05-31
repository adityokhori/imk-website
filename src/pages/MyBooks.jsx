import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import FloatingButton from "../components/floatingButton";

const MyBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

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
          const savedBooksList = savedBooksSnapshot.docs.map((doc) =>
            doc.data()
          );
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
  }, [user, emailVerified]);

  if (loading) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Error: {error.message}
      </p>
    );
  }

  if (!user || !emailVerified) {
    return (
      <p className="flex min-h-screen justify-center items-center text-2xl text-white">
        Please log in and verify your email to see your saved books.
      </p>
    );
  }

  return (
    <div className="bg-indigo-600 container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
        {savedBooks.length === 0 ? (
          <p className="text-white text-2xl">No saved books found.</p>
        ) : (
          savedBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={book.formats["image/jpeg"]}
                alt={book.title}
                className="w-1/2 h-40 object-fill mb-4 rounded-lg"
              />
              <h2 className="text-lg font-semibold line-clamp-2">
                {book.title}
              </h2>
              <p className="text-gray-600 line-clamp-1 right-">
                {book.authors.map((author) => author.name).join(", ")}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="fixed flex flex-row justify-center items-center bottom-4 right-4 bg-yellow-200">
        <FloatingButton>Pilih Semua</FloatingButton>
        <FloatingButton>Hapus</FloatingButton>
      </div>
    </div>
  );
};

export default MyBooks;
