"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FlashyButton from "./Startbutton";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function ImpressumDialog() {
	const router = useRouter();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<FlashyButton />
			</AlertDialogTrigger>
			<AlertDialogContent className="">
				<AlertDialogHeader>
					<AlertDialogTitle>Kamera Zugriff</AlertDialogTitle>
					<AlertDialogDescription className="" asChild>
						<div className="">
							<div className="hidden md:block">
								<p>Dieses Spiel funktioniert nur auf dem Handy.</p>
								<QRCode
									className="w-full h-auto pt-4"
									value="https://flascherazzi.de"
								/>
							</div>
							<div className="md:hidden">
								<p>
									Um das Spiel zu spielen, benötigen wir Zugriff auf die Kamera
									des Geräts.
								</p>
								<h3 className="font-bold mt-4">
									Alle Daten werden lokal gespeichert!
								</h3>
								<p>
									Die Daten werden ausschließlich lokal auf deinem Gerät
									gespeichert und nicht an uns oder andere übertragen.
								</p>
							</div>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="mx-10">Zurück</AlertDialogCancel>
					<AlertDialogAction
						className="mx-10 md:hidden"
						onClick={() => router.push("/cam")}
					>
						Los geht's!
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
