const { User, Store } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const statusMessage = require("../helpers/status.message");

module.exports = {
  register: async (req, res) => {
    try {
      const payload = req.body;
      const user = await User.create(payload);

      statusMessage(res, 201, true, "register success!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const comparePassword = bcrypt.compare(password, user.password);
        if (comparePassword) {
          const payloadToken = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
          const token = jwt.sign(payloadToken);
        } else {
          statusMessage(res, 400, false, "email or password is wrong!");
        }
      } else {
        statusMessage(res, 400, false, "email or password is wrong!");
      }
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findByPk(id, {
        include: [{ model: Store }],
      });

      statusMessage(res, 201, true, "Get user successfull!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const user = await User.update(payload, { where: { id } });

      statusMessage(res, 201, true, "Update user successfull!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.destroy({ where: { id } });
      statusMessage(res, 201, true, "delete user successfull!", user);
    } catch (error) {
      statusMessage(res, 500, false, error.message);
    }
  },
};
