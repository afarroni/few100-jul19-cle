import { getRandomInt } from "./utils";

let squares: NodeList;
let message: HTMLElement;
let again: HTMLElement;

export function runApp() {
    let secretSquareId: number;
    const promise = fetch('http://localhost:3000/game');
    console.log('making your request');
    promise.then((response) => {
        response.json().then(x => {
            secretSquareId = x.secret;
            setUp();
        })
    })

    function setUp() {
        squares = document.querySelectorAll('.square');
        message = document.getElementById('message');
        again = document.getElementById('play again');

        message.innerHTML = 'Play the Game';
        again.innerHTML = '';
        squares.forEach((square, index) => {
            const that = square as HTMLElement
            that.removeAttribute('data-secret');
            that.classList.remove('loser', 'winner');
            if (index + 1 === secretSquareId) {
                that.dataset.secret = 'true';
            }
            square.addEventListener('click', handleClick)
        });
    }
}

function handleClick(evt) {
    console.log({ evt, this: this });
    const that = this as HTMLElement
    if (that.dataset.secret === 'true') {
        that.classList.add('winner');
        message.innerHTML = 'Winner!';
        again.innerHTML = 'Click here to play again';
        again.addEventListener('click', runApp);

        squares.forEach((square: HTMLElement) => {
            if (!square.classList.contains('winner')) {
                square.classList.remove('loser');
                square.classList.add('loser');
            }
            square.removeEventListener('click', handleClick);
        });
    } else {
        that.classList.add('loser');
        that.removeEventListener('click', handleClick);
    }
}