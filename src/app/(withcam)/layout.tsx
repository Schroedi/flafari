"use client";

import { CameraProvider } from "../../contexts/CameraContext";

export default function CameraLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <CameraProvider>{children}</CameraProvider>;
}
