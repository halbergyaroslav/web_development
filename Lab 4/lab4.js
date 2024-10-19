const diceImages = [
    "images/dice1.png",
    "images/dice2.png",
    "images/dice3.png",
    "images/dice4.png",
    "images/dice5.png",
    "images/dice6.png"
];

let rollCounter = 0;

document.getElementById('rollButton').addEventListener('click', function () {
    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').src = diceImages[dice1Value - 1];
    document.getElementById('dice2').src = diceImages[dice2Value - 1];

    const sum = dice1Value + dice2Value;
    document.getElementById('rollResult').textContent = `You rolled: ${dice1Value} and ${dice2Value} (Sum: ${sum})`;

    rollCounter++;
    document.getElementById('rollCount').textContent = `Roll Count: ${rollCounter}`;

    if (dice1Value === dice2Value) {
        document.getElementById('rollResult').textContent += ' - Doubles! You win!';
    }
});
