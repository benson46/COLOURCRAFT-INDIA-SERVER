export const nameRegex = /^[A-Za-z\s]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;

export const isValidName = (name) =>
  typeof name === "string" &&
  name.trim().length >= 3 &&
  nameRegex.test(name.trim());

export const isValidEmail = (email) =>
  typeof email === "string" && emailRegex.test(email.trim());

export const isValidPassword = (password) =>
  typeof password === "string" &&
  password.length >= 6 &&
  password.length <= 30 &&
  passwordRegex.test(password);


export const isValidTitle = (title) => {
  if (!title || typeof title !== "string" || title.trim() === "") {
    return "Title is required.";
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3 || trimmedTitle.length > 50) {
    return "Title must be between 3 and 50 characters.";
  }

  const regex = /^[a-zA-Z0-9\s\-]+$/;
  if (!regex.test(trimmedTitle)) {
    return "Title can only contain letters, numbers, spaces, and dashes.";
  }

  return null;
};