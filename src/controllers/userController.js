const userServices = require('../services/userServices');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userServices.userLogin(email, password);
    if (typeof result !== 'string') {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ token: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userLogin };