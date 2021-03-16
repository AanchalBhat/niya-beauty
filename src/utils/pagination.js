export function calculateNewoffsetOnPageChange(currentPage,limit) {
    const newOffset = (currentPage - 1) * limit
    setOffset(newOffset)
}