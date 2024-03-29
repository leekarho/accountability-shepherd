import * as SQLite from "expo-sqlite";
import { seed } from "../test-seeds/seed"
import { getSheep } from "../endpoints";

const db = SQLite.openDatabase("test-shepherd.db");

beforeEach(() => seed(db))

describe("Creating a sheep", () => {
    test("can create a sheep", () => {
        const expectedResult = [{"days_since_fed": null, "death_date": null, "description": "Get a job", "frequency": null, "health_timer": null, "joke_category": null, "name": "zaza", "new_field": null, "personality": null, "sheep_id": 1, "skin": null, "status": null}]

        expect(getSheep(db)).toEqual(expectedResult)
    })
})