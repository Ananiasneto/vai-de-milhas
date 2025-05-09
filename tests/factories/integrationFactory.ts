import { faker } from "@faker-js/faker";
import { AffiliateStatus, ServiceClass } from "protocols";


export function generateRandomMilesObject(){
    const validMilesObject = {
        code: faker.string.alphanumeric(3),
        origin: {
          lat: faker.location.latitude(),
          long: faker.location.longitude()
        },
        destination: {
            lat: faker.location.latitude(),
            long: faker.location.longitude()
        },
        miles: faker.datatype.boolean(),
        plane: faker.airline.airplane().name, 
        service: faker.helpers.arrayElement(Object.values(ServiceClass)),
        affiliate: faker.helpers.arrayElement(Object.values(AffiliateStatus)),
        date: faker.date.future().toISOString().split('T')[0] 
        };
    
        return validMilesObject;
    }
    export function generateRandomMiles(){
        const validMiles = {
            code: faker.string.alphanumeric(3),
            miles: faker.number.int(4),
            };
        
            return validMiles;
        }