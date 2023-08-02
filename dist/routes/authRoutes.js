"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const tsyringe_1 = require("tsyringe");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authController = tsyringe_1.container.resolve(authController_1.AuthController);
    }
    register(app) {
        this.router.post('/login', this.authController.login);
        app.use('/auth', this.router);
    }
}
exports.AuthRoutes = AuthRoutes;
