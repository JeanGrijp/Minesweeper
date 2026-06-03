export function getAdjacentCells(
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
