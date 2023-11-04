"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
const sendEmail = (req, res) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string()
            .alphanum()
            .min(3)
            .max(15)
            .required(),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr', 'gmail', 'hotmail'] } }),
        message: joi_1.default.string()
            .max(500)
            .required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "Données invalides. Veuillez vérifier votre saisie." });
    }
    const { name, email, message } = req.body;
    const transporter = nodemailer_1.default.createTransport({
        service: "Gmail",
        auth: {
            user: "nicolas.michlll@gmail.com",
            pass: `${process.env.GMAIL_PASS}`
        },
    });
    const mailOptions = {
        from: email,
        to: 'latelierlume@gmail.com',
        priority: 'high',
        subject: `${name} souhaite te contacter !`,
        html: `
      <div style="border: 1px solid #ccc; padding: 20px; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #007bff;">Message écrit par ${name}</h2>
        <p>${message}</p>
      </div>
    `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ error: "Une erreur est survenue lors de l\'envoi du message." });
        }
        else {
            res.json({ success: "Votre message a été envoyé avec succès." });
        }
    });
};
exports.sendEmail = sendEmail;
