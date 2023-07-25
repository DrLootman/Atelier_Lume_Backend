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
const client_1 = require("@prisma/client");
const admin_model_1 = __importDefault(require("../models/admin.model"));
const prisma = new client_1.PrismaClient();
const { admin: Admin } = prisma;
exports.default = {
    // Method to get every registered admin :
    // getAll(req: Request, res: Response) {
    //   Admin.findMany()
    //     .then((users) => {
    //       res.status(200).send(users)
    //     })
    //     .catch((err) => {
    //       res.status(500).send({
    //         success: false,
    //         message: err.message || "Some error occured when retrieving user admin "
    //       })
    //     })
    // },
    // // Method to get an admin by Id
    // getById(req: Request, res: Response) {
    //   const { id } = req.params;
    //   Admin.findUnique({
    //     where: {
    //       id: parseInt(id)
    //     }
    //   })
    //     .then((user) => {
    //       if (user) {
    //         res.status(200).send(user)
    //       } else {
    //         res.status(404).send({
    //           success: false,
    //           message: `Cannot find user with id = ${id}`
    //         })
    //       }
    //     })
    //     .catch((err) => {
    //       res.status(500).send({
    //         success: false,
    //         message: err.message || `Some error occured when retrieving user with id = ${id}`
    //       })
    //     })
    // },
    // // Method to update admin informations
    // updateAdmin(req: Request, res: Response) {
    //   const { id } = req.params;
    //   const { email } = req.body;
    //   Admin.update({
    //     where: {
    //       id: parseInt(id)
    //     },
    //     data: {
    //       email: email
    //     }
    //   })
    //     .then(() => {
    //       res.status(200).send({
    //         message: "User was updated successfully"
    //       })
    //     })
    //     .catch((err) => {
    //       res.status(500).send({
    //         success: false,
    //         message: err.message || `Some error occured when updating user admin with id = ${id}`
    //       })
    //     })
    // },
    // // Method to create a new user
    // deleteAdmin(req: Request, res: Response) {
    //   const { id } = req.params;
    //   Admin.delete({
    //     where: {
    //       id: parseInt(id)
    //     }
    //   })
    //     .then(() => {
    //       res.status(200).send({
    //         message: "User was deleted successfully"
    //       })
    //     })
    //     .catch((err) => {
    //       res.status(500).send({
    //         success: false,
    //         message: err.message || `Some error occured when deleting user admin with id = ${id}`
    //       })
    //     })
    // },
    // Method to get all administrators
    getAllAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminModel = new admin_model_1.default();
                const allAdmin = yield adminModel.getAll();
                res.status(200).send(allAdmin);
            }
            catch (err) {
                console.error(err);
            }
        });
    },
    // Method to create a new admin
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminModel = new admin_model_1.default();
                const newAdmin = yield adminModel.createAdmin(req.body.email, req.body.password);
                res.status(201).send(newAdmin);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    },
    // async deleteAdmin(req: Request, res: Response) {
    //   try {
    //     const deleteModel = new AdminModel()
    //   }
    // }
};
