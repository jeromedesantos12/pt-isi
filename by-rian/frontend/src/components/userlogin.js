const userlogin = () => {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  return user;
};

export default userlogin;
