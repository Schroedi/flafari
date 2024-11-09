"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import FlashyButton from "../components/Startbutton";
import Polaroid from "../components/Polaroid";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";

export default function Component() {
	const router = useRouter();

	
	const images = Array.from(
		{ length: 10 },
		(_, i) => `/flaschen/flasche${i + 1}.webp`,
	);
	const bottleData = [
		{ comment: "Bromance <3", score: 3500 },
		{ comment: "Cool!", score: 640 },
		{ comment: "Tatted", score: 5300 },
		{ comment: "Schicker Hals", score: 1920 },
		{ comment: "Sportlich", score: 6001 },
		{ comment: "Gruppenfoto", score: 42 },
		{ comment: "Echt Scharf", score: 7499 },
		{ comment: "Mild & Wild", score: 2580 },
		{ comment: "Chillout", score: 4200 },
		{ comment: "Sauber.", score: 6000 },
		{ comment: "Größte Flasche ever.", score: 9000 }
	];





	return (
		<div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700 p-8 text-white">
			<div className="text-center space-y-6 mb-8">
				<h1 className="text-6xl font-bold tracking-tighter sm:text-7xl">
					Flascherazzi
				</h1>
				{/* <p className="text-xl font-semibold bg-white text-purple-700 px-4 py-2 rounded-full inline-block transform -rotate-2">
					!Nur ein Versuch
				</p> */}
			</div>

			<Carousel
				className="w-full max-w-md"
				plugins={[
					Autoplay({
						delay: 2000,
					}),
				]}
			>
				<CarouselContent>
					{images.map((src, index) => (
						<CarouselItem key={src} className="flex justify-center">
							<Polaroid 
								src={src}
								alt={`Slide ${index + 1}`}								
								comment={bottleData[index].comment}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<div className="flex flex-col items-center  pb-16">
				<p className="text-center mb-4 text-balance text-lg">
					Du hast nun die exklusive Chance, den perfekten Schnappschuss zu
					landen.
				</p>
				<FlashyButton onClick={() => router.push("/cam")} />
			</div>
		</div>
	);
}
