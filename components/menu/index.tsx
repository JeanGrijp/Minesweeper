"use client";

import { SettingsContext } from "@/context/setting";
import { useContext } from "react";

import { ColumnsNumber } from "./columnsNumber";
import { RowsNumber } from "./rowsNumber";
import { BombsNumber } from "./bombsNumber copy";

export function Menu() {
	const listItems = ["New Game"];

	const { settings, setSettings } = useContext(SettingsContext);

	return (
		<nav className="menu p-4 rounded-md shadow-md">
			<nav className="menu__nav mb-2 flex gap-5">
				{listItems.map((item) => (
					<div key={item} className="menu-item p-2 cursor-pointer  rounded-md">
						{item}
					</div>
				))}
				<div className="menu-item p-2 cursor-pointer  rounded-md">
					{settings.difficulty}
				</div>

				<ColumnsNumber settings={settings} setSettings={setSettings} />
				<RowsNumber settings={settings} setSettings={setSettings} />
				<BombsNumber settings={settings} setSettings={setSettings} />
			</nav>
		</nav>
	);
}
