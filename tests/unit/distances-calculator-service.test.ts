import { calculateDistance } from "../../src/services/distances-calculator-service";

describe("calculateDistance Unit Testing", () => {
  const coords1= { 
    lat: 40.453053,
    long: 3.688344 
};
  const coords2 = {   
    lat:  41.380898,
    long: 2.122820 
};

  it("should return distance if miles is true", () => {
    const dLat = ((coords2.lat - coords1.lat)* Math.PI) / 180;
      const dLon = ((coords2.long - coords1.long) * Math.PI) / 180;
      const lat1 = (coords1.lat * Math.PI) / 180;
      const lat2 = (coords2.lat * Math.PI) / 180;
    
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) *
    Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radius=3958.8 * c;

    const distance = calculateDistance(coords1, coords2, true);
    expect(distance).toBe(Math.round(radius));
  });

  it("should return distance if miles is false", () => {
    const dLat = ((coords2.lat - coords1.lat)* Math.PI) / 180;
      const dLon = ((coords2.long - coords1.long) * Math.PI) / 180;
      const lat1 = (coords1.lat * Math.PI) / 180;
      const lat2 = (coords2.lat * Math.PI) / 180;
    
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) *
    Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const radius=6371 * c;

    const distance = calculateDistance(coords1, coords2, false);
    expect(distance).toBe(Math.round(radius));
  })
});