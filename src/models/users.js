import sequelize from "../utils/config.js";
import { DataTypes } from "sequelize";

const Users = sequelize.define("Users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // isEmail: true,
    // unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: ["^[a-z]+$", "i"],
    // },
    // unique: true,
  },
  image: {
    type: DataTypes.TEXT,
  },
});
export default Users;
