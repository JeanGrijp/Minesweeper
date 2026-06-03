"use client";

import { Area } from "@/components/area";
import { Field } from "@/components/field";
import { Menu } from "@/components/menu";
import { SettingsContext } from "@/context/setting";
import { useContext } from "react";

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
