"use client";

import React from "react";
import { useEffect } from "react";
import { useCameraContext } from "../contexts/CameraContext";

export default function Camera() {
	const { videoRef, error, startCamera, takePicture } = useCameraContext();

	const router = require("next/navigation").useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: enless loop with startCamera
	useEffect(() => {
		// Start camera when component mounts
		startCamera();
	}, []);

	const handleTakePicture = async () => {
		try {
			await takePicture("environment");
			router.replace("/countdown");
		} catch (err) {
			console.error("Failed to take picture:", err);
		}
	};

	// const handleDownload = () => {
	// 	if (photoRef.current?.src) {
	// 		const a = document.createElement("a");
	// 		a.href = photoRef.current.src;
	// 		a.download = "photo.jpg";
	// 		document.body.appendChild(a);
	// 		a.click();
	// 		document.body.removeChild(a);
	// 	}
	// };

	return (
		<>
			<div className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-purple-400 to-blue-500 text-white overflow-hidden">
				{/* Camera View */}
				{error && <div className="text-red-500">{error}</div>}

				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					className="w-full h-full"
				/>

				{/* Bottom Controls */}
				<div className="absolute bottom-8 left-0 right-0">
					<div className="flex justify-center items-center px-8">
						{/* capture button */}
						<button
							type="button"
							className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
							onClick={handleTakePicture}
						>
							<div className="w-16 h-16 rounded-full bg-white" />
						</button>
					</div>
					<div className="mt-6 flex justify-center">
						<div className="text-center px-4 py-1 rounded-full bg-black/30 backdrop-blur-md">
							<span className="font-medium">Photo</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
