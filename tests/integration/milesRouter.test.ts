import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import { saveMiles } from "repositories/miles-repository";
import prisma from "database";
import { generateRandomMiles, generateRandomMilesObject } from "../factories/integrationFactory";

const api = supertest(app);
beforeEach(async()=>{
    await prisma.miles.deleteMany();
})
describe("GET /miles/:code", () => {

  it("should return miles", async () => {
    const {miles,code}=generateRandomMiles();
    console.log(miles)
    console.log(code)
    await saveMiles(code, miles)
    const {  body } = await api.get(`/miles/${code}`);
    expect(body).toMatchObject(expect.objectContaining({ 
            "id": expect.any(Number),
            "code": expect.any(String),
            "miles": expect.any(Number)
    }));
  });

  it("should return error not found", async () => {
    const code='1';
    const {  status } = await api.get(`/miles/${code}`);
    expect(status).toBe(httpStatus.NOT_FOUND)
  });

})
describe("Post /miles", () => {

    it("should create miles", async () => {
        const trip= generateRandomMilesObject();
      const {  status,body } = await api.post(`/miles`).send(trip);
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toMatchObject(expect.objectContaining({ 
              "code": expect.any(String),
              "miles": expect.any(Number)
      }));
    });
  
  
  })
