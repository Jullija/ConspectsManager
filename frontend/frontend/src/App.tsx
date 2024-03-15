import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./router/routes";
import Navbar from "./components/Navbar";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
