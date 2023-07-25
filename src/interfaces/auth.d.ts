import { Response } from "express";

export interface EmailI {
  email: string;
}

export interface PayloadI {
  id: number;
  email: string;
  password: string | undefined;
}

export interface TokenI {
  token: string;
}