import Nav from "./components/nav";
import Books from "./components/Books";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter ([
  {
    path : "/",
    element : <Books/>
  },
  {
    path : "/hello",
    element : <div className="flex justify-center items-center min-h-screen text-3xl"><h1>WOYYYYLAH</h1></div>,
  },
])

const App = () => {
  return (
    <div className="bg-indigo-600">
      <Nav />
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
