"use client";

import Polaroid from "../components/Polaroid";
import { useCameraContext } from "../contexts/CameraContext";
import { useCamera } from "../hooks/useCamera";

export default function WinPage() {
	const { stopCamera, capturedImage } = useCameraContext();
	// stopCamera();
	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
			{capturedImage && <Polaroid src={capturedImage} alt="Captured" />}
		</div>
	);
}
