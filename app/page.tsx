"use client";

import { useContext } from "react";
import { Field } from "@/components/field";
import { Menu } from "@/components/menu";
import { SettingsContext } from "@/context/setting";

export default function Home() {
	const { settings } = useContext(SettingsContext);

	return (
		<main className="flex min-h-screen flex-col ">
			<Menu />
			{}
			<Field settings={settings} />
		</main>
	);
}
