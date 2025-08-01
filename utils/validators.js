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

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateProduct = (data) => {
  const errors = {};
  console.log(data)
  // Title validation
  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  } else if (data.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (data.title.length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  // Description validation
  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required";
  } else if (data.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (data.description.length > 1000) {
    errors.description = "Description cannot exceed 1000 characters";
  }

  // Category validation
  if (!data.category) {
    errors.category = "Category is required";
  } else {
    let categoryId;

    // Extract ID based on input type
    if (typeof data.category === "string") {
      categoryId = data.category; // For add operations
    } else if (data.category && typeof data.category === "object") {
      categoryId = data.category._id; // For edit operations
    }
    if (!categoryId) {
      errors.category = "Invalid category format";
    } else if (!/^[0-9a-fA-F]{24}$/.test(categoryId)) {
      errors.category = "Invalid category ID format";
    }
  }
  // Price validation
  if (!data.price) {
    errors.price = "Price is required";
  } else if (isNaN(data.price)) {
    errors.price = "Price must be a number";
  } else if (parseFloat(data.price) <= 0) {
    errors.price = "Price must be greater than 0";
  }

  // Stock validation
  if (!data.stock) {
    errors.stock = "Stock quantity is required";
  } else if (isNaN(data.stock)) {
    errors.stock = "Stock must be a number";
  } else if (parseInt(data.stock) < 0) {
    errors.stock = "Stock cannot be negative";
  }

  // Images validation
 if (!data.images || !Array.isArray(data.images)) {
    errors.images = "Images must be an array";
  } else {
    if (data.images.length < 3) {
      errors.images = "At least 3 images are required";
    }

    // Validate each image URL or allow placeholders
    data.images.forEach((img, index) => {
      if (!isValidUrl(img)) {
        errors[`images[${index}]`] = "Invalid image URL or placeholder format";
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
