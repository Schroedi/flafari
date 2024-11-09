import { useState, useCallback, useRef } from "react";

interface UseCameraReturn {
	videoRef: React.RefObject<HTMLVideoElement>;
	canvasRef: React.RefObject<HTMLCanvasElement>;
	stream: MediaStream | null;
	isStreamActive: boolean;
	currentFacingMode: "user" | "environment";
	startCamera: (facingMode?: "user" | "environment") => Promise<void>;
	stopCamera: () => void;
	takePicture: (facingMode?: "user" | "environment") => Promise<string>;
	error: string | null;
	capturedImage: string | null;
}

export const useCamera = (): UseCameraReturn => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isStreamActive, setIsStreamActive] = useState(false);
	const [currentFacingMode, setCurrentFacingMode] = useState<
		"user" | "environment"
	>("environment");
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const stopCamera = useCallback(() => {
		if (stream) {
			for (const track of stream.getTracks()) {
				console.log("stopping track", track);
				track.stop();
				stream.removeTrack(track);
			}
			if (videoRef.current) {
				console.log("pausing video");
				videoRef.current.pause();
				videoRef.current.src = "";
				videoRef.current.srcObject = null;
			}
			setStream(null);
			setIsStreamActive(false);
		}
	}, [stream]);

	const startCamera = useCallback(
		async (facingMode: "user" | "environment" = "environment") => {
			try {
				if (stream) {
					stopCamera();
				}

				const newStream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode,
					},
				});

				if (videoRef.current) {
					videoRef.current.srcObject = newStream;
				}

				setStream(newStream);
				setCurrentFacingMode(facingMode);
				setIsStreamActive(true);
				setError(null);
			} catch (err) {
				setError(
					`Error accessing camera: ${err instanceof Error ? err.message : String(err)}`,
				);
				setIsStreamActive(false);
			}
		},
		[stream, stopCamera],
	);

	const takePicture = useCallback(
		async (
			facingMode: "user" | "environment" = "environment",
		): Promise<string> => {
			const canvas = canvasRef.current;
			const video = videoRef.current;
			if (!video || !canvas) {
				throw new Error(
					`Video or canvas reference not available: ${video} ${canvas}`,
				);
			}

			if (facingMode !== currentFacingMode) {
				await startCamera(facingMode);
				// Wait a bit for camera to adjust
				await new Promise((resolve) => setTimeout(resolve, 500));
			}

			return new Promise((resolve, reject) => {
				try {
					// We already checked these refs exist above
					const context = canvas.getContext("2d");

					if (!context) {
						throw new Error("Could not get canvas context");
					}

					// Set canvas dimensions to match video
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;

					// Draw the video frame to the canvas
					context.drawImage(video, 0, 0, canvas.width, canvas.height);

					// Convert the canvas to a data URL
					const photoUrl = canvas.toDataURL("image/jpeg");

					// Save the captured image in state
					setCapturedImage(photoUrl);

					// save the image to local storage
					if (photoUrl) {
						localStorage.setItem(`capturedImage-${facingMode}`, photoUrl);
					}

					resolve(photoUrl);
				} catch (err) {
					reject(
						`Error taking picture: ${err instanceof Error ? err.message : String(err)}`,
					);
				}
			});
		},
		[currentFacingMode, startCamera],
	);

	return {
		videoRef,
		canvasRef,
		stream,
		isStreamActive,
		currentFacingMode,
		startCamera,
		stopCamera,
		takePicture,
		error,
		capturedImage,
	};
};
