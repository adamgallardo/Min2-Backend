"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = exports.ValidateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const Logging_1 = __importDefault(require("../library/Logging"));
const ValidateSchema = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            Logging_1.default.error(error);
            return res.status(422).json({ error });
        }
    });
};
exports.ValidateSchema = ValidateSchema;
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            asignatura: joi_1.default.array().items(joi_1.default.string().length(24).hex())
        }),
        update: joi_1.default.object({
            name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
            email: joi_1.default.string().email().required()
        })
    },
    schedule: {
        create: joi_1.default.object({
            name: joi_1.default.string().required(),
            clase: joi_1.default.string().required(),
            start: joi_1.default.number().required(),
            duration: joi_1.default.number().required()
        }),
        update: joi_1.default.object({
            name: joi_1.default.string().required(),
            clase: joi_1.default.string().required(),
            start: joi_1.default.number().required(),
            duration: joi_1.default.number().required()
        })
    },
    asignatura: {
        create: joi_1.default.object({
            name: joi_1.default.string().required() /* ,
            schedule: Joi.array().required() */
        }),
        update: joi_1.default.object({
            name: joi_1.default.string().required(),
            schedule: joi_1.default.array().required()
        })
    }
};
