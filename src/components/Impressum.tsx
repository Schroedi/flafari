"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ImpressumDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="link"
					size="sm"
					className=" text-white"
				>
					Impressum
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-h-screen overflow-y-scroll">
				<AlertDialogHeader>
					<AlertDialogTitle>Impressum</AlertDialogTitle>
					<AlertDialogDescription className="space-y-4" asChild>
						<div className="p-4">
							<p>
								Christoph Schröder-Dering
								<br />
								Sophienstraße 9b
								<br />
								21079 Hamburg
							</p>

							<h3 className="font-bold mt-4">Kontakt:</h3>
							<p>E-Mail: flascherazzi@keks.dev</p>

							<h3 className="font-bold mt-4">Hinweis:</h3>
							<p>
								Das Spiel "Flascherazzi" wurde im Rahmen des IGJam#15 Gamejams
								bei InnoGames in Hamburg am 10.11.2024 entwickelt. Das Thema in
								diesem Jahr war „Bottleneck". Alle genannten €-Preise sind rein
								fiktiv und es werden keinerlei realen Verbindlichkeiten
								versprochen. Der Rechtsweg ist ausgeschlossen. Das Spiel
								thematisiert Alkoholismus und dient als Kampagne zur
								Sensibilisierung.
							</p>

							<h3 className="font-bold mt-4">Datenschutz:</h3>
							<p>
								Wir verarbeiten keine personenbezogenen Daten auf unserem
								Server. Alle Datenverarbeitungen erfolgen ausschließlich lokal
								auf dem Endgerät der Nutzenden. Es werden keine Cookies
								verwendet.
								<br />
								<br />
								Sollten Nutzende sich entscheiden, Screenshots oder Inhalte
								dieser Seite zu teilen, geschieht dies immer freiwillig und auf
								eigenen Anlass.
							</p>

							<p className="mt-4">
								Informationen zum Gamejam finden Sie auf igjam.eu, die Seite des
								Spiels ist erreichbar unter{" "}
								<a
									href="https://igjam.eu/jams/igjam-15/990/"
									className="text-blue-600 hover:underline"
								>
									https://igjam.eu/jams/igjam-15/990/
								</a>
								.
							</p>

							<h3 className="font-bold mt-4">Haftungsausschluss:</h3>
							<p>
								Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
								Haftung für die Inhalte externer Links. Für den Inhalt der
								verlinkten Seiten sind ausschließlich deren Betreiber
								verantwortlich.
							</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction className="mx-10">Schließen</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
