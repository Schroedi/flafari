"use client";

import { useEffect, useState } from "react";
import Polaroid from "../../components/Polaroid";

export default function WinPage() {
	const [loadedImage, setLoadedImage] = useState<string | null>(null);

	useEffect(() => {
        const savedImage = localStorage.getItem("capturedImage");
		if (savedImage) {
			setLoadedImage(savedImage);
			console.log("loadedImage", savedImage);
		}
	}, []);

	return (
		<div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
            {loadedImage && <Polaroid src={loadedImage} alt="Captured" />}
		</div>
	);
}
