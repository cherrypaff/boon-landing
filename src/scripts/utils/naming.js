export const camelToSnake = s => s.replace(/([a-z])([A-Z]+)/g, '$1_$2');
export const camelToLowerSnake = s => camelToSnake(s).toLowerCase();
export const camelToUpperSnake = s => camelToSnake(s).toUpperCase();
// Using camel to snake for exclude camelCase parts from converting to lower case
export const snakeToCamel =
    s => camelToSnake(s).toLowerCase().replace(/[_-](.)/g, (match, group) => group.toUpperCase());

export const isPureObject = val => {
    if (typeof val !== 'object' || val === null) return false;
    return val.constructor === Object;
};

const objectToCase = convertingFunc => (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => objectToCase(convertingFunc)(item));
    }

    if (!isPureObject(obj)) {
        return obj;
    }

    return Object.keys(obj).reduce((memo, key) => {
        const currentObj = obj[key];
        const currentKey = convertingFunc(key);
        return {
            ...memo,
            [currentKey]: objectToCase(convertingFunc)(currentObj),
        }
    }, {})
};

export const objectToCamel = objectToCase(snakeToCamel);
export const objectToLowerSnake = objectToCase(camelToLowerSnake);
export const objectToUpperSnake = objectToCase(camelToUpperSnake);
