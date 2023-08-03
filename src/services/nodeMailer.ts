import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import Joi from "joi";
import { MailOptionsI, nodeMailerBodyI } from "../interfaces/interfaces";

dotenv.config();

export const sendEmail = (req: Request, res: Response) => {
  const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(15)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'gmail', 'hotmail'] } }),

    message: Joi.string()
        .max(500)
        .required(),
})

  const { error, value }: Joi.ValidationResult = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: "Données invalides. Veuillez vérifier votre saisie." });
  }

  const { name, email, message }: nodeMailerBodyI = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nicolas.michlll@gmail.com",
      pass: `${process.env.GMAIL_PASS}`
    },
  });

  const mailOptions: MailOptionsI = {
    from: email,
    to: 'nicolas_m_44@hotmail.fr',
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
    } else {
      res.json({ success: "Votre message a été envoyé avec succès." });
    }
  });
};