import { cn } from "@/lib/utils";
import type { FC } from "react";

interface PolaroidProps {
	src: string;
	alt: string;
	className?: string;
}

const Polaroid: FC<PolaroidProps> = ({ src, alt, className }) => {
	return (
		<PolaroidFrame className={className}>
			<img src={src} alt={alt} className="object-cover w-[300px] h-[300px]" />
		</PolaroidFrame>
	);
};

interface PolaroidFrameProps {
	children: React.ReactNode;
	className?: string;
}

export const PolaroidFrame: FC<PolaroidFrameProps> = ({
	children,
	className,
}) => {
	return (
		<div
			className={cn(
				"bg-white p-4 shadow-lg transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-300",
				className,
			)}
		>
			{children}
			<div className="mt-2 text-center text-gray-700 font-handwriting font-semibold text-2xl">
				Flascherazzi Moment
			</div>
		</div>
	);
};

export default Polaroid;
