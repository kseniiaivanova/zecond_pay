// src/lib/validation.ts

export const sanitize = (str = ''): string =>
  str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').trim()

export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidName = (name: string): boolean => /^[A-Za-zÀ-ÖØ-öø-ÿ \-]{1,60}$/.test(name)
