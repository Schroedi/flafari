"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

const StarParticle = ({ speed, delay }: { speed: number; delay: number }) => {
	const angle = Math.random() * Math.PI * 2;
	// const distance = isExploding ? Math.random() * 150 : 150 + Math.random() * 50;
	const distance = 150 + Math.random() * 50;
	const initialX = Math.cos(angle) * distance;
	const initialY = Math.sin(angle) * distance;

	const isExploding = false;

	return (
		<motion.div
			className="absolute rounded-full"
			style={{
				width: "4px",
				height: "4px",
				left: "50%",
				top: "50%",
				x: initialX,
				y: initialY,
				background: "white",
			}}
			animate={
				isExploding
					? {
							x: [initialX, 0],
							y: [initialY, 0],
							opacity: [1, 0],
							background: [
								"rgb(255, 255, 255)",
								"rgb(255, 200, 100)",
								"rgb(255, 100, 50)",
							],
						}
					: {
							x: 0,
							y: 0,
							opacity: [1, 0],
							background: [
								"rgb(255, 255, 255)",
								"rgb(100, 200, 255)",
								"rgb(150, 100, 255)",
							],
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

export default function Score({
	className,
	progress,
	targetScore,
}: {
	className?: string;
	progress: React.MutableRefObject<number>;
	targetScore: number;
}) {
	const [score, setScore] = useState(0);
	const [starSpeed, setStarSpeed] = useState(0.1);
	const [starCount, setStarCount] = useState(10);
	const [isExploding, setIsExploding] = useState(false);
	const controls = useAnimation();
	const scoreLevel = useRef(0);

	const incrementScore = useCallback(() => {
		setScore((prevScore) => {
			const progressFactor = progress.current;
			const quadraticProgress = progressFactor * progressFactor;
			const newScore = Math.floor(
				(quadraticProgress * 0.4 + progressFactor * 0.4) * targetScore,
			);
			if (newScore <= prevScore) {
				return prevScore;
			}
			return Math.min(newScore, targetScore);
		});
	}, [progress, targetScore]);

	useEffect(() => {
		const interval = setInterval(incrementScore, 50);
		return () => clearInterval(interval);
	}, [incrementScore]);

	useEffect(() => {
		setStarSpeed(0.1 + score / 1000);
		setStarCount(Math.min(10 + Math.floor(score / 50), 200));
		const scoreLevel1 = 0.3;
		const scoreLevel2 = 0.7;

		if (progress.current >= scoreLevel1 && scoreLevel.current < 1) {
			controls.start({
				scale: [1, 1.2, 1],
				rotate: [0, 10],
				transition: { duration: 0.3 },
			});
			scoreLevel.current = 1;
		}

		if (progress.current >= scoreLevel2 && scoreLevel.current < 2) {
			controls.start({
				scale: [1, 1.5, 1],
				rotate: [10, 320],
				transition: { duration: 0.5 },
			});
			scoreLevel.current = 2;
		}

		if (progress.current >= 0.95 && scoreLevel.current < 3) {
			setIsExploding(true);
			controls.start({
				rotate: [320, 730],
				scale: [1, 2, 1],
				transition: { duration: 1 },
			});
			scoreLevel.current = 3;
		}
	}, [progress, controls, score]);

	const StarParticleMemo = useMemo(() => StarParticle, []);

	return (
		<div className={cn("text-center", className)}>
			<div className="relative w-[300px] h-[300px] mx-auto ">
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.div
						animate={controls}
						className="text-6xl font-bold font-mono tabular-nums z-10 neonText"
					>
						{`${score.toString().padStart(4, "0")}€`}
					</motion.div>
				</div>
				{Array.from({ length: starCount }).map((_, i) => (
					<StarParticleMemo key={i} speed={starSpeed} delay={i * 0.01} />
				))}
			</div>
		</div>
	);
}
