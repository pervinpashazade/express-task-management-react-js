export const getArrayObj = (array, objId) => {
    if (!objId) return null;
    return array.find(x => x.id === objId);
};