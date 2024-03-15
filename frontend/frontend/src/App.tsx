import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./router/routes";
import Root from "./screens/Root";

function App() {
  return (
    <>
      <Root />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
