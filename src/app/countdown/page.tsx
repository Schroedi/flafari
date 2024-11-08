"use client";

import SelfieCounter from "../components/SelfieCounter";

export default function Countdown() {
	const router = require("next/navigation").useRouter();
	return (
		<SelfieCounter
			onComplete={() => {
				router.push("/win");
			}}
		/>
	);
}
