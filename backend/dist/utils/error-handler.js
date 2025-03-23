"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErroresControlados = void 0;
class ErroresControlados extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ErroresControlados = ErroresControlados;
