import { useState } from "react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { useNavigate } from "react-router";

const CreateListing = () => {
	const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		type: "rent",
		name: "",
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: "",
		description: "",
		offers: true,
		regularPrice: 0,
		discountedPrice: 0,
		latitude: 0,
		longitude: 0,
		images: {},
	});
	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		description,
		offers,
		regularPrice,
		discountedPrice,
		latitude,
		longitude,
		images,
	} = formData;

	const navigate = useNavigate();

	const auth = getAuth();

	const onChange = (e) => {
		let boolean = null;
		if (e.target.value === "true") {
			boolean = true;
		}
		if (e.target.value === "false") {
			boolean = false;
		}
		// files
		if (e.target.files) {
			setFormData({
				...formData,
				images: e.target.files,
			});
		}
		// Text / Boolean / Number
		if (!e.target.files) {
			setFormData({
				...formData,
				[e.target.id]: boolean ?? e.target.value,
			});
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (+discountedPrice >= +regularPrice) {
			setLoading(false);
			toast.error("Discounted price needs be less than regular price");
			return;
		}
		if (images.length > 6) {
			setLoading(false);
			toast.error("Maximum of 6 images are allowed");
			return;
		}

		const storeImage = async (image) => {
			console.log(image);
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const filename = `${auth.currentUser.uid} - ${image.name}-${uuidv4()}`;
				const storageRef = ref(storage, filename);
				const uploadTask = uploadBytesResumable(storageRef, image);
				console.log(uploadTask, "task");

				// Listen for state changes, errors, and completion of the upload.
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						console.log(snapshot);
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log("Upload is " + progress + "% done");
						switch (snapshot.state) {
							case "paused":
								console.log("Upload is paused");
								break;
							case "running":
								console.log("Upload is running");
								break;
						}
					},
					(error) => {
						reject(error);
					},
					() => {
						// Upload completed successfully, now we can get the download URL
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};

		const imgUrls = await Promise.all(
			[...images].map((image) => storeImage(image))
		).catch((error) => {
			setLoading(false);
			toast.error("Images not uploaded");
			return;
		});

		const formDataCopy = { ...formData, imgUrls, timestamp: serverTimestamp() };
		delete formDataCopy.images;
		!formDataCopy.offers && delete formDataCopy.discountedPrice;
		const docRef = await addDoc(collection(db, "listings"), formDataCopy);
		setLoading(false);
		toast.success("Listing created");
		navigate(`category/${formDataCopy.type}/${docRef.id}`);

		// let geoLocation = {}
		// let location
		// if(geoLocationEnabled) {

		// }
	};

	if (loading) return <Spinner />;

	return (
		<main className="max-w-md px-2 mx-auto">
			<h1 className="text-3xl text-center mt-6 font-bold ">Create a Listing</h1>
			<form onSubmit={onSubmit}>
				<p className="text-lg mt-6 font-semibold">Sell/Rent</p>
				<div className="flex space-x-6">
					<button
						type="button"
						id="type"
						value="sale"
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							type === "rent"
								? "bg-white text-black"
								: "bg-slate-600 text-white"
						}`}
					>
						sell
					</button>
					<button
						type="button"
						id="type"
						value="rent"
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							type === "sale"
								? "bg-white text-black"
								: "bg-slate-600 text-white"
						}`}
					>
						rent
					</button>
				</div>

				<p className="text-lg mt-6 font-semibold">Name</p>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					onChange={onChange}
					placeholder="Property Name"
					maxLength="32"
					minLength="10"
					required
					className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
				/>
				<div className="flex space-x-6 mb-6">
					<div>
						<p className="text-lg font-semibold ">Beds</p>
						<input
							type="number"
							name="bedrooms"
							id="bedrooms"
							value={bedrooms}
							onChange={onChange}
							min="1"
							max="50"
							required
							className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
						/>
					</div>
					<div>
						<p className="text-lg font-semibold ">Baths</p>
						<input
							type="number"
							name="bathrooms"
							id="bathrooms"
							value={bathrooms}
							onChange={onChange}
							min="1"
							max="50"
							required
							className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
						/>
					</div>
				</div>

				<p className="text-lg mt-6 font-semibold">Parking spot</p>
				<div className="flex space-x-6">
					<button
						type="button"
						id="parking"
						value={true}
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							!parking ? "bg-white text-black" : "bg-slate-600 text-white"
						}`}
					>
						Yes
					</button>
					<button
						type="button"
						id="parking"
						value={false}
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							parking ? "bg-white text-black" : "bg-slate-600 text-white"
						}`}
					>
						no
					</button>
				</div>

				<p className="text-lg mt-6 font-semibold">Furnished</p>
				<div className="flex space-x-6">
					<button
						type="button"
						id="furnished"
						value={true}
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							!furnished ? "bg-white text-black" : "bg-slate-600 text-white"
						}`}
					>
						Yes
					</button>
					<button
						type="button"
						id="furnished"
						value={false}
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							furnished ? "bg-white text-black" : "bg-slate-600 text-white"
						}`}
					>
						no
					</button>
				</div>
				<p className="text-lg mt-6 font-semibold">Address</p>
				<textarea
					type="text"
					name="address"
					id="address"
					value={address}
					onChange={onChange}
					placeholder="Address"
					required
					className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
				/>
				{!geoLocationEnabled && (
					<div className="flex space-x-6 justify-start mb-6">
						<div>
							<p className="text-lg font-semibold">Latitude</p>
							<input
								type="number"
								name="latitude"
								id="latitude"
								value={latitude}
								onChange={onChange}
								min="-90"
								max="90"
								required
								className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
							/>
						</div>
						<div>
							<p className="text-lg font-semibold">Longitude</p>
							<input
								type="number"
								name="longitude"
								id="longitude"
								value={longitude}
								onChange={onChange}
								min="-180"
								max="180"
								required
								className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
							/>
						</div>
					</div>
				)}
				<p className="text-lg font-semibold">Description</p>
				<textarea
					type="text"
					name="description"
					id="description"
					value={description}
					onChange={onChange}
					placeholder="Description"
					required
					className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
				/>
				<p className="text-lg font-semibold">Offers</p>
				<div className="flex space-x-6 mb-6">
					<button
						type="button"
						id="offers"
						value={true}
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							!offers ? "bg-white text-black" : "bg-slate-600 text-white"
						}`}
					>
						Yes
					</button>
					<button
						type="button"
						id="offers"
						value={false}
						onClick={onChange}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
							offers ? "bg-white text-black" : "bg-slate-600 text-white"
						}`}
					>
						no
					</button>
				</div>
				<div className="flex items-center mb-6">
					<div>
						<p className="text-lg font-semibold ">Regular Price</p>
						<div className="flex items-center justify-center space-x-6">
							<input
								type="number"
								name="regularPrice"
								id="regularPrice"
								value={regularPrice}
								onChange={onChange}
								min="50"
								max="400000000"
								required
								className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
							/>
							{type === "rent" && (
								<div className="text-md w-full whitespace-nowrap">
									$ / Month
								</div>
							)}
						</div>
					</div>
				</div>
				{offers && (
					<div className="flex items-center mb-6">
						<div>
							<p className="text-lg font-semibold ">Discounted Price</p>
							<div className="flex items-center justify-center space-x-6">
								<input
									type="number"
									name="discountedPrice"
									id="discountedPrice"
									value={discountedPrice}
									onChange={onChange}
									min="50"
									max="400000000"
									required={offers}
									className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
								/>
								{type === "rent" && (
									<div className="text-md w-full whitespace-nowrap">
										$ / Month
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="mb-6">
					<p className="text-lg font-semibold">Images</p>
					<p className="text-gray-600">
						The first image will be the cover (max 6)
					</p>
					<input
						type="file"
						name="images"
						id="images"
						onChange={onChange}
						accept=".jpg, .png, .jpeg"
						multiple
						required
						className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out"
					/>
				</div>
				<button
					type="submit"
					className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium  text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
				>
					create listing
				</button>
			</form>
		</main>
	);
};

export default CreateListing;
