"use client";

import { useCallback, useEffect, useState } from "react";
import Polaroid, { PolaroidFrame } from "../../components/Polaroid";
import Score from "@/components/Score";
import ImageBlender from "@/components/ImageBlender";
import { Share } from "lucide-react";

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

	const doShare = useCallback(() => {
		console.log("doShare");
		if (loadedImage) {
			console.log("loadedImage", loadedImage);
			const imageBlob = fetch(loadedImage).then((res) => res.blob());
			imageBlob.then((blob) => {
				const file = new File([blob], "flascherazzi.jpg", {
					type: "image/jpeg",
				});

				if (navigator.canShare?.({ files: [file] })) {
					navigator
						.share({
							files: [file],
							title: "Flascherazzi",
							text: "Ich habe die Flascherazzi geschafft!",
							url: "https://flascherazzi.de",
						})
						.then(() => console.log("Share was successful."))
						.catch((error) => console.log("Sharing failed", error));
				}
			});
		}
	}, [loadedImage]);

	return (
		<div className="">
			<div className="flex flex-col justify-between items-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
				<h1 className="text-center text-4xl font-bold text-white mt-8">
					You did it!
				</h1>

				<div className="relative mt-0">
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
				{isClientMounted && (
					<Score className="transform -translate-y-1/2 translate-x-1/3" />
				)}
				<button
					type="button"
					onClick={doShare}
					className="fixed bottom-4 left-1/2 -translate-x-1/2 -translate-y-10 bg-white text-purple-700 px-4 py-2 rounded-full inline-block transform -rotate-2"
				>
					Share <Share className="inline-block ml-1" size={16} />
				</button>
			</div>
		</div>
	);
}
