const startPanel = document.querySelector('.options-panel');
const gamePanel = document.querySelector('.game-panel');
const keyboard = document.querySelector('.keyboard');
const progress = document.querySelector('.progress');
const display2 = document.querySelector('.display2');

const progress_line = document.querySelector('.line');


const time_select = document.querySelector('.time-select');
const reset_select = document.querySelector('.reset-per-round');
const numbers_select = document.querySelector('.numbers-per-round');
const start_button = document.querySelector('.start-game');

const numbers_buttons = document.querySelectorAll('.number');
const ready_button = document.querySelector('.ready-btn');

const display_text = document.querySelector('.display p');
const display_text2 = document.querySelector('.display2 p');

const Confirm = document.querySelector('.confirm');

const round_text = document.querySelector('.round p');
const roundPanel = document.querySelector('.round');

let time = 2;
let timeLimit = true;
let reset = false;
let auto = true;
let number = 1;
let currentNumber = "";
let NumberOfNumbers = 0;
let round = 1;


function StartGame()
{
    startPanel.classList.remove('active');
    gamePanel.classList.add('active');
    keyboard.classList.remove('ative');
    roundPanel.classList.add('active');
    AddNumber();
}


function AddNumber()
{
    round_text.innerHTML = round;
    if (timeLimit)
    {
        if (auto)
        {
            if (round < 4)
            {
                time = 1.5;
            }else if (round == 4 && round < 7)
            {
                time = 3;
            }else if (round == 7 && round < 10)
            {
                time = 4;
            }else if (round == 10 && round < 13)
            {
                time = 5.5;
            }else if (round == 13 && round < 18)
            {
                time = 7;
            }else if (round == 18 && round < 24)
            {
                time = 8;
            }else if (round >= 24)
            {
                time = 10;
            }
        }
        progress.classList.add('active');
        progress_line.style.setProperty("--duration", `${time}s`);
        ready_button.classList.remove('active');
    }else
    {
        progress.classList.remove('active');
        ready_button.classList.add('active');
    }


    if (reset)
    {
        currentNumber = "";
        for (let i=0; i<NumberOfNumbers; i++)
        {
            let random = Math.floor(Math.random() * 10);
            currentNumber += String(random);
        }
    }

    for (let i=0; i<number; i++)
    {
        let random = Math.floor(Math.random() * 10);
        currentNumber += String(random);
        NumberOfNumbers++;
    }
    display_text.innerHTML = currentNumber;

    if (timeLimit)
    {
        setTimeout(function()
        {
            progress.classList.remove('active');
            display_text.innerHTML = "";
            keyboard.classList.add('active');

        }, time * 1000)
    }
}

function CheckAnswer()
{
    if (display_text.textContent == currentNumber)
    {
        round++;
        display_text.style.color = "#5fffca";
        setTimeout(function()
        {
            keyboard.classList.remove('active');
            display_text.style.color = "white";
            AddNumber();
        }, 1000)
    }else
    {
        keyboard.classList.remove('active');
        display2.classList.add('active');

        let newText = "";
        let characters = display_text.textContent.split("");

        for (let i = 0; i < characters.length; i++)
        {
            if (characters[i] != currentNumber[i])
            {
                newText += "<span style='color: #ff5656'>" + characters[i] + "</span>";
            } else
            {
                newText += characters[i];
            }
        }
        document.querySelector('.display p').innerHTML = newText;

        display_text2.innerHTML = currentNumber;

        setTimeout(function()
        {
            display2.classList.remove('active');
            gamePanel.classList.remove('active');
            startPanel.classList.add('active');
            roundPanel.classList.remove('active');
            currentNumber = "";
            NumberOfNumbers = 0;
            round = 1;
        }, 4000)
    }
}


function Ready()
{
    display_text.innerHTML = "";
    keyboard.classList.add('active');
    ready_button.classList.remove('active');
}


function displayNumbers()
{
    if (this.textContent != 'x')
    {
        display_text.innerHTML += this.textContent;
    }else
    {
        display_text.innerHTML = display_text.textContent.slice(0, -1);
    }
}


function SelectChange_time(event)
{
    if (event.target.value == 0)
    {
        timeLimit = false;
    }else
    {
        timeLimit = true;
        if (event.target.value == 1)
        {
            time = 1.5;
            auto = true;
        }else
        {
            time = event.target.value;
            auto = false;
        }
    }
}
function SelectChange_reset(event)
{
    if (event.target.value == 1)
    {
        reset = false;
    }else
    {
        reset = true;
    }
}
function SelectChange_numbers(event)
{
    number = event.target.value;
}



start_button.addEventListener('click', StartGame);
Confirm.addEventListener('click', CheckAnswer);
ready_button.addEventListener('click', Ready);
time_select.addEventListener("change", SelectChange_time);
reset_select.addEventListener("change", SelectChange_reset);
numbers_select.addEventListener("change", SelectChange_numbers);
numbers_buttons.forEach((button) => {
    button.addEventListener('click', displayNumbers)
})