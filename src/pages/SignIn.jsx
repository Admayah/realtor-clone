import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCredentials.user) {
				navigate("/");
			}
		} catch (error) {
			toast.error("Incorrect email or password");
		}
	};
	return (
		<section>
			<h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
			<div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
				<div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
					<img
						src="https://images.unsplash.com/photo-1609770231080-e321deccc34c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="key"
						className="w-full rounded-2xl"
					/>
				</div>
				<div className="w-full md:w-[67%] lg:w-[40%] lg:ml-5">
					<form onSubmit={onSubmit}>
						<input
							className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
							type="email"
							id="email"
							value={email}
							onChange={onChange}
							placeholder="Email address"
						/>
						<div className="relative mb-6">
							<input
								className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={onChange}
								placeholder="Password"
							/>
							{showPassword ? (
								<AiFillEyeInvisible
									className="absolute  right-3 top-3 text-xl cursor-pointer"
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							) : (
								<AiFillEye
									className="absolute  right-3 top-3 text-xl cursor-pointer"
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							)}
						</div>
						<div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
							<p className="mb-6">
								Don't have an account?
								<Link
									to="/sign-up"
									className="text-red-600 hover:text-red-700 transition duration-200 ease-out ml-1"
								>
									Register
								</Link>
							</p>
							<p>
								<Link
									to="/forgot-password"
									className="text-blue-600 hover:text-blue-700 transition duration-200 ease-out"
								>
									Forgot Password?
								</Link>
							</p>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
						>
							Sign In
						</button>
						<div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
							<p className="text-center font-semibold mx-4">OR</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</section>
	);
};

export default SignIn;
