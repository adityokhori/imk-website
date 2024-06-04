import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import Button from "../components/Button/button";
import { collection, doc, setDoc } from "firebase/firestore";

const BookDetail = () => {
  const { id } = useParams();
  const [download, setDownload] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

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
    console.log("Saved Book:", book);
    try {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const savedBooksCollectionRef = collection(userDocRef, "savedBooks");
        const bookDocRef = doc(savedBooksCollectionRef, String(book.id));
        await setDoc(bookDocRef, book);
        console.log("Book saved successfully!");
        alert("Book saved successfully!");
      } else {
        console.log("User not logged in!");
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const downloadBook = async () => {
    console.log("Downloading book", book);
    console.log(`${book.id}`);
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
      console.log("Download complete!");
    } catch (error) {
      console.error("Error downloading book:", error);
      alert("Error downloading book. Please try again later.");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center items-center min-h-screen ">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-1/5"
        />
        <div className="ml-16 flex flex-col justify-center items-start w-1/3 h-80">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-2xl text-slate-500">{book.authors.map((author) => author.name).join(", ")}</p>
          <p>Translators: {book.translators.map((translator) => translator.name).join(", ")}</p>
          <p>Language: {book.languages}</p>
          <p>Genres: <br/>{book.subjects}</p>
          <p>{book.bookshelves}</p>
          <br/>
          <p>Total downloaded: <p className="font-semibold">{book.download_count}</p></p>

          <br></br>
          <div className="flex flex-col">
            <Button stats="px-2 py-1 w-40 bg-green-700 text-white font-semibold hover:bg-green-500">Read Now</Button>
            <div className="flex flex-row justify-between mt-2">
              <Button onClick={downloadBook} stats="px-2 py-1 border border-black">Download</Button>
              <Button onClick={saveBook} stats="ml-2 px-2 py-1 border border-black">+ Save</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
