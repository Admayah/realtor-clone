import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetail, setChangeDetail] = useState();
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// update display name in firebase auth
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// update name in the firestore
				const docRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(docRef, {
					name,
				});
			}
			toast.success("Profile details updated");
		} catch (error) {
			toast.error("Could not update profile details");
		}
	};
	useEffect(() => {
		const fetchUserListings = async () => {
			try {
				// const listingsRef = collection(db, "listings");
				// const userUid = auth.currentUser.uid;
				// const q = query(
				// 	listingsRef,
				// 	where("userRef", "==", userUid),
				// 	// orderBy("timestamp", "desc")
				// );

				const q = query(collection(db, "listings"), where("useRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));

				const querySnapshot = await getDocs(q);
		
				let listings = [];
				querySnapshot.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user listings:", error);
				setLoading(false);
			}
		};
	
		if (auth.currentUser) {
			console.log("Authenticating", auth.currentUser)
			fetchUserListings();
		}
	}, [auth.currentUser]);
	
	
	

	console.log(listings, 'listings');

	return (
		<>
			<section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
				<h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
				<div className="w-full md:w-[50%] mt-6 px-3">
					<form>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							disabled={!changeDetail}
							onChange={onChange}
							className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
								changeDetail && "bg-red-200 focus:bg-red-200"
							}`}
						/>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							disabled
							className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
						/>
						<div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
							<p className="flex items-center">
								Do you want to change your name?{" "}
								<span
									onClick={() => {
										changeDetail && onSubmit();
										setChangeDetail((prevState) => !prevState);
									}}
									className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
								>
									{changeDetail ? "Apply change" : "Edit"}
								</span>
							</p>
							<p
								onClick={onLogout}
								className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
							>
								Sign out
							</p>
						</div>
					</form>
					<button
						type="submit"
						className="w-full  bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
					>
						<Link
							to="/create-listing"
							className="flex justify-center items-center"
						>
							<FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />{" "}
							Sell or Rent your home
						</Link>
					</button>
				</div>
			</section>
			<div className="max-w-6xl px-3 mt-6 mx-auto">
				{!loading && listings.length > 0 && (
					<>
						<h2 className="text-2xl text-center font-semibold mb-6">My Listing</h2>
						<ul className="sm:grid sm:grid-cols-2 lg: grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-6">
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									id={listing.id}
									listing={listing.data}
								/>
							))}
						</ul>
					</>
				)}
			</div>
		</>
	);
};

export default Profile;
