const getStateFromPropsData = (propsData, emtyState) => {
    const keys = Object.keys(propsData);
    let noEmptyPropsData = {};
    keys.forEach(x => {
        if (propsData[x] !== null)
            noEmptyPropsData[x] = propsData[x];
    });
    return Object.assign({ ...emtyState }, noEmptyPropsData);
};

export { getStateFromPropsData };