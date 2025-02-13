export const emailValidator = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isValid = regex.test(email);

  return isValid;
};

export const nameValidator = (name: string) => {
  if (name.length > 0 && name.length >= 3) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidator = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~])[A-Za-z\d@$!%*?&#~]{8,}$/;

  const isValid = regex.test(password);

  return isValid;
};
