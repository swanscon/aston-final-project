export const sortByName = (arrayOfObjects) => {
    arrayOfObjects.sort((a, b) => {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1; //nameA comes first
        }
        if (nameA > nameB) {
            return 1; // nameB comes first
        }
        return 0;  // names must be equal
    });
    return arrayOfObjects;
}