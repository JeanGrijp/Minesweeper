"use client";

import { useMemo } from "react";
import type { SettingsContextType } from "@/context/setting";
import { getAdjacentCells } from "@/utils/calAdjacents";
import { Area } from "../area";

interface FieldProps {
	settings: SettingsContextType;
}

export function Field({ settings }: FieldProps) {
	const cellSize = 35;

	// Toda a lógica de inicialização agora está protegida dentro do useMemo
	const matrix = useMemo(() => {
		// 1. Criação da matriz limpa
		const nextMatrix = Array.from({ length: settings.rowsNumber }, (_, row) =>
			Array.from({ length: settings.columnsNumber }, (_, col) => ({
				id: `${row}-${col}`,
				value: 0,
				// hidden: true,
			})),
		);

		// 2. Sorteio de posições únicas para as bombas
		const bombsPositions = new Set<string>();
		while (bombsPositions.size < settings.bombsNumber) {
			const row = Math.floor(Math.random() * settings.rowsNumber);
			const col = Math.floor(Math.random() * settings.columnsNumber);
			bombsPositions.add(`${row},${col}`);
		}

		// 3. Aplicação das bombas na matriz
		bombsPositions.forEach((position) => {
			const [row, col] = position.split(",").map(Number);
			nextMatrix[row][col].value = -1;
		});

		// 4. Cálculo dos números adjacentes (movido para dentro do memo)
		nextMatrix.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				if (cell.value === -1) {
					const adjacentCells = getAdjacentCells(
						nextMatrix,
						rowIndex,
						colIndex,
					);
					adjacentCells.forEach((adjacentCell) => {
						if (adjacentCell.value !== -1) {
							adjacentCell.value++;
						}
					});
				}
			});
		});

		return nextMatrix;
	}, [settings.bombsNumber, settings.columnsNumber, settings.rowsNumber]);

	return (
		<section
			className="field grid w-fit gap-0"
			style={{
				gridTemplateColumns: `repeat(${settings.columnsNumber}, ${cellSize}px)`,
			}}
		>
			{matrix.map((row) =>
				row.map(({ id, value }) => (
					<Area key={id} size={cellSize} value={value} hidden />
				)),
			)}
		</section>
	);
}
