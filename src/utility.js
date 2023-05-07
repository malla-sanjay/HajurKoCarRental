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
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export function getActiveUser(data) {
  const today = new Date();
  const activeUsers = [];

  // group data by user name
  const users = data.reduce((acc, item) => {
    if (!acc[item.userName]) {
      acc[item.userName] = [];
    }
    acc[item.userName].push(item);
    return acc;
  }, {});

  // check if a user has more than two items in the data array
  Object.keys(users).forEach((user) => {
    if (users[user].length > 1) {
      // sort items by approved date (newest to oldest)
      const sortedItems = users[user].sort(
        (a, b) => new Date(b.approvedDate) - new Date(a.approvedDate)
      );

      // check if the newest item is within the past 3 months
      const newestItemDate = new Date(sortedItems[0].approvedDate);
      const threeMonthsAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
      );
      if (newestItemDate > threeMonthsAgo) {
        // check if the second newest item is within the past 6 months
        const secondNewestItemDate = new Date(sortedItems[1].approvedDate);
        const sixMonthsAgo = new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        );
        if (secondNewestItemDate > sixMonthsAgo) {
          activeUsers.push(user);
        }
      }
    }
  });

  return activeUsers;
}

//current date
export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let daye = today.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (daye < 10) {
    daye = `0${daye}`;
  }

  return `${year}-${month}-${daye}`;
}
