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
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const result = await userServices.createUser(req.body);
    if (typeof result !== 'string') {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(201).json({ token: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const result = await userServices.getAllUsers();
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const result = await userServices.getOneUser(req.params.id);
    if ('message' in result) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await userServices.deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { userLogin, createUser, getAllUsers, getOneUser, deleteUser };