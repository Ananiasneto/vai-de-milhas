import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import { saveMiles } from "repositories/miles-repository";
import prisma from "database";

const api = supertest(app);
beforeEach(async()=>{
    await prisma.miles.deleteMany();
})
describe("GET /miles/:code", () => {

  it("should return miles", async () => {
    const {code}=await saveMiles('abc', 10)
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
