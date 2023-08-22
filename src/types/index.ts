import React from "react";

export interface ILanguageOptions {
  code: string;
  image: React.ReactNode;
  id: string;
}
export interface ILinks {
  id: string;
  linkName: string;
  linkUrl: string;
}
export interface ISocialLinks {
  id: string;
  linkName: string;
  linkUrl: string;
  linkIcon: React.ReactNode;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginResult {
  success: boolean;
  message: string;
  result: {
    token: string;
    user_id: string;
  };
}
