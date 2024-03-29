import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {

	const [email, setEmail] = useState("")


	const onChange = (e) => {
		setEmail(e.target.value)
	}

	const onSubmit = async (e) => {
		e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(
                auth,
                email
            );
            toast.success("Password reset email sent!");
        } catch (error) {
            toast.error("Couldn't send password reset email");
        }
	}
	return (
		<section>
			<h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
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
						<input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6" type="email"  
						id="email"
						value={email}
						onChange={onChange}
						placeholder="Email address"/>
						
						<div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
							<p className="mb-6">Don't have an account?
								<Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-out ml-1">Register</Link>
							</p>
							<p><Link to="/sign-in" className="text-blue-600 hover:text-blue-700 transition duration-200 ease-out">Sign in instead</Link></p>
						</div>
						<button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Reset password</button>
					<div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
						<p className="text-center font-semibold mx-4">OR</p>
					</div>
					<OAuth/>
					</form>
			
				</div>
			</div>
		</section>
	);
}

export default ForgotPassword