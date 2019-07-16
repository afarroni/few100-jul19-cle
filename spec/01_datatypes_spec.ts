describe('Data types', () => {
    describe('declaring variables', () => {
        it('using let', () => {
            let x: any;
            x = "blue";
            x = 19;
            expect(x).toBe(19);

            let y = 34;
            // y = 'will not work';
            expect(y).toBe(34);
        });
        it('using const', () => {
            const Pi = 3.1415;
            //Pi = 3; the variable cannot be reassigned

            const favoriteColors = ['blue', 'red', 'yellow'];
            // favoriteColors = [];
            favoriteColors[0] = 'purple';

            expect(favoriteColors[0]).toBe('purple');
        });
        it('has a var keyword, but it\'s broken', () => {
            let age = 22;
            if (age > 21) {
                var message = 'Old Enough'; // Do not do this. Ever. Don't Use VAR
            } // var is always a global, which is dumb
            expect(message).toBe('Old Enough');
        });
    });
    describe('literals in typescript', () => {
        it('has numeric literals', () => {
            let x1 = 12;
            let x2 = 12.3;
            let x3 = 1_000_000; //underscores for readability for thousands
            let x4 = 0xff; // 0x is in Hex
            let x5 = 0o22; // 0o is in octal
            let x6 = 0b1101; // 0b is in binary
        });
        it('has string literals', () => {
            let name = 'Sean';
            expect(name).toBe("Sean"); //double and single quotes same

            name = 'Flannery O\'Conner';
            name = "Flannery O'Conner";

            let quote = 'As Emerson said, "A foolish consistency is the hobgoblin of small minds".';
            quote = "As Emerson said, \"A foolish consistency is the hobgoblin of small minds\".";
        });
        it('has template strings', () => {
            // strings delimited by back ticks print everything
            let story = `Chapter 1.
            It is a truth universally acknowledged, that a simgle man in possession of a good fortune must be in want of a wife.
            ...
            The end.`;
            console.log(story);

            let name = 'Bob', age = 55;
            let info = `My name is ${name} and my age is ${age}.`;
            expect(info).toBe('My name is Bob and my age is 55.');
        });
        it('has the standard stuff', () => {
            let oldEnough = true;
            let tooYoung = false;

            // also truthy and falsy
            expect("dog").toBeTruthy();
            expect("").toBeFalsy();
            expect(78).toBeTruthy();
            expect(0).toBeFalsy();
            expect(-563).toBeTruthy();
            expect(null).toBeFalsy();
            expect(undefined).toBeFalsy();
            expect(({})).toBeTruthy();
            expect([]).toBeTruthy();

            // for equality, three = are necessary
            // 10 == "10" is true because is does implicit conversion
            // 10 === "10" is false because the types are different
            // 10 !== 11 is true

            //parseInt("101.1") 101    -- both return number types
            //parseFloat("101.1") 101.1
        });
        it('has array literals', () => {
            let shoppingList: string[] = [];
            shoppingList[0] = 'bread';
            shoppingList[1] = 'shampoo';
            shoppingList[100] = 'milk';

            expect(shoppingList[100]).toBe('milk');
            expect(shoppingList[22]).toBeUndefined();
        });
        it('has destructuring arrays', () => {
            const shoppingList = ['bread', 'shampoo', 'milk'];

            const [first, , third, fourth] = shoppingList;

            expect(first).toBe('bread');
            expect(third).toBe('milk');
            expect(fourth).toBe(undefined);

            const [head, ...rest] = shoppingList; // rest operator (can use other word)
            expect(head).toBe('bread');
            expect(rest).toEqual(['shampoo', 'milk']);
        });
        it('also has a spread operator', () => {
            let numbers = [1, 2, 3, 4, 5];
            let numbers2 = [0, ...numbers, 6, 7, 8, 9, 10];

            expect(numbers2).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            expect(numbers).toEqual([1, 2, 3, 4, 5]);
        });
        it('has tuples', () => {
            // specifically typed array
            type Musician = [string, string, number, string];
            let warren: Musician = ['Warren', 'Ellis', 51, 'Musician'];

            const [, lastname, howold] = warren;
            expect(lastname.toUpperCase()).toBe('ELLIS');
            expect(howold).toBe(51);
        });
    });
});