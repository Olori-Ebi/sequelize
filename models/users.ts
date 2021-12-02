"use strict";
const { Model, DataTypes } = require("sequelize");
import db from "../config/config";
// module.exports = (sequelize, DataTypes) => {
interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
}
export class Users extends Model<UserAttributes> implements UserAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.hasMany(models.Properties, { foreignKey: "owner" });
  }
  id!: string;
  first_name!: string;
  last_name!: string;
  address!: string;
  email!: string;
  phoneNumber!: string;
  isAdmin!: boolean;
}
Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);
