import { SettingsContextType } from "@/context/setting";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Dispatch, SetStateAction } from "react";

interface ColumnsNumberProps {
	settings: SettingsContextType;
	setSettings: Dispatch<SetStateAction<SettingsContextType>>;
}

export function ColumnsNumber({ settings, setSettings }: ColumnsNumberProps) {
	return (
		<div className="mx-auto grid w-full max-w-xs gap-3">
			<div className="flex items-center justify-between gap-2">
				<Label htmlFor="slider-demo-columns">Columns</Label>
				<span className="text-sm text-muted-foreground">
					{settings.columnsNumber}
				</span>
			</div>
			<Slider
				id="slider-demo-columns"
				value={[settings.columnsNumber]}
				onValueChange={(value) =>
					setSettings({ ...settings, columnsNumber: value[0] })
				}
				min={5}
				max={100}
				step={1}
			/>
		</div>
	);
}
