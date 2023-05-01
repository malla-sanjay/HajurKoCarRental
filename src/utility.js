//Utility functions that repeate too often
export const isAnyInputEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key].trim() === "") {
      return true;
    }
  }
  return false;
};

export const base64ToImage = (base64String) => {
  // Create an Image object
  const image = new Image();

  // Set the source of the image to the base64 string
  image.src = `data:image/png;base64,${base64String}`;

  // Return the image object
  return image;
};

export const imageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
};
