import { calculateMiles } from "../../src/services/miles-calculator-service";
import * as distanceService from "../../src/services/distances-calculator-service";
import { AffiliateStatus, ServiceClass, Trip } from "../../src/protocols";
import { generateMilesForTrip } from "services/miles-service";
import * as milesCalculator from "../../src/services/miles-calculator-service"
import * as milesRepository from "../../src/repositories/miles-repository";  
import { tripCalculateFactory } from "../factories/unitFactory";


describe("calculateMiles -miles-calculator-service Unit service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should calculate miles whitout bonus birthday", () => {
    const trip=tripCalculateFactory();

    const distanceMock = 1000;
    const affiliate =
    trip.affiliate === AffiliateStatus.BRONZE ? 0 :
    trip.affiliate === AffiliateStatus.SILVER ? 0.1 :
    trip.affiliate === AffiliateStatus.GOLD ? 0.25 :
    trip.affiliate === AffiliateStatus.PLATINUM ? 0.5 :null;

    const service =
    trip.service===ServiceClass.ECONOMIC ?1:
    trip.service===ServiceClass.ECONOMIC_PREMIUM?1.25:
    trip.service===ServiceClass.EXECUTIVE ?1.5:
    trip.service===ServiceClass.FIRST_CLASS?2:0

    const birthday= 0;
    
    let miles=0;
    miles = distanceMock * service;
    miles = miles + (miles * affiliate);
    miles = miles + (miles * birthday);
    jest.spyOn(distanceService, "calculateDistance").mockReturnValueOnce(distanceMock);
    const result = calculateMiles(trip);
    expect(result).toBe(miles);
  });
  it("should calculate miles with birthday bonus actives", () => {
    const trip=tripCalculateFactory();

    const distanceMock = 1000;

    const service =
    trip.service===ServiceClass.ECONOMIC ?1:
    trip.service===ServiceClass.ECONOMIC_PREMIUM?1.25:
    trip.service===ServiceClass.EXECUTIVE ?1.5:
    trip.service===ServiceClass.FIRST_CLASS?2:0;
  
    const affiliate =
    trip.affiliate === AffiliateStatus.BRONZE ? 0 :
    trip.affiliate === AffiliateStatus.SILVER ? 0.1 :
    trip.affiliate === AffiliateStatus.GOLD ? 0.25 :
    trip.affiliate === AffiliateStatus.PLATINUM ? 0.5 :0;

   trip.date = "2025-05-15";
   const birthday= 0.1;
    let miles=0;
    miles = distanceMock * service;
    miles = miles + (miles * affiliate);
    miles = miles + (miles * birthday);
    miles = Math.round(miles);

    jest.spyOn(distanceService, "calculateDistance").mockReturnValueOnce(distanceMock);
    const result = calculateMiles(trip);
    expect(result).toBe(miles);
  });
  it("should call save miles ", async () => {
    const trip =tripCalculateFactory();
      const calculatedMiles = 1500;
      const milesMock= {
        id: trip.id,
        code:trip.code,
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


