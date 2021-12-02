import { Users } from "../../models/users";
import { comparePassword, generateToken } from "../helper/helperUtils";

export class AuthQueries {
  static async create(values: { [key: string]: string }) {
    try {
      const user = await Users.findAll({ where: { email: values.email } });
      if (user.length) {
        return {
          error: {
            status: 409,
            message: "The email address already in use",
          },
        };
      }
      const created = await Users.create(values);

      return created;
    } catch (error: any) {
      return {
        error: {
          status: 500,
          message: "Unable to insert data into the users table",
          error: error.message,
        },
      };
    }
  }

  static async login(values: { [key: string]: string }) {
    try {
      const res = await Users.findOne({ where: { email: values.email } });
      //   console.log(res);

      if (!res) {
        return {
          error: {
            status: 404,
            message: "Invalid credentials",
          },
        };
      }
      const {
        id,
        first_name,
        last_name,
        email,
        address,
        phonenumber,
        isadmin,
        password,
      } = res.dataValues;

      console.log(values.password);

      if (!(await comparePassword(values.password, password))) {
        return {
          error: {
            status: 400,
            message: "Invalid credentials",
          },
        };
      }

      const token = await generateToken({
        id,
        first_name,
        last_name,
        email,
        address,
        phonenumber,
        isadmin,
      });

      const data = { token, ...res.dataValues };
      return data;
    } catch (error) {
      console.log(error);

      return {
        error: {
          status: 500,
          message: "Unable to select data from the users table",
        },
      };
    }
  }
}
