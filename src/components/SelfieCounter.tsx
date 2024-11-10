"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

interface ComponentProps {
	onComplete: () => void;
}

export default function Component({ onComplete }: ComponentProps) {
	const [count, setCount] = useState(3);
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => setCount(count - 1), 500);
			return () => clearTimeout(timer);
		}
		setIsComplete(true);
		onComplete();
	}, [count, onComplete]);

	return (
		<div className="absolute inset-0 z-10 flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-pink-500">
			<div className="relative w-64 h-64">
				<AnimatePresence mode="wait">
					{!isComplete ? (
						<motion.div
							key="countdown"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{ duration: 0.5 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<motion.div
								className="text-white text-9xl font-bold"
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ type: "spring", stiffness: 300, damping: 10 }}
							>
								{count}
							</motion.div>
							<svg
								className="absolute w-full h-full"
								viewBox="0 0 100 100"
								aria-hidden="true"
							>
								<motion.circle
									cx="50"
									cy="50"
									r="45"
									fill="none"
									stroke="rgba(255,255,255,0.5)"
									strokeWidth="10"
									initial={{ pathLength: 0 }}
									animate={{ pathLength: 1 }}
									transition={{
										duration: 0.5,
										ease: "linear",
										repeat: Number.POSITIVE_INFINITY,
									}}
								/>
							</svg>
						</motion.div>
					) : (
						<motion.div
							key="complete"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ type: "spring", stiffness: 300, damping: 10 }}
							className="absolute inset-0 flex items-center justify-center"
						>
							<Camera className="text-white w-32 h-32" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
