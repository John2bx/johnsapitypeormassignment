"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./games/entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const moves = (board1, board2) => board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length;
let MainController = class MainController {
    async allgames() {
        const games = await entity_1.default.find();
        return { games };
    }
    createGame(game) {
        const colors = ['red', 'blue', 'green', 'yellow', 'magenta'];
        game.color = colors[Math.floor(Math.random() * colors.length)];
        const initialboard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];
        game.board = initialboard;
        return game.save();
    }
    async updateGame(id, update) {
        const game = await entity_1.default.findOne(id);
        if (!game) {
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        }
        else if (update.board && moves(update.board, game.board) > 1) {
            return routing_controllers_1.BadRequestError;
        }
        else {
            class_validator_1.validate(typeorm_1.AfterUpdate);
            return entity_1.default.merge(game, update).save();
        }
    }
};
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "allgames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Put('/games/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "updateGame", null);
MainController = __decorate([
    routing_controllers_1.Controller()
], MainController);
exports.default = MainController;
//# sourceMappingURL=controller.js.map