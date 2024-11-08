import React from "react";
import { Cog, FlipHorizontal, Image, Zap } from "lucide-react";

export default function Camera() {
	return (
		<div className="relative flex items-center justify-center w-full h-screen bg-black text-white overflow-hidden">
			{/* Camera View */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500">
				{/* This div simulates the camera view */}
			</div>

			{/* Top Controls */}
			<div className="absolute top-4 left-0 right-0 flex justify-between px-6">
				<button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
					<Zap className="w-6 h-6" />
				</button>
				<button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
					<Cog className="w-6 h-6" />
				</button>
			</div>

			{/* Bottom Controls */}
			<div className="absolute bottom-8 left-0 right-0">
				<div className="flex justify-between items-center px-8">
					<button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
						<Image className="w-8 h-8" />
					</button>
					<button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
						<div className="w-16 h-16 rounded-full bg-white"></div>
					</button>
					<button className="p-2 rounded-full bg-black/30 backdrop-blur-md">
						<FlipHorizontal className="w-8 h-8" />
					</button>
				</div>
				<div className="mt-6 flex justify-center">
					<div className="text-center px-4 py-1 rounded-full bg-black/30 backdrop-blur-md">
						<span className="font-medium">Photo</span>
					</div>
				</div>
			</div>
		</div>
	);
}
