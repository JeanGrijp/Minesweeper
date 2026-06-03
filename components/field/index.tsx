// import type { SettingsContextType } from "@/context/setting";
// import { Area } from "../area";
// import { useMemo } from "react";

// interface FieldProps {
// 	settings: SettingsContextType;
// }

// export function Field({ settings }: FieldProps) {
// 	const cellSize = 35;
// 	const matrix = useMemo(() => {
// 		const nextMatrix = Array.from({ length: settings.rowsNumber }, (_, row) =>
// 			Array.from({ length: settings.columnsNumber }, (_, col) => ({
// 				id: `${row}-${col}`,
// 				value: 0,
// 			})),
// 		);

// 		const bombsPositions = new Set<string>();
// 		while (bombsPositions.size < settings.bombsNumber) {
// 			const row = Math.floor(Math.random() * settings.rowsNumber);
// 			const col = Math.floor(Math.random() * settings.columnsNumber);
// 			bombsPositions.add(`${row},${col}`);
// 		}

// 		bombsPositions.forEach((position) => {
// 			const [row, col] = position.split(",").map(Number);
// 			nextMatrix[row][col].value = -1;
// 		});

// 		return nextMatrix;
// 	}, [settings.bombsNumber, settings.columnsNumber, settings.rowsNumber]);

// 	// Calculate the numbers for the cells adjacent to bombs
// 	matrix.forEach((row, rowIndex) => {
// 		row.forEach((cell, colIndex) => {
// 			if (cell.value === -1) {
// 				const adjacentCells = getAdjacentCells(matrix, rowIndex, colIndex);
// 				adjacentCells.forEach((adjacentCell) => {
// 					if (adjacentCell.value !== -1) {
// 						adjacentCell.value++;
// 					}
// 				});
// 			}
// 		});
// 	});

// 	console.log(matrix);

// 	return (
// 		<section
// 			className="field grid w-fit gap-0"
// 			style={{
// 				gridTemplateColumns: `repeat(${settings.columnsNumber}, ${cellSize}px)`,
// 			}}
// 		>
// 			{matrix.map((row) =>
// 				row.map(({ id, value }) => (
// 					<Area key={id} size={cellSize} value={value} />
// 				)),
// 			)}
// 		</section>
// 	);
// }

// function getAdjacentCells(
// 	matrix: { id: string; value: number }[][],
// 	row: number,
// 	col: number,
// ) {
// 	const totalRows = matrix.length;
// 	if (totalRows === 0) return [];
// 	const totalCols = matrix[0].length;

// 	const adjacentCells = [];

// 	const directions = [
// 		[-1, -1],
// 		[-1, 0],
// 		[-1, 1],
// 		[0, -1],
// 		[0, 1],
// 		[1, -1],
// 		[1, 0],
// 		[1, 1],
// 	];

// 	for (const [dirRow, dirCol] of directions) {
// 		const newRow = row + dirRow;
// 		const newCol = col + dirCol;

// 		const isRowValid = newRow >= 0 && newRow < totalRows;
// 		const isColValid = newCol >= 0 && newCol < totalCols;

// 		if (isRowValid && isColValid) {
// 			adjacentCells.push(matrix[newRow][newCol]);
// 		}
// 	}

// 	return adjacentCells;
// }

"use client";

import type { SettingsContextType } from "@/context/setting";
import { Area } from "../area";
import { useMemo } from "react";

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
				hidden: true,
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
				row.map(({ id, value, hidden }) => (
					<Area key={id} size={cellSize} value={value} hidden={hidden} />
				)),
			)}
		</section>
	);
}

function getAdjacentCells(
	matrix: { id: string; value: number }[][],
	row: number,
	col: number,
) {
	const totalRows = matrix.length;
	if (totalRows === 0) return [];
	const totalCols = matrix[0].length;

	const adjacentCells = [];

	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	for (const [dirRow, dirCol] of directions) {
		const newRow = row + dirRow;
		const newCol = col + dirCol;

		const isRowValid = newRow >= 0 && newRow < totalRows;
		const isColValid = newCol >= 0 && newCol < totalCols;

		if (isRowValid && isColValid) {
			adjacentCells.push(matrix[newRow][newCol]);
		}
	}

	return adjacentCells;
}
