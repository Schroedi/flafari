"use client";

import { useEffect, useMemo } from "react";
import { useCameraContext } from "../../../contexts/CameraContext";
import SelfieCounter from "../../../components/SelfieCounter";

export default function Countdown() {
	const router = require("next/navigation").useRouter();

	const { takePicture, videoRef } = useCameraContext();

	useEffect(() => {
		const capturePhoto = async () => {
			try {
				// wait to make sure the animation is smooth
				await new Promise((resolve) => setTimeout(resolve, 250));
				await takePicture("user");
			} catch (error) {
				console.error("Failed to take picture:", error);
			}
		};

		capturePhoto();
	}, [takePicture]);

	const counterMemo = useMemo(() => {
		return (
			<SelfieCounter
				onComplete={() => {
					router.replace("/win");
				}}
			/>
		);
	}, [router]);
	return (
		<>
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				className="z-0 w-full h-full"
			/>

			{counterMemo}
		</>
	);
}
