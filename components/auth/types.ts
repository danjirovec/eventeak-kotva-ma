type SignUpErrorsStepOne = {
  firstName: string;
  lastName: string;
  placeOfResidence: string;
  birthDate: string;
};

type SignUpErrorsStepTwo = {
  email: string;
  password: string;
  confirmPassword: string;
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

type SetSignUpErrorsStepOne = React.Dispatch<
  React.SetStateAction<{
    firstName: string;
    lastName: string;
    placeOfResidence: string;
    birthDate: string;
  }>
>;

type SetSignUpErrorsStepTwo = React.Dispatch<
  React.SetStateAction<{
    email: string;
    password: string;
    confirmPassword: string;
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
  placeOfResidence?: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
};

type SetForm = React.Dispatch<
  React.SetStateAction<{
    firstName: string;
    lastName: string;
    placeOfResidence?: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: Date;
  }>
>;

type UpdateForm = {
  firstName: string;
  lastName: string;
  placeOfResidence?: string;
  email: string;
};

type SetUpdateForm = React.Dispatch<
  React.SetStateAction<{
    firstName: string;
    lastName: string;
    placeOfResidence?: string;
    email: string;
  }>
>;
