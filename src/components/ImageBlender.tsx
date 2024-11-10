"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

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

const calculateDrawParams = (
	img: HTMLImageElement,
	canvasRatio: number,
	cutOff: "top" | "equal",
) => {
	// we might want to cut off the upper part to keep the face in the image
	const imgRatio = img.width / img.height;

	const sw = imgRatio > canvasRatio ? img.height * canvasRatio : img.width;
	const sh = imgRatio > canvasRatio ? img.height : img.width / canvasRatio;

	const sx = (img.width - sw) / 2;
	const sy = (img.height - sh) / (cutOff === "top" ? 1 : 2);
	return { sx, sy, sw, sh };
};

interface ImageBlenderProps {
	image1: string;
	image2: string;
	progress: React.MutableRefObject<number>;
	width?: number;
	height?: number;
}

export default function ImageBlender({
	image1,
	image2,
	progress,
	width = 300,
	height = 300,
}: ImageBlenderProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const img1 = useImage(image1);
	const img2 = useImage(image2);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx || !img1 || !img2) return;

		const canvasRatio = width / height;
		const img1Params = calculateDrawParams(img1, canvasRatio, "equal");
		const img2Params = calculateDrawParams(img2, canvasRatio, "top");

		let animationFrameId: number;

		const animate = () => {
			// Clear canvas
			ctx.globalAlpha = 1;
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, width, height);

            const saturation = (0.5 - Math.cos(progress.current * Math.PI) / 2) * 100;
			ctx.filter = `saturate(${saturation}%)`;

			// Draw first image
			ctx.globalAlpha = 0.5 - Math.cos(progress.current * Math.PI) / 2;
			ctx.drawImage(
				img1,
				img1Params.sx,
				img1Params.sy,
				img1Params.sw,
				img1Params.sh,
				0,
				0,
				width,
				height,
			);

			// Blend in second image
			if (progress.current > 0.9) {
				ctx.globalAlpha = (progress.current - 0.9) / 0.1;
				ctx.drawImage(
					img2,
					img2Params.sx,
					img2Params.sy,
					img2Params.sw,
					img2Params.sh,
					0,
					0,
					width,
					height,
				);
			}

			if (progress.current < 1) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, [progress, img1, img2, width, height]);

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
