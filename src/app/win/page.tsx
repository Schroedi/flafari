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
			<div className="flex flex-col items-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
				<h1 className="text-center text-4xl font-bold text-white mt-10">
					You did it!
				</h1>

				{loadedImage && (
					<Polaroid src={loadedImage} alt="Captured" className="mt-10" />
				)}
			</div>
			{isClientMounted && <Score className="absolute top-2/3 left-1/3" />}
		</div>
	);
}
