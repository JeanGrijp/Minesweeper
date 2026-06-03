"use client";

import { SettingsContextType } from "@/context/setting";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Dispatch, SetStateAction } from "react";

interface BombsNumberProps {
	settings: SettingsContextType;
	setSettings: Dispatch<SetStateAction<SettingsContextType>>;
}

export function BombsNumber({ settings, setSettings }: BombsNumberProps) {
	return (
		<div className="mx-auto grid w-full max-w-xs gap-3 bg--card">
			<div className="flex items-center justify-between gap-2">
				<Label htmlFor="slider-demo-bombs">Bombs</Label>
				<span className="text-sm text-muted-foreground">
					{settings.bombsNumber}
				</span>
			</div>
			<Slider
				id="slider-demo-bombs"
				value={[settings.bombsNumber]}
				onValueChange={(value) =>
					setSettings({ ...settings, bombsNumber: value[0] })
				}
				min={5}
				max={300}
				step={1}
			/>
		</div>
	);
}
