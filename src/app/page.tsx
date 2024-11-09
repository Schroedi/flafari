"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import FlashyButton from "../components/Startbutton";
import Polaroid from "../components/Polaroid";
import { useRouter } from "next/navigation";

export default function Component() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = 3;

  const router = useRouter();

	const images = Array.from(
		{ length: 10 },
		(_, i) => `/flaschen/flasche${i + 1}.webp`,
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
		}, 3000); // Change slide every 3 seconds

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700 p-8 text-white">
			<div className="text-center space-y-6 mb-8">
				<h1 className="text-6xl font-bold tracking-tighter sm:text-7xl">
					Flascherazzi
				</h1>
				<p className="text-xl font-semibold bg-white text-purple-700 px-4 py-2 rounded-full inline-block transform -rotate-2">
					!Nur ein Versuch
				</p>
			</div>

			<Carousel className="w-full max-w-md">
				<CarouselContent>
					{images.map((src, index) => (
						<CarouselItem key={src} className="flex justify-center">
							<Polaroid src={src} alt={`Slide ${index + 1}`} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<FlashyButton onClick={() => router.push("/cam")} />
		</div>
	);
}
