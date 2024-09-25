import { getToday } from '@/lib/getToday';

export const validateEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!re.test(email.toLowerCase())) {
    return 'Invalid email address';
  }
  return undefined;
};

export const validatePassword = (password: string) => {
  if (!/^.{8,}$/.test(password)) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }

  if (!/[!@#$%&*()?{}<>]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  return undefined;
};

export const validateString = (str: string) => {
  if (/[^a-zA-Z\u00C0-\u017F]/.test(str)) {
    return 'Field must contain only letters';
  }
  return undefined;
};

export const validateDate = (date: Date) => {
  if (date >= new Date()) {
    return 'Birth date must not be today or later';
  }
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return undefined;
};

export const validateErrors = (errors: KeyValueObject) => {
  for (let err in errors) {
    if (errors[err] !== '') {
      return false;
    }
  }
  return true;
};

export const validateRequiredStepOne = (form: KeyValueObject) => {
  let valid = true;
  const { email, password, confirmPassword, placeOfBirth, date, ...rest } =
    form;
  for (let field in rest) {
    if (form[field] === '') {
      valid = false;
    }
  }
  if (form.birthDate >= getToday()) {
    valid = false;
  }
  return valid;
};

export const validateRequiredStepTwo = (form: KeyValueObject) => {
  const { date, placeOfBirth, firstName, lastName, ...rest } = form;
  for (let field in rest) {
    if (form[field] === '') {
      return false;
    }
  }
  return true;
};

export const validateRequiredLogin = (form: KeyValueObject) => {
  if (form.email === '' || form.password === '') {
    return false;
  }
  return true;
};

export const validateRequiredReset = (form: KeyValueObject) => {
  if (form.confirmPassword === '' || form.password === '') {
    return false;
  }
  return true;
};

export const validateRequiredEmail = (form: KeyValueObject) => {
  if (form.email === '') {
    return false;
  }
  return true;
};
