import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    
	const location = useLocation();
	const navigate = useNavigate();

	const pathMatchRoute = (route) => {
		
		if (route === location.pathname){
			console.log('hello', location.pathname,route);
			 return true
			
			};
	};

	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-50">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img
						src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
						alt="logo"
						className="h-5 cursor-pointer"
						onClick={() => navigate("/")}
					/>
				</div>
				<div>
					<ul className="flex space-x-10">
						<li
							className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointe ${pathMatchRoute("/") && "text-[black] border-[red"}`}
							onClick={() => navigate("/")}
						>
							Home
						</li>
						<li
							className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer ${
								pathMatchRoute("/offers") && "text-black border-red-500"
							}`}
							onClick={() => navigate("/offers")}
						>
					Offers
						</li>
						<li
							className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-transparent cursor-pointer ${
								pathMatchRoute("/sign-in") && "text-black border-red-500"
							}`}
							onClick={() => navigate("/sign-in")}
						>
							Sign in
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Header;