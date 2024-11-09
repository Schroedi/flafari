"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

const StarParticle = ({
	speed,
	delay,
	isExploding,
}: { speed: number; delay: number; isExploding: boolean }) => {
	const angle = Math.random() * Math.PI * 2;
	const distance = isExploding ? Math.random() * 150 : 150 + Math.random() * 50;
	const initialX = Math.cos(angle) * distance;
	const initialY = Math.sin(angle) * distance;

	return (
		<motion.div
			className="absolute bg-white rounded-full"
			style={{
				width: `${Math.random() * 3 + 1}px`,
				height: "1px",
				left: "50%",
				top: "50%",
				x: initialX,
				y: initialY,
			}}
			animate={
				isExploding
					? {
							x: [initialX, 0],
							y: [initialY, 0],
							opacity: [1, 0],
						}
					: {
							x: 0,
							y: 0,
							opacity: [1, 0],
						}
			}
			transition={{
				duration: isExploding ? 0.5 : 2 / speed,
				repeat: isExploding ? 0 : Number.POSITIVE_INFINITY,
				repeatType: "loop",
				ease: "linear",
				delay: isExploding ? 0 : delay,
			}}
		/>
	);
};

export default function Score({ className }: { className?: string }) {
	const [score, setScore] = useState(0);
	const [starSpeed, setStarSpeed] = useState(0.1);
	const [starCount, setStarCount] = useState(10);
	const [isExploding, setIsExploding] = useState(false);
	const controls = useAnimation();

	const incrementScore = useCallback(() => {
		setScore((prevScore) => {
			const newScore = prevScore + Math.floor(prevScore / 100) + 10;
			return Math.min(newScore, 9000);
		});
	}, []);

	useEffect(() => {
		const interval = setInterval(incrementScore, 50);
		return () => clearInterval(interval);
	}, [incrementScore]);

	useEffect(() => {
		setStarSpeed(0.1 + score / 1000);
		setStarCount(Math.min(10 + Math.floor(score / 50), 200));

		if (score >= 100 && score % 100 === 0) {
			controls.start({
				scale: [1, 1.2, 1],
				transition: { duration: 0.3 },
			});
		}

		if (score === 900) {
			controls.start({
				rotate: [0, 360],
				scale: [1, 1.5, 1],
				transition: { duration: 0.5 },
			});
		}

		if (score === 9000) {
			setIsExploding(true);
			controls.start({
				rotate: [0, 720],
				scale: [1, 2, 1],
				transition: { duration: 1 },
			});
		}
	}, [score, controls]);

	return (
		<div className={cn("text-center", className)}>
			<div className="relative w-[300px] h-[300px] mx-auto ">
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.div
						animate={controls}
						className="text-6xl font-bold font-mono tabular-nums z-10"
					>
						{score.toLocaleString().padStart(5, "0")}
					</motion.div>
				</div>
				{Array.from({ length: starCount }).map((_, i) => (
					<StarParticle
						key={i}
						speed={starSpeed}
						delay={i * 0.01}
						isExploding={isExploding}
					/>
				))}
			</div>
		</div>
	);
}
