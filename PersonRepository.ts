import * as fs from "fs";
import * as path from "path";
import { Person } from "./Person"; // adjust import path if needed

export class PersonRepository {
  private inputPath: string;
  private outputPath: string;

  constructor(
    inputPath: string = path.join(__dirname, "data", "people.json"),
    outputPath: string = path.join(__dirname, "data", "people.output.json")
  ) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
  }

  // 🧩 Load JSON → Person[]
  loadPeople(): Person[] {
    try {
      if (!fs.existsSync(this.inputPath)) {
        throw new Error(`Input file not found: ${this.inputPath}`);
      }

      const data = fs.readFileSync(this.inputPath, "utf-8");
      const json = JSON.parse(data);

      if (!Array.isArray(json)) {
        throw new Error("Invalid data format — expected an array.");
      }

      return json.map((item) => Person.fromJSON(item));
    } catch (err: any) {
      console.error("❌ Failed to load people:", err.message);
      return [];
    }
  }

  // 💾 Save Person[] → JSON file
  savePeople(people: Person[]): void {
    try {
        const jsonData = JSON.stringify(
        people.map((p) => p.toJSON()),
        null,
        2
      );

      fs.writeFileSync(this.outputPath, jsonData, "utf-8");
      console.log(`✅ Saved ${people.length} people to ${this.outputPath}`);
    } catch (err: any) {
      console.error("❌ Failed to save people:", err.message);
    }
  }
}