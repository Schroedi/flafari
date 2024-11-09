import { cn } from "@/lib/utils";
import type { FC } from "react";
import { useState, useEffect } from "react";
import Score from "@/components/Score";

interface PolaroidProps {
	src: string;
	alt: string;
	className?: string;
	comment?: string;
	score?: number;
}

const Polaroid: FC<PolaroidProps> = ({
	src,
	alt,
	className,
	comment,
	score,
}) => {
	return (
		<PolaroidFrame className={className} comment={comment} score={score}>
			<img src={src} alt={alt} className="object-cover w-[300px] h-[300px]" />
		</PolaroidFrame>
	);
};

interface PolaroidFrameProps {
	children: React.ReactNode;
	className?: string;
	comment?: string;
	score?: number;
}

export const PolaroidFrame: FC<PolaroidFrameProps> = ({
	children,
	className,
	comment = "Flascherazzi Moment",
	score,
}) => {
	return (
		<div
			className={cn(
				"bg-white p-4 shadow-lg transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-300",
				className,
			)}
		>
			{children}
			<div className="relative">
				{score && (
					<div className="absolute bottom-[50px] left-1/2 transform -rotate-6 -translate-x-1/4 text-6xl font-bold text-fuchsia-900 font-mono tabular-nums neonText z-10">
						{`${score?.toString().padStart(4, "0")}€`}
					</div>
				)}
				<div className="mt-2 text-center text-gray-700 font-handwriting font-semibold text-4xl">
					<div className="text-3xl">{comment}</div>
				</div>
			</div>
		</div>
	);
};

export default Polaroid;
