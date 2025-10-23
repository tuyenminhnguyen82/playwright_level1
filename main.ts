import { PersonRepository } from "./PersonRepository";
import { Person } from "./Person";

function main() {
  console.log("Starting main.ts...");
  const repo = new PersonRepository();

  // 1️⃣ Load people from JSON
  const people: Person[] = repo.loadPeople();

  // 2️⃣ Celebrate birthday for each person
  people.forEach((person) => person.celebrateBirthday());

  // 3️⃣ Print greeting and adult status
  people.forEach((person) => {
    console.log(person.greet());           // Hi, I'm Alice
    console.log("Adult?", person.isAdult()); // Adult? true/false
    console.log("--------------------");
  });

  // 4️⃣ Save updated list to people.output.json
  repo.savePeople(people);
}

// Run the main function
main();