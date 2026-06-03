import { SettingsContextType } from "@/context/setting";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Dispatch, SetStateAction } from "react";

interface RowsNumberProps {
	settings: SettingsContextType;
	setSettings: Dispatch<SetStateAction<SettingsContextType>>;
}

export function RowsNumber({ settings, setSettings }: RowsNumberProps) {
	return (
		<div className="mx-auto grid w-full max-w-xs gap-3">
			<div className="flex items-center justify-between gap-2">
				<Label htmlFor="slider-demo-rows">Rows</Label>
				<span className="text-sm text-muted-foreground">
					{settings.rowsNumber}
				</span>
			</div>
			<Slider
				id="slider-demo-rows"
				value={[settings.rowsNumber]}
				onValueChange={(value) =>
					setSettings({ ...settings, rowsNumber: value[0] })
				}
				min={5}
				max={100}
				step={1}
			/>
		</div>
	);
}
