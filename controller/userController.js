const postlogin = (req, res) => {
  try {
    console.log(rew.body);
    res.send({ message: "somthing added successfully" });
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong" });
  }
};

module.exports = {
  postlogin,
};
