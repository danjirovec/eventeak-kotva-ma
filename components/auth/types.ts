type SignUpErrors = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  placeOfBirth: string;
  birthDate: string;
};

type EmailErrors = {
  email: string;
};

type ResetPasswordErrors = {
  password: string;
  confirmPassword: string;
};

type KeyValueObject = {
  [key: string]: string | Date | number;
};

type SetSignUpErrors = React.Dispatch<
  React.SetStateAction<{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    placeOfBirth: string;
    birthDate: string;
  }>
>;

type SetEmailErrors = React.Dispatch<
  React.SetStateAction<{
    email: string;
  }>
>;

type SetResetPasswordErrors = React.Dispatch<
  React.SetStateAction<{
    password: string;
    confirmPassword: string;
  }>
>;

type Form = {
  firstName: string;
  lastName: string;
  placeOfBirth?: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
};

type SetForm = React.Dispatch<
  React.SetStateAction<{
    firstName: string;
    lastName: string;
    placeOfBirth?: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: Date;
  }>
>;
