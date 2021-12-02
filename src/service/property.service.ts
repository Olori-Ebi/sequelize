import { Properties } from "../../models/property";
import { Op } from "sequelize";
export class PropertyQueries {
  static async createAd(values: { [key: string]: string }) {
    try {
      const adCreate = await Properties.create(values);

      return adCreate;
    } catch (error: any) {
      console.log(error);

      return {
        error: {
          status: 500,
          message: "Unable to insert data into the property  table",
          error: error.message,
        },
      };
    }
  }

  static async getAds(type?: string) {
    try {
      if (type) {
        const allAds = await Properties.findAll({ where: { type } });
        if (!allAds.length) {
          return {
            error: {
              status: 400,
              message: "No ads at the moment. Kindly create one",
            },
          };
        }
        return allAds;
      }
      const allAds = await Properties.findAll();
      if (!allAds.length) {
        return {
          error: {
            status: 400,
            message: "No ads with the requested type. Kindly create one",
          },
        };
      }
      return allAds;
    } catch (error: any) {
      return {
        error: {
          status: 500,
          message: "Unable to get all data from the property table",
          error: error.message,
        },
      };
    }
  }
  static async viewOne(id: string) {
    try {
      const ad = await Properties.findAll({ where: { id } });
      if (!ad.length) {
        return {
          error: {
            status: 400,
            message: "No ad with the requested id. Kindly create one",
          },
        };
      }
      return ad;
    } catch (error: any) {
      return {
        error: {
          status: 500,
          message: "Unable to get a data from the property table",
          error: error.message,
        },
      };
    }
  }
  static async delete(propertyid: string, owner: string) {
    try {
      const deleteAd = await Properties.destroy({
        where: { [Op.and]: [{ id: propertyid }, { owner }] },
      });
      if (deleteAd === 0) {
        return {
          error: {
            status: 400,
            message: "The property you are trying to delete is unavailable",
          },
        };
      }
      return deleteAd;
    } catch (error: any) {
      console.log(error);

      return {
        error: {
          status: 500,
          message: "Unable to delete a data from the property table",
          error: error.message,
        },
      };
    }
  }
  static async sold(owner: string, propertyid: string) {
    try {
      const updateAd = await Properties.update(
        { status: "sold" },
        {
          where: {
            [Op.and]: [{ id: propertyid }, { owner }],
          },
        }
      );

      if (updateAd[0] === 0) {
        return {
          error: {
            status: 400,
            message: "The property you are trying to update is unavailable",
          },
        };
      }
      return updateAd[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async cursor(id: string) {
    try {
      const property = await Properties.findByPk(id);
      //   console.log(property);

      if (!property) {
        return {
          error: {
            status: 400,
            message: "No ads at the moment. Kindly create one",
          },
        };
      }
      return property;
    } catch (error) {}
  }
  static async update(values: { [key: string]: string }) {
    try {
      const updateVal = await Properties.update(values, {
        where: { id: values.id },
      });
      console.log(updateVal);

      if (updateVal[0] === 0) {
        return {
          error: {
            status: 400,
            message: "No ads at the moment. Kindly create one",
          },
        };
      }
      return updateVal[0];
    } catch (error) {
      console.log(error);
    }
  }
}
