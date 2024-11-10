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

export default function TimoDialog() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					type="button"
					className=" bg-white text-purple-700 px-4 py-2 rounded-full inline-block transform -rotate-2"
				>
					Überleben
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-h-screen overflow-y-scroll">
				<AlertDialogHeader>
					<AlertDialogTitle>Überleben</AlertDialogTitle>
					<AlertDialogDescription className="space-y-4" asChild>
						<div className="p-4">							

							<img src="/christian.jpg" alt="Christian" className="w-full h-auto rounded-lg mb-4" />
							<p>								
								Wenn du das Wort „Flasche“ mit Alkohol assoziierst und gerade dein Bier fotografiert hast, bist auch du in Gefahr. 
								Wir möchten mit diesem Spiel ein Zeichen setzen gegen übermäßigen Alkoholkonsum.

								Im Andenken an Christian (*1968 †9.11.2024), den der Alkohol gestern viel zu früh von uns gerissen hat. Und für den wir die Nacht auf der Intensivstation statt beim Gamejam verbracht haben. 

								Alkoholismus ist ein Bossfight ohne Kampf. 
								Eine direkte, unfaire Niederlage. 
								Deine einzige Chance zum Sieg ist es, nicht zu spielen.
							</p>

							
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction className="mx-10">Schließen</AlertDialogAction>
					<AlertDialogAction asChild>
						<a href="https://www.sucht-und-drogen-hotline.de/" target="_blank" rel="noopener noreferrer" className="mx-10">
							Hilfe erhalten
						</a>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
