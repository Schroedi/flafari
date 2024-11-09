"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useCamera } from "../hooks/useCamera";

// Define the context type using the existing UseCameraReturn interface
type CameraContextType = ReturnType<typeof useCamera>;

// Create the context
const CameraContext = createContext<CameraContextType | null>(null);

// Create the provider component
export function CameraProvider({ children }: { children: ReactNode }) {
	const cameraState = useCamera();

	// on unmount, stop the camera
	useEffect(() => {
		return () => {
			cameraState.stopCamera();
		};
	}, []);

	return (
		<CameraContext.Provider value={cameraState}>
			<canvas ref={cameraState.canvasRef} className="hidden" />
			{children}
		</CameraContext.Provider>
	);
}

// Create a custom hook to use the camera context
export function useCameraContext() {
	const context = useContext(CameraContext);
	if (!context) {
		throw new Error("useCameraContext must be used within a CameraProvider");
	}
	return context;
}
