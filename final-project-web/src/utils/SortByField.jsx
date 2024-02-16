export const sortByField = (arrayOfObjects, field, asc) => {
    arrayOfObjects.sort((a, b) => {
        const getField = (obj, path) => {
            const keys = path.split('.');
            let result = obj;
            for (let key of keys) {
                if (result[key] !== undefined) {
                    result = result[key];
                } else {
                    return undefined;
                }
            }
            return result;
        };
        let fieldA = getField(a, field) ? getField(a, field).toString().toUpperCase() : '';
        let fieldB = getField(b, field) ? getField(b, field).toString().toUpperCase() : '';

        if(asc) {
            if (fieldA < fieldB) {
                return -1;
            }
            if (fieldA > fieldB) {
                return 1;
            }
        } else {
            if (fieldA > fieldB) {
                return -1;
            }
            if (fieldA < fieldB) {
                return 1;
            }
        }
        return 0;
    });
    return arrayOfObjects;
}