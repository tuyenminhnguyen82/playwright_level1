export class Person {
     private _name: string;
     private _age: number;
     private _city: string;
     constructor(name: string, age: number, city: string){
            // Validate name is not empty
            if (!name || name.trim().length === 0) {
                throw new Error("Name cannot be empty.");
            }

            // Validate age is positive
            if (age <= 0) {
                throw new Error("Age must be a positive number.");
            }
            this._name = name;
            this._age = age;
            this._city = city;
        }
    greet(){
        return `Hi, I'm ${this._name} from ${this._city}.`;
    }
    celebrateBirthday(){
        this._age += 1;
    }
    updateCity(newCity: string): void {
        this._city = newCity;
    }
    isAdult(): boolean {
        return this._age >= 18;
    }
    hasSameCity(other: Person): boolean {
        return this._city === other.city;
    }   
    get name(): string {
    return this._name;
    }

    get age(): number {
        return this._age;
    }

    get city(): string {
        return this._city;
    }

    toJSON(): object {
        return {
        name: this._name,
        age: this._age,
        city: this._city,
        };
    }

    // 🏗️ Create instance from plain object
    static fromJSON(data: any): Person {
        if (!data || typeof data !== "object") {
            throw new Error("Invalid data for Person.");
        }

        return new Person(data.name, data.age, data.city);
    }
}
