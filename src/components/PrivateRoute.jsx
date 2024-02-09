import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
	const { loggedIn, loading } = useAuthStatus();
	if (loading) {
		return <div>Loading...</div>;
	}

	return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
