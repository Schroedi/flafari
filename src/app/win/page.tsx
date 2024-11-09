"use client";

import { useEffect, useState } from "react";
import Polaroid from "../../components/Polaroid";
import Score from "@/components/Score";

export default function WinPage() {
	const [loadedImage, setLoadedImage] = useState<string | null>(null);
	const [isClientMounted, setIsClientMounted] = useState(false);

	useEffect(() => {
		const savedImage = localStorage.getItem("capturedImage");
		if (savedImage) {
			setLoadedImage(savedImage);
		}
	}, []);

	useEffect(() => {
		setIsClientMounted(true);
	}, []);

	return (
		<div className="">
			<div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
				{loadedImage && <Polaroid src={loadedImage} alt="Captured" />}
			</div>
			{isClientMounted && <Score className="absolute top-1/2 left-1/3" />}
		</div>
	);
}
