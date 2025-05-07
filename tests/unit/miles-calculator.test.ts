import { calculateMiles } from "../../src/services/miles-calculator-service";
import * as distanceService from "../../src/services/distances-calculator-service";
import { AffiliateStatus, ServiceClass, Trip } from "../../src/protocols";
import { generateMilesForTrip } from "services/miles-service";
import * as milesCalculator from "../../src/services/miles-calculator-service"
import * as milesRepository from "../../src/repositories/miles-repository";  

describe("calculateMiles -miles-calculator-service Unit service", () => {
  it("should calculate miles with birthday bonus", () => {
    const trip: Trip = {
      code: "abc",
      origin: { lat:40.453053, long: -3.688344 },
      destination: { lat: 41.380898, long: 2.122820 },
      miles: false,
      plane: "aviao",
      service: ServiceClass.EXECUTIVE, 
      affiliate: AffiliateStatus.PLATINUM,
      coupom: "1111",
      date: "2025-05-07",
    };

    const distanceMock = 1000;
    let miles=0;
    miles = distanceMock * 1.5 ;
    miles = miles + (miles * 0.5);
    miles = miles + (miles * 0.1);
    jest.spyOn(distanceService, "calculateDistance").mockReturnValueOnce(distanceMock);
    const result = calculateMiles(trip);
    expect(result).toBe(miles);
  });
  it("should calculate miles without birthday bonus", () => {
    const trip: Trip = {
      code: "abc",
      origin: { lat:40.453053, long: -3.688344 },
      destination: { lat: 41.380898, long: 2.122820 },
      miles: false,
      plane: "aviao",
      service: ServiceClass.EXECUTIVE, 
      affiliate: AffiliateStatus.PLATINUM,
      coupom: "1111",
      date: "2025-07-07",
    };

    const distanceMock = 1000;
    let miles=0;
    miles = distanceMock * 1.5 ;
    miles = miles + (miles * 0.5);
    miles = miles + (miles * 0.0);
    jest.spyOn(distanceService, "calculateDistance").mockReturnValueOnce(distanceMock);
    const result = calculateMiles(trip);
    expect(result).toBe(miles);
  });
  it("should call save miles ", async () => {
    const trip: Trip = {
        code: "abc",
        origin: { lat:40.453053, long: -3.688344 },
        destination: { lat: 41.380898, long: 2.122820 },
        miles: false,
        plane: "aviao",
        service: ServiceClass.EXECUTIVE, 
        affiliate: AffiliateStatus.PLATINUM,
        coupom: "1111",
        date: "2025-07-07",
      };
      const calculatedMiles = 1500;
      const milesMock= {
        id: 1,
        code: "abc",
        miles: calculatedMiles,
    }

    jest.spyOn(milesRepository,"findMiles").mockResolvedValueOnce(null);
    jest.spyOn(milesCalculator, "calculateMiles").mockReturnValueOnce(calculatedMiles);
    const saveMilesMock = jest.spyOn(milesRepository, "saveMiles").mockResolvedValueOnce(milesMock);
    const result = await generateMilesForTrip(trip);
    expect(result).toBe(calculatedMiles);
    expect(saveMilesMock).toHaveBeenCalledWith(trip.code, calculatedMiles);
  });

});


