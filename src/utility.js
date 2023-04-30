//Utility functions that repeate too often

const isAnyInputEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key].trim() === "") {
      return true;
    }
  }
  return false;
};

const logout = () => {
  //clear user details from browser
  localStorage.clear();
};

export { isAnyInputEmpty, logout };
