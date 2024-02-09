import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";

const OAuth = () => {
	const navigate = useNavigate();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({ prompt: "select_account" });
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check if user exist
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate("/");
		} catch (error) {
			toast.error("Could not sign up with Google");
			console.log(error);
		}
	};

	return (
		<button
			className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
			onClick={onGoogleClick}
			type="button"
		>
			<FcGoogle className="text-2xl bg-white rounded-full mr-2" />
			Continue with Google
		</button>
	);
};

export default OAuth;
