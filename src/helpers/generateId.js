const { v1: uuidv1 } = require("uuid");

const generateId = () => uuidv1();

exports.generateId = generateId;
