"use client";

import React, { useState, useEffect, useRef } from "react";

// Custom hook to load an image
const useImage = (src: string): HTMLImageElement | null => {
	const [image, setImage] = useState<HTMLImageElement | null>(null);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => setImage(img);
	}, [src]);

	return image;
};

interface ImageBlenderProps {
	image1: string;
	image2: string;
	width?: number;
	height?: number;
	duration?: number;
}

export default function ImageBlender({
	image1,
	image2,
	width = 300,
	height = 300,
	duration = 5000,
}: ImageBlenderProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [progress, setProgress] = useState(0);

	const img1 = useImage(image1);
	const img2 = useImage(image2);

	useEffect(() => {
		if (!canvasRef.current || !img1 || !img2) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let startTime: number | null = null;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const elapsedTime = timestamp - startTime;
			const newProgress = Math.min(elapsedTime / duration, 1);
			setProgress(newProgress);
			// Set clear color to white
			ctx.globalAlpha = 1;
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, width, height);
			// ctx.clearRect(0, 0, width, height);

			// increase the opacity during the first 40% of the animation
			const opacity = newProgress <= 0.7 ? (newProgress / 0.7) * 1 : 1;
			ctx.globalAlpha = 0.5 - Math.cos(newProgress * Math.PI) / 2;

			// Draw the first image
			ctx.drawImage(img1, 0, 0, width, height);

			// Apply saturation
			const saturation = newProgress <= 0.7 ? (newProgress / 0.7) * 1 : 1;
			ctx.filter = `saturate(${saturation * 100}%)`;
			ctx.drawImage(canvas, 0, 0);
			ctx.filter = "none";

			if (newProgress > 0.7) {
				const blendProgress = (newProgress - 0.7) / 0.3;
				ctx.globalAlpha = blendProgress;
				ctx.drawImage(img2, 0, 0, width, height);
			}

			if (newProgress < 1) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [img1, img2, width, height, duration]);

	return (
		<div className="flex flex-col items-center space-y-4">
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				className="border border-gray-300 rounded-lg"
			/>
		</div>
	);
}
