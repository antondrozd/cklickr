import Clickr from './clickr.js';

const clickr = new Clickr({
    buttonElement: document.querySelector('#button'),
    displayElement: document.querySelector('#display'),
    counterElement: document.querySelector('#counter'),
    resetElement: document.querySelector('#reset'),
    bestResultElement: document.querySelector('#bestResult')
});
