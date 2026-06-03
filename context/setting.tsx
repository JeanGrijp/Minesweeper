"use client";

import { createContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";

enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export type SettingsContextType = {
	columnsNumber: number;

	rowsNumber: number;

	difficulty: Difficulty;

	bombsNumber: number;
};

interface ISettingsContextProvider {
	settings: SettingsContextType;
	setSettings: Dispatch<SetStateAction<SettingsContextType>>;
}

export const SettingsContext = createContext<ISettingsContextProvider>({
	settings: {
		columnsNumber: 49,
		rowsNumber: 25,
		bombsNumber: 200,
		difficulty: Difficulty.EASY,
	},
	setSettings: (() => {}) as Dispatch<SetStateAction<SettingsContextType>>,
});

export const SettingsContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [settings, setSettings] = useState<SettingsContextType>({
		columnsNumber: 49,
		rowsNumber: 25,
		difficulty: Difficulty.EASY,
		bombsNumber: 200,
	});
	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};
