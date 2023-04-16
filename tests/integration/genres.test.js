const request = require("supertest");
const mongoose = require("mongoose");
const { Genre } = require("../../models/genre");
const { User, userSchema } = require("../../models/user");
let server;

describe("./api/geners", () => {
  // Make sure to close the current working server and start anew after each test
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  // GET ALL
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((genre) => genre.name === "genre1")).toBeTruthy();
      expect(res.body.some((genre) => genre.name === "genre2")).toBeTruthy();
    });
  });

  // GET :id
  describe("GET /:id", () => {
    it("should return a genre with a specific id if valid", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();
      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      // expect(res.body.some((genre) => genre.name === genre._id ))
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);
      expect(res.status).toBe(404);
    });
  });

  // POST
  describe("POST /", () => {
    // Define the happy path, then in each test change accordingly
    let token, name;

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    const exec = async () => {
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({
          name: name,
        });
      return res;
    };

    // Test Authentication
    it("should return 401 if client is not logged in", async () => {
      // No token provided -> Unauthorized Access 401; "Access denied. No token provided"
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    // Not less than 5 characters
    it("should return 400 if genre is less than 5 characters (according to validation function)", async () => {
      name = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    // Not more than 50 characters
    it("should return 400 if genre is more than 50 characters (according to validation function)", async () => {
      name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    // Save if valid
    it("should save the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });

    // Assert genre is in the body of response
    it("should return the genre if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
