import app from "../../app";
import request from "supertest";
import { v4 } from "uuid";

let token = "";
describe("POST /register", () => {
  //   it("returns status code 201 if all details are passed", async () => {
  //     const response = await request(app)
  //       .post("/api/v1/auth/signup")
  //       .send({
  //         id: v4(),
  //         first_name: "Olori",
  //         last_name: "Ebi",
  //         email: "oloriebi@gmail.com",
  //         address: "Ikorodu, mile 12",
  //         password: "oloriebi95",
  //         phoneNumber: "08109586357",
  //       })
  //       .expect(201);
  //     expect(response.body.message).toBe("User successfully created");
  //   });

  it("returns status code 409 if email exists", async () => {
    const response = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        id: v4(),
        first_name: "Olori",
        last_name: "Ebi",
        email: "oloriebi@gmail.com",
        address: "Ikorodu, mile 12",
        password: "oloriebi95",
        phoneNumber: "08109586357",
      })
      .expect(409);
    expect(response.body.error).toBe("The email address already in use");
  });

  it("returns an error if email is not provided", async () => {
    const response = await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "",
        password: "oloriebi95?",
      })
      .expect(422);
    expect(response.body.error).toBeTruthy();
    expect(response.body.error.message).toBe(
      '"email" is not allowed to be empty'
    );
  });

  it("returns an error if wrong login details are provided", async () => {
    const response = await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "oloriebi2@gmail.com",
        password: "oloriebi95?",
      })
      .expect(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toBe("Invalid credentials");
  });

  it("returns a token if right login details are provided", async () => {
    const response = await request(app).post("/api/v1/auth/signin").send({
      email: "oloriebi2@gmail.com",
      password: "oloriebi95",
    });

    token = response.body.result.token;
    console.log(response.body);

    console.log(token);

    // .expect(200);

    expect(response.body.result.token).toBeTruthy();
  });

  // it("returns status code 201 if all property details are inputted", async () => {
  //   const response = await request(app)
  //     .post("/api/v1/property")
  //     .attach(
  //       "image_url",
  //       "/Users/mac/Desktop/sequelize/sequelize/src/image/image.jpeg"
  //     )
  //     .field("status", "available")
  //     .field("price", 15000)
  //     .field("address", "Ikorodu, mile 12")
  //     .field("city", "Ikorodu")
  //     .field("state", "Lagos")
  //     .field("type", "Duplex")
  //     .set("auth_token", token)
  //     .set("Accept", "application/json")
  //     .expect(201);
  //   expect(response.body.data).toBeTruthy();
  //   expect(response.body.message).toBe("Property posted"), 10000;
  // });

  it("returns status code 200 to obtain all properties", async () => {
    const response = await request(app).get("/api/v1/property").expect(200);
    expect(response.body.data[0]).toHaveProperty("id");
  });

  it("returns status code 200 to obtain a single property", async () => {
    let id = "fd542907-b901-4def-bfb2-d9198c50fc95";
    const response = await request(app)
      .get(`/api/v1/property/${id}`)
      .expect(200);
    expect(response.body.data).toBeTruthy();
  });

  it("returns status code 400 if invalid id is used to obtain a single property", async () => {
    let id = "fd542907-b901-4def-bfb2-d9198c50fc96";
    const response = await request(app)
      .get(`/api/v1/property/${id}`)
      .expect(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toBe(
      "No ad with the requested id. Kindly create one"
    );
  });

  it("returns status code 403 if an unauthorized user tries to update a property", async () => {
    let id = "7a6e8226-0f70-4f7f-b61c-40150e88dcca";
    const response = await request(app)
      .patch(`/api/v1/property/${id}`)
      .set("auth_token", token)
      .expect(403);
    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toBe(
      "The property you are trying to update is unavailable"
    );
  });

  it("returns status code 200 if an authorized user tries to update a sold property", async () => {
    let id = "fd542907-b901-4def-bfb2-d9198c50fc95";
    const response = await request(app)
      .patch(`/api/v1/property/${id}`)
      .set("auth_token", token)
      .expect(200);
    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toBe("Update successful");
  });

  it("returns status code 200 if an authorized user tries to update a property", async () => {
    let id = "fd542907-b901-4def-bfb2-d9198c50fc95";
    const response = await request(app)
      .patch(`/api/v1/property/${id}/update`)
      .attach(
        "image_url",
        "/Users/mac/Desktop/sequelize/sequelize/src/image/image.jpeg"
      )
      .field("city", "Ikorodu")
      .field("state", "Lagos")
      .set("Accept", "application/json")
      .set("auth_token", token)
      .expect(200);
    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toBe("Update successful");
  });

  it("returns status code 200 if an authorized user tries to deletee a property", async () => {
    let id = "fd542907-b901-4def-bfb2-d9198c50fc95";
    const response = await request(app)
      .delete(`/api/v1/property/${id}`)
      .set("auth_token", token)
      .expect(200);
    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toBe("property removed");
  });
});
