"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Polaroid, { PolaroidFrame } from "../../components/Polaroid";
import Score from "@/components/Score";
import ImageBlender from "@/components/ImageBlender";
import { Share } from "lucide-react";

export default function WinPage() {
	const [loadedImage, setLoadedImage] = useState<string | null>(null);
	const [loadedUserImage, setLoadedUserImage] = useState<string | null>(null);
	const [isClientMounted, setIsClientMounted] = useState(false);
	const targetScore = useRef(0);
	const progress = useRef(0);
	const [progressState, setProgressState] = useState(0);

	const duration = 5000;

	useEffect(() => {
		let animationFrameId: number;
		let startTime: number | null = null;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const newProgress = Math.min((timestamp - startTime) / duration, 1);
			progress.current = newProgress;
			setProgressState(newProgress);
			if (newProgress < 1) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		targetScore.current = 500 + Math.floor(Math.random() * 8500);
		console.log("targetScore", targetScore.current);

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, []);

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
							text: "Meine Flasche hat’s geschafft bei Flascherazzi! Zeig deine: https://flascherazzi.de 😄🍾",
						})
						.then(() => console.log("Share was successful."))
						.catch((error) => console.log("Sharing failed", error));
				}
			});
		}
	}, [loadedImage]);

	return (
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
				{loadedImage && <p>loadedImage</p>}
				{loadedUserImage && <p>loadedUserImage</p>}
				{loadedImage && loadedUserImage && (
					<PolaroidFrame
						className="mt-10"
						comment={progressState > 0.9 ? "Größte Flasche ever." : undefined}
					>
						<ImageBlender
							image1={loadedImage}
							image2={loadedUserImage}
							progress={progress}
						/>
					</PolaroidFrame>
				)}
				{isClientMounted && (
					<Score
						className="transform -translate-y-[480px] translate-x-[70px]"
						progress={progress}
						targetScore={targetScore.current}
					/>
				)}
			</div>

			<button
				type="button"
				onClick={doShare}
				className="fixed bottom-4 left-1/2 -translate-x-1/2 -translate-y-10 bg-white text-purple-700 px-4 py-2 rounded-full inline-block transform rotate-2"
			>
				Share <Share className="inline-block ml-1" size={16} />
			</button>
		</div>
	);
}
