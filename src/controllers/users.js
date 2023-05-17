import Users from "../models/users.js";
import messages from "../utils/messages.js";
import { Op, Validator } from "sequelize";
import fs from "fs";

//CRUD

const createUser = async (req, res) => {
  const data = req.body;
  const file = req.file;
  const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!data.email || !data.password) {
    const path = `./public/${file.filename}`;
    fs.unlinkSync(path); //perintah delete file di public
    return messages(res, 423, "Email and password are required!");
  }
  if (!validator.test(data.email)) {
    const path = `./public/${file.filename}`;
    fs.unlinkSync(path); //perintah delete file di public
    return messages(res, 423, "Format email must xxx@xxx.xx");
  }

  if (file) {
    try {
      await Users.sync();
      const detail_email = await Users.findOne({
        where: { email: data.email },
      });
      if (!detail_email) {
        data.image = `${file.filename}`;
        const result = await Users.create(data);
        return messages(res, 201, "New User has been created!", result);
      } else {
        const path = `./public/${file.filename}`;
        fs.unlinkSync(path); //perintah delete file di public
        return messages(res, 404, `Email ${data.email} has been used`);
      }
    } catch (error) {
      return messages(res, 501, "Internal server error", data);
    }
  } else {
    return messages(res, 423, "Image is required!");
  }
};

//read all user
const allUsers = async (req, res) => {
  const q = req.query.q ? req.query.q : "";
  const order_by = req.query.order_by ? req.query.order_by : "ASC";
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
  try {
    await Users.sync();
    const total = await Users.findAndCountAll();
    const datas = await Users.findAll({
      where: {
        email: { [Op.substring]: q },
      },
      offset: page === 1 ? 0 : (page - 1) * per_page,
      limit: per_page,
      order: [["email", order_by]],
    });
    // const newData = data.map((data) => {
    //   const { id, email, image, createdAt, updateAt } = data;
    //   return {
    //     id,
    //     email,
    //     image,
    //     createdAt,
    //     updateAt,
    //   };
    // });

    return messages(res, 200, "Users", datas, {
      page,
      per_page,
      total: total.count,
    });
  } catch (error) {
    return messages(res, 500, "Internal server error");
  }
};

const updateUser = async (req, res) => {
  const email = req.params.email;
  const data = req.body;
  const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!validator.test(data.email)) {
    return messages(res, 423, "Format email must xxx@xxx.xx");
  }
  try {
    await Users.sync();
    const detail_email = await Users.findOne({
      where: { email },
    });
    if (detail_email) {
      await Users.update(data, {
        where: { email },
      });
      messages(res, 200, "User data has been updated!");
    } else {
      return messages(res, 404, `Your email ${email} not found!`);
    }
  } catch (error) {
    messages(res, 500, "internal server error");
  }
};

const detailUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.sync();
    const detail = await Users.findOne({
      where: { id },
    });
    if (!detail) {
      return messages(res, 404, `Your ID ${id} not found!`);
    } else {
      return messages(res, 200, "This is your data! Thanks!", detail);
    }
  } catch (error) {
    messages(res, 500, "internal server error");
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await Users.sync();
    const detail = await Users.destroy({
      where: { id },
    });
    if (!detail) {
      return messages(res, 404, `Your ID ${id} not found!`);
    } else {
      return messages(res, 200, "Your data has been deleted");
    }
  } catch (error) {
    messages(res, 500, "internal server error");
  }
};
export { createUser, detailUser, deleteUser, updateUser, allUsers };
