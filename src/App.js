import {
	createBrowserRouter,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from "./pages/CreateListing";

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
				<Route path="/profile" element={<PrivateRoute />} >
				<Route path="" element={<Profile />} />
				</Route>
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/create-listing" element={<CreateListing />} />
			
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
}
