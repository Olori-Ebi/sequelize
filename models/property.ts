"use strict";
const { Model, DataTypes } = require("sequelize");
import db from "../config/config";
// module.exports = (sequelize, DataTypes) => {
interface PropertiesAttributes {
  id: string;
  owner: string;
  status: string;
  price: number;
  state: string;
  city: string;
  address: string;
  type: string;
  image_url: string;
}
export class Properties
  extends Model<PropertiesAttributes>
  implements PropertiesAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.belongsTo(models.Users, { foreignKey: "owner" });
  }
  id!: string;
  owner!: string;
  status!: string;
  price!: number;
  state!: string;
  city!: string;
  address!: string;
  type!: string;
  image_url!: string;
}
Properties.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("sold", "available"),
      allowNull: false,
      defaultValue: "available",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Properties",
  }
);
// return Properties;
// };
