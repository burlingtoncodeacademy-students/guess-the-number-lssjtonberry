//Needed to form all the promises you see below

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Essentially my main menu. User should be able to select which game to start
init();
async function init() {
  console.log(
    "Hello There! Welcome(or Welcome Back XD) to my very first game COLLECTION :D Here you can choose between two different games. I hope you have fun!"
  );
  let choice = await ask("Would you like to play Game 1 or Game 2?\n");
  if (choice === "Game 1" || choice === "game 1") {
    //The function to start Game 1
    start();
  } else if (choice === "Game 2" || choice === "game 2") {
    //The function to start Game 2
    start2();
  }
  else {console.log("I didn't think the instructions were that hard but...it seems maybe they were. Let's loop it back and have you read one more time")
init()}
}

//The range of possible numbers within the game
let arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];

//Generated random CPU number to use as a first guess
let randomNum = Math.floor(Math.random() * 100 + 1);
//Game 1
async function start() {
  console.log(
    "Welcome to the FIRST Number Guessing Game. This is where you (the human) make up a secret number between 1 and 100 that I (the CPU) will work to the FULLEST extent that your personal computer's processing power will ALLOW...\nto guess your number...\nin seven attempts or less."
  );
  let secretNumber = await ask(
    "What's your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  //First calculation of users given number vs the random number generated from the first CPU guess. If on the off chance the answers right from the
  if (randomNum !== secretNumber) {
    console.log(
      "Darn it! I thought for sure it was like 99.9(cause I bet you're pretty smart like that..) Time for me to get serious."
    );
  }
  //Setup for the CPU to start making guesses
  let x = secretNumber;
  let advancedCpuThingz = function (arr, x, start, end) {
    // Base Condition
    if (start > end) return false;
    // Find the middle index
    let mid = Math.floor((start + end) / 2);
    console.log(mid);
    // Compare middle with given variable
    if (arr[mid] === x) return true;
    // If guess at middle is greater than x,
    // continue search in the left half of the middle
    if (arr[mid] > x) return advancedCpuThingz(arr, x, start, mid - 1);
    // If guess at mid is smaller,
    // continue search in the right half of mid
    else return advancedCpuThingz(arr, x, mid + 1, end);
  };

  //Second phase of game. Should first generated random number guess fail, guessing function will be implemented
  nextStep();
  async function nextStep() {
    console.log("I think I got it now you smarty pants!");
    let comment = await ask(`It wouldn't happen to be ${randomNum} would it? `);

    if (randomNum === secretNumber) {
      console.log(
        `You don't even need to respond. I know it was ${secretNumber}! I...am a legend!`
      );
      stepfive();
    } else if (comment == "yes") {
      console.log(
        "Hey man. Cheatin ain't cool and neither are cheaters. Try again when you wanna play fair and square"
      );

      process.exit();
    } else {
      console.log(
        "Perhaps I underestimated you pal. Time for me to pull out all the stops and figure this out once and for all!!"
      );
      let count = 0;

      //Just me trying to be cheeky
      while (count <= 15) {
        count += 1;
        if (count === 1) {
          console.log("Processing!");
        } else if (count === 13) {
          console.log("I think your computer's a bit slow...");
        } else if (count === 15) console.log("DONE");
        else {
          console.log("...");
        }
      }
      advancedCpuThingz(arr, secretNumber, 0, arr.length - 1);
      console.log(
        "I think my brain just EXPANDED right now dude! I know the answer is in this list! ;)"
      );
      stepThree()
    }
  }
  //Confirmation on whether or not secret number was found from guessing function in amount of tries specified.
  
  async function stepThree() {
    let newComment = await ask(`Your number's in this list! Am I right? `);
    if (
      (newComment === "yes") ||
      (newComment === "Yes") ||
      (newComment === "Yeah") ||
      (newComment === "yeah")
    ) {
      console.log("Amazing!");
      stepfour()
    }
    else if (console.log("Hey now don't be salty. You gave it your best shot. Don't sour it now by trying to cheat.")); {
  stepfive()}
  
//Final resolution of the game. Asks user if CPU guessed number in amount of tries it claims it could.
  stepfour ()
    async function stepfour() {
    let newComment4 = await ask(
      "Did I figure it out in seven or less tries...just like I said I would ;)? "
    );
    if (
      (newComment4 === "yes")
    ) {
      console.log(
        `I think I may be the greatest of all time. I guessed it right! Thanks for playing friend`
      );
      stepfive();
    } else
      (console.log(
        "I think someone MIGHT..be trying to cheat here and might ALSO...be a sore loser. Try again next time o.O "));
    {
      process.exit();
    }
      }
    
  }
  //End Game Instructions. Asking user if they'd like to try again or not with options to either return to the "main menu" or try another round of this game

  async function stepfive() {
    let newComment2 = await ask("Would you like to try again? ");
    if (
      (newComment2 === "yes")
    ){
      let newComment3 = await ask(
        "Would you like to play another round here or go back to the main menu? Enter `here` or main menu` "
      );
      if (newComment3 === "here") {
        start();
      } else if (newComment3 === "main menu") {
        init();
      }
    } else {
      console.log("Bye");;
    }
  }
}

//Officially starting the Reverse Number Guessing Game
async function start2() {
  console.log(
    "Welcome to the Second Number Guessing Game! In THIS version, you (the human) can try to guess a secret number that I (the CPU) will think of."
  );
  console.log(
    "First. Let us set some parameters before the game begins.\nI don't wanna make this too easy or too hard on you so I'll let you set the range of numbers that I have to work with."
  );
  let minimum = await ask("What's the lowest number you can think of? ");
  if (minimum < 0) {
    console.log(
      "Sorry but my programmer wasn't smart enough to let me deal with negative numbers.\nYou can blame him for what I'm about to do "
    );
    process.exit();
  }
  let maximum = await ask(
    "What's the HIGHEST number I can go up to :D?\nYou might not wanna make this too far from your low. You may have a tougher time... "
  );
  if (maximum === minimum || maximum < minimum || maximum < 0) {
    console.log("Yeah no that's not gonna work for this game.");
    process.exit();
  }
  let randomNum = Math.floor(Math.random() * maximum + minimum);
  console.log(
    "Thank you very much for your cooperation.\nNow that we got the specifics out of the way... "
  );

  let secretNumber = await ask(
    "Care to press your luck friend?\nI bet you won't figure it out right away X)\nWhat's your guess? "
  );
  console.log("You entered: " + secretNumber);

  if (randomNum === secretNumber) {
    console.log(`Your number was ${secretNumber}! You are a legend mate!`);
    process.exit();
  } else randomNum !== secretNumber;
  {
    console.log(`Sorry pal. It was actually ${randomNum} all along`);
    console.log("Perhaps you're not taking this very seriously...");

    let tryagain = await ask("How bout we try this game again? ");

    if (tryagain === "yes") {
      console.log("ALLLRRIIIGHHHTTT!");
      start2();
    } else if (tryagain === "no");
    {
      let tryagain2 = await ask("Care to try something else ");
      if (tryagain2 === "yes") {
        console.log("Sounds good. I'll take you back to the main menu now :D");
        init();
      } else {
        console.log("Awww. I bet you would have gotten it next time. Oh well");
        process.exit();
      }
    }
  }
}
