const handleErrors = (message) => {
  let clean = message.split("/").pop().slice(0, -2).split("-").join(" ");
  return clean;
};

export default handleErrors;
