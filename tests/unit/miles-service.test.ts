
import { AffiliateStatus, ServiceClass } from "protocols";
import * as milesRepository from "../../src/repositories/miles-repository"
import { generateMilesForTrip, getMilesFromCode } from "../../src/services/miles-service";

describe("miles service Unit test", () => {
  it("should return miles by code", async () => {
    const milesMock= {
        id: 1,
        code: "abc",
        miles: 123,
    }
    jest.spyOn(milesRepository,"findMiles").mockResolvedValueOnce(milesMock);
    const miles=await getMilesFromCode("abc")
    expect(miles).toEqual(milesMock);
  });

  it("should throw an error if code not found", async () => {
    jest.spyOn(milesRepository, "findMiles").mockResolvedValueOnce(null);
    const miles=getMilesFromCode("invalid")
    await expect(miles)
      .rejects
      .toEqual({
        type: "not_found",
        message:`Miles not found for code invalid`
      });
  });
  it("should return error conflict", async () => {
      const milesMock= {
          id: 1,
          code: "abc",
          miles: 123,
      }
  
      const trip= {
        code: "abc",
        origin: {
          lat: 40.453053,
          long: 3.688344,
        },
        destination: {
          lat:  41.380898,
          long: 2.122820,
        },
        miles: false,
        plane: "aviao",
        service: ServiceClass.ECONOMIC,             
        coupom: "1111",
        affiliate: AffiliateStatus.GOLD,          
        date: "2025-05-07",
      };
      
      jest.spyOn(milesRepository,"findMiles").mockResolvedValueOnce(milesMock);
      await expect(generateMilesForTrip(trip)).rejects.toEqual({
          type: "conflict",
          message: `Miles already registered for code ${trip.code}`
        });
    });

})