export const generateId = (collection) => {
    if(!collection || collection.length === 0) {
        return 1;
    }
    const lastId = collection.reduce((max, item) => Math.max(max, item.id))
    return lastId + 1;
}