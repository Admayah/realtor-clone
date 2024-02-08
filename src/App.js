import {
	createBrowserRouter,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";


import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import "./App.css";

const router = createBrowserRouter([
	{
		path: "*",
		element: <Root />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />;
		</>
	);
}

export default App;

function Root() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/offers" element={<Offers />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</>
	);
}
