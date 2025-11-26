"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegex = exports.phoneRegex = exports.emailRegex = void 0;
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.phoneRegex = /^\+\d{1,3}\s?\d{10}$/;
exports.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,12}$/;
