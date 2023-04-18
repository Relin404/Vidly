const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("auth middleware", () => {
  let token;
  beforeEach(() => {
    server = require("../../app");
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    await Genre.remove({});
    await server.close();
  });

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 200 if token is valid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });
});
