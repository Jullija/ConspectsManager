import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./router/routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ margin: 20 }}>
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
