"use client";

import React, { useState, useEffect, useRef } from "react";

// load image
const useImage = (src: string): HTMLImageElement | null => {
	const [image, setImage] = useState<HTMLImageElement | null>(null);
	useEffect(() => {
		const img = new Image();
		img.onload = () => setImage(img);
		img.src = src;
	}, [src]);
	return image;
};

const calculateDrawParams = (img: HTMLImageElement, canvasRatio: number) => {
	const imgRatio = img.width / img.height;
	const sx = imgRatio > canvasRatio ? (img.width - img.height * canvasRatio) / 2 : 0;
	const sy = imgRatio > canvasRatio ? 0 : (img.height - img.width / canvasRatio) / 2;
	const sw = imgRatio > canvasRatio ? img.height * canvasRatio : img.width;
	const sh = imgRatio > canvasRatio ? img.height : img.width / canvasRatio;
	return { sx, sy, sw, sh };
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
	const img1 = useImage(image1);
	const img2 = useImage(image2);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx || !img1 || !img2) return;

		const canvasRatio = width / height;
		const img1Params = calculateDrawParams(img1, canvasRatio);
		const img2Params = calculateDrawParams(img2, canvasRatio);

		let animationFrameId: number;
		let startTime: number | null = null;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const newProgress = Math.min((timestamp - startTime) / duration, 1);

			// Clear canvas
			ctx.globalAlpha = 1;
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, width, height);

			// Draw first image
			ctx.globalAlpha = 0.5 - Math.cos(newProgress * Math.PI) / 2;
			ctx.drawImage(img1, img1Params.sx, img1Params.sy, img1Params.sw, img1Params.sh, 0, 0, width, height);

			// Apply saturation
			const saturation = Math.min(newProgress / 0.7, 1) * 100;
			ctx.filter = `saturate(${saturation}%)`;
			ctx.drawImage(canvas, 0, 0);
			ctx.filter = "none";

			// Blend in second image
			if (newProgress > 0.7) {
				ctx.globalAlpha = (newProgress - 0.7) / 0.3;
				ctx.drawImage(img2, img2Params.sx, img2Params.sy, img2Params.sw, img2Params.sh, 0, 0, width, height);
			}

			if (newProgress < 1) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
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
