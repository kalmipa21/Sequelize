import Sequelize from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "",
  database: "lazadar",
  dialect: "mysql",
});

const checking = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established succesfully.");
  } catch (error) {
    console.error("Unable to connect the database:", error);
  }
};
checking();

export default sequelize;
