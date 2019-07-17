import { isEven } from "../src/utils";
import { data } from "./data";

describe('array methods', () => {
    describe('examples', () => {
        let numbers: number[];
        beforeEach(() => {
            numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
        it('has a ForEach', () => {
            numbers.forEach(f => console.log(f));
        });
        describe('methods that produce a new array', () => {
            it('has a filter', () => {
                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);
            });
            it('creating a new array from each element', () => {
                const doubled = numbers.map(num => num * 2); // map shows how to get from the start to finish 
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

                const stringDoubledEvens = numbers.filter(isEven)
                    .map(num => (num * 2))
                    .map(num => num.toString());
                expect(stringDoubledEvens).toEqual(["4", "8", "12", "16"]);
            });
        });
        describe('methods that produces a single (scalar) value', () => {
            it('checking the membership of an array against a predicate', () => {
                const hasSomeEvens = numbers.some(isEven);
                expect(hasSomeEvens).toBe(true);

                const hasAllEvens = numbers.every(isEven);
                expect(hasAllEvens).toBe(false);
            });
            it('reduces', () => {
                const total = numbers.reduce((s, n) => s + n, 0);
                expect(total).toBe(45);

                const totalPlusSome = numbers.reduce((s, n) => s + n, 100);
                expect(totalPlusSome).toBe(145);
            });
            it('finding things', () => {
                //const four = numbers.find();
                const four = numbers.filter(n => n === 4)[0];
                expect(four).toBe(4);

                const sixteen = numbers.filter(n => n === 16)[0];
                expect(sixteen).toBe(undefined);

                const [five] = numbers.filter(n => n === 5); // array destructuring
                expect(five).toBe(5);
            });
        });
    });
    describe('practical use', () => {
        interface Vehicle { //interface would be better option for named function in filter
            vin: string;
            info: {
                make: string;
                model: string;
                year: number;
            };
            mileage: number;
        }
        let vehicles: Vehicle[] = [
            { vin: '8398398397', info: { make: 'Ford', model: 'Explorer', year: 2012 }, mileage: 132_000 },
            { vin: '55567478473', info: { make: 'Toyota', model: 'Camry', year: 2018 }, mileage: 8_000 },
            { vin: '1234947848', info: { make: 'Chevy', model: 'Bolt', year: 2018 }, mileage: 152_000 },
        ];
        it('your practice 1', () => {
            // The make and model of all vehicles with > 100_000 miles on them.
            const answer: string[] = vehicles.filter(v => v.mileage > 100_000) // [vehicles] => [vehicles > 100_000 miles]
                .map(f => `${f.info.make} ${f.info.model}`);                   // [vehicles] => [string]
            expect(answer).toEqual(['Ford Explorer', 'Chevy Bolt']);
        });
        it('your practice 2 with data', () => {
            const customers = data;

            // array of the name, phone, email of each customer with a balace > 1_000
            interface Answer1 {
                name: string;
                email: string;
                phone: string;
            }

            function numberFromCurrency(currency: string): number {
                return Number(currency.replace(/[^0-9.-]+/g, ""));
            }

            const answer1 = data.filter(d => d.isActive && numberFromCurrency(d.balance) > 1_000.00)
                .map(d => {
                    return {
                        name: `${d.name.first} ${d.name.last}`,
                        email: d.email,
                        phone: d.phone
                    } as Answer1
                }
                );

            console.log(answer1);

            // the total balace of all the people and the number of people
            interface Answer2 {
                totalBalance: number;
                count: number;
            }
            const initialState: Answer2 = {
                totalBalance: 0,
                count: 0
            }
            const answer2: Answer2 = data.filter(d => d.isActive && numberFromCurrency(d.balance) > 1_000.00)
                .map(d => numberFromCurrency(d.balance))
                .reduce((s, n) => ({
                    totalBalance: s.totalBalance + n,
                    count: s.count + 1
                }), initialState);

            console.log(answer2);
            expect(answer2).toEqual({
                totalBalance: 24976.55,
                count: 9
            });
        });
    });
});