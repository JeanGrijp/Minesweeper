"use client";

import React, { useState, memo } from "react";
import { Button } from "../ui/button";
import { Bomb } from "lucide-react";

interface AreaProps {
	children?: React.ReactNode;
	size?: number;
	value?: number;
	hidden?: boolean;
	pressed?: boolean;
	className?: string;
}

function AreaComponent({
	children,
	size = 48,
	value,
	hidden = false,
	pressed = false,
	className,
}: AreaProps) {
	const [isPressed, setIsPressed] = useState(false);
	const isActive = pressed || isPressed;
	const content = children ?? value ?? null;

	return (
		<Button
			type="button"
			data-pressed={isActive}
			className={`area ${isActive ? "area--pressed" : ""} ${
				hidden ? "area--hidden" : "area--revealed"
			} ${
				value && typeof value === "number" && value > 0
					? `area--num-${value}`
					: ""
			} ${className ?? ""}`.trim()}
			onPointerDown={() => setIsPressed(true)}
			onPointerUp={() => setIsPressed(false)}
			onPointerCancel={() => setIsPressed(false)}
			onPointerLeave={() => setIsPressed(false)}
			style={{ width: size, height: size }}
		>
			{content !== null && content !== 0 && content !== -1 ? (
				<span className="area__content">{hidden ? null : content}</span>
			) : null}
			{content === 0 && !hidden ? (
				<span className="area__content area__content--empty" />
			) : null}
			{content === -1 ? (
				<span className="area__content area__content--bomb ">
					{hidden ? null : <Bomb color="red" />}
				</span>
			) : null}
		</Button>
	);
}

export const Area = memo(AreaComponent);
