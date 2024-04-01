exports.checkEmailExistence = async (email, collectionName) => {
    const existingTeacher = await collectionName.findOne({ email });
    return existingTeacher;
};

exports.checkUsernameExistence = async (username, collectionName) => {
    const existingTeacher = await collectionName.findOne({ username });
    return existingTeacher;
};
