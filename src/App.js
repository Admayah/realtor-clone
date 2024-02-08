import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

import "./App.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/sign-up",
		element: <SignUp />,
	},
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/offers",
		element: <Offers />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
  {
		path: "/",
		element: <Profile />,
	},
  {
		path: "/forgot-password",
		element: <ForgotPassword />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
