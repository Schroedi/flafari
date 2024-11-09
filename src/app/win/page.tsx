"use client";

import { useEffect, useState } from "react";
import Polaroid, { PolaroidFrame } from "../../components/Polaroid";
import Score from "@/components/Score";
import ImageBlender from "@/components/ImageBlender";

export default function WinPage() {
	const [loadedImage, setLoadedImage] = useState<string | null>(null);
	const [loadedUserImage, setLoadedUserImage] = useState<string | null>(null);
	const [isClientMounted, setIsClientMounted] = useState(false);

	useEffect(() => {
		const savedImage = localStorage.getItem("capturedImage-environment");
		if (savedImage) {
			console.log("savedImage", savedImage);
			setLoadedImage(savedImage);
		}
		const savedUserImage = localStorage.getItem("capturedImage-user");
		if (savedUserImage) {
			console.log("savedUserImage", savedUserImage);
			setLoadedUserImage(savedUserImage);
		}
	}, []);

	useEffect(() => {
		setIsClientMounted(true);
	}, []);

	return (
		<div className="">
			<div className="flex flex-col items-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
				<h1 className="text-center text-4xl font-bold text-white mt-10">
					You did it!
				</h1>

				<div className="relative mt-10">
					{/* {loadedImage && loadedUserImage && (
						<>
							<div className="absolute inset-0 transition-opacity duration-1000 ease-in-out animate-fade-in-out">
								<Polaroid src={loadedImage} alt="Environment shot" />
							</div>
							<div className="absolute inset-0 transition-opacity duration-1000 ease-in-out animate-fade-in-out-delayed">
								<Polaroid src={loadedUserImage} alt="Selfie shot" />
							</div>
						</>
					)} */}
					{loadedImage && loadedUserImage && (
						<PolaroidFrame className="mt-10">
							<ImageBlender image1={loadedImage} image2={loadedUserImage} />
						</PolaroidFrame>
					)}
				</div>
			</div>
			{/* {isClientMounted && <Score className="absolute top-2/3 left-1/3" />} */}
		</div>
	);
}
