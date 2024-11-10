"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Polaroid, { PolaroidFrame } from "../../components/Polaroid";
import Score from "@/components/Score";
import ImageBlender from "@/components/ImageBlender";
import { Share } from "lucide-react";
import TimoDialog from "@/components/Timo";
import { cn } from "@/lib/utils";

export default function WinPage() {
	const [loadedImage, setLoadedImage] = useState<string | null>(null);
	const [loadedUserImage, setLoadedUserImage] = useState<string | null>(null);
	const [isClientMounted, setIsClientMounted] = useState(false);
	const targetScore = useRef(0);
	const progress = useRef(0);
	const [progressState, setProgressState] = useState(0);

	const duration = 10000;

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

		targetScore.current = 9000 + Math.floor(Math.random() * 8500);
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
		<div className="h-dvh flex flex-col justify-between items-center bg-gradient-to-br from-purple-700 to-pink-500">
			<h1 className="text-center text-4xl font-bold text-white mt-8">
				You did it!
			</h1>

			<div className="relative mt-4">
				{loadedImage && loadedUserImage && (
					<PolaroidFrame
						comment={progressState > 0.9 ? "Größte Flasche ever." : ""}
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
						className="absolute transform -translate-y-[480px] translate-x-[70px] overflow-clip"
						progress={progress}
						targetScore={targetScore.current}
					/>
				)}
			</div>

			<div
				className={cn(
					"flex flex-row space-x-4 mb-10 mt-4 animate-fade-in transition-opacity duration-1000",
					progressState > 0.95 ? "opacity-100" : "opacity-0"
				)}
			>
				<TimoDialog />
				<div>
					<button
						type="button"
						onClick={doShare}
						className="min-w-32 z-20 bg-white text-purple-700 px-4 py-2 rounded-full inline-block transform rotate-2"
					>
						Teilen <Share className="inline-block ml-1" size={16} />
					</button>
					{loadedImage && (
						<div
							className="z-0 absolute border-white border-4 border-b-8 w-16 h-[70px] translate-x-16 -translate-y-[100px] shadow-md transform rotate-12"
							onClick={doShare}
							onKeyDown={(e) => e.key === "Enter" && doShare()}
						>
							<img
								src={loadedImage}
								alt="Shared"
								className="w-full h-full object-cover"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
