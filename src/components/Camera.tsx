"use client";

import React from "react";
import { Cog, FlipHorizontal, Image, Zap } from "lucide-react";
import { useEffect } from "react";
import { useCamera } from "../hooks/useCamera";
import SelfieCounter from "./SelfieCounter";
import { useCameraContext } from "../contexts/CameraContext";

export default function Camera() {
	const {
		videoRef,
		photoRef,
		canvasRef,
		isStreamActive,
		error,
		startCamera,
		stopCamera,
		takePicture,
	} = useCameraContext();

    const router = require("next/navigation").useRouter();

	useEffect(() => {
		// Start camera when component mounts
		startCamera();
	}, []);

	const handleTakePicture = async () => {
		try {
			// const photoUrl = await takePicture();
			// console.log("Photo taken:", photoUrl);
			router.push("/countdown");
		} catch (err) {
			console.error("Failed to take picture:", err);
		}
	};

	const handleDownload = () => {
		if (photoRef.current?.src) {
			const a = document.createElement("a");
			a.href = photoRef.current.src;
			a.download = "photo.jpg";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

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

				{/* Top Controls */}
				<div className="absolute top-4 left-0 right-0 flex justify-between px-6">
					<button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
						<Zap className="w-6 h-6" />
					</button>
					<button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
						<Cog className="w-6 h-6" />
					</button>
				</div>

				{/* Bottom Controls */}
				<div className="absolute bottom-8 left-0 right-0">
					<div className="flex justify-between items-center px-8">
						<button
							type="button"
							className="p-2 rounded-full bg-black/30 backdrop-blur-md"
						>
							<Image className="w-8 h-8" />
						</button>
						{/* capture button */}
						<button
							type="button"
							className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center"
							onClick={handleTakePicture}
						>
							<div className="w-16 h-16 rounded-full bg-white" />
						</button>
						<button
							type="button"
							className="p-2 rounded-full bg-black/30 backdrop-blur-md"
						>
							<FlipHorizontal className="w-8 h-8" />
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
