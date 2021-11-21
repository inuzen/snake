export const generateGrid = (width: number, height: number) => {
    const grid = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            grid.push({ x, y });
        }
    }
    return grid;
};
