"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || "Error interno" });
};
exports.errorHandler = errorHandler;
