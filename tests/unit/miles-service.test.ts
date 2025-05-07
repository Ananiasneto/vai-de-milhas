
import * as milesRepository from "../../src/repositories/miles-repository"
import { generateMilesForTrip, getMilesFromCode } from "../../src/services/miles-service";
import {  tripFactory} from "../factories/unitFactory";

describe("miles-service Unit test", () => {
  it("should return miles by code", async () => {

    const {trip,milhas}= tripFactory();
    const milesMock= {
      id:1,
      code:trip.code,
      miles:milhas
    }
    jest.spyOn(milesRepository,"findMiles").mockResolvedValueOnce(milesMock);
    const miles=await getMilesFromCode(trip.code)
    expect(miles).toEqual(milesMock);
  });
  it("should throw an error if code not found", async () => {
    jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);
    const {trip}= tripFactory();
    const miles=getMilesFromCode(trip.code)
    await expect(miles)
      .rejects
      .toEqual({
        type: "not_found",
        message:`Miles not found for code ${trip.code}`
      });
  });
  it("should return error conflict", async () => {
      const {trip,milhas}= tripFactory();
      
      jest.spyOn(milesRepository,"findMiles").mockResolvedValueOnce({
        id:1,
        code:trip.code,
        miles:milhas
      });
      await expect(generateMilesForTrip(trip)).rejects.toEqual({
          type: "conflict",
          message: `Miles already registered for code ${trip.code}`
        });
    });

})