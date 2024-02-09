import { useState } from "react";

const CreateListing = () => {
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
	} = formData;
	const onChange = () => {};
	return (
		<main className="max-w-md px-2 mx-auto">
			<h1 className="text-3xl text-center mt-6 font-bold ">Create a Listing</h1>
			<form>
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
						value="sale"
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
						id="parking"
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
					<p className="text-gray-600">The first image will be the cover (max 6)</p>
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
			</form>
		</main>
	);
};

export default CreateListing;
