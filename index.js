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


//Generated random CPU number to use as a first guess as well as any following guesses it would take.
function randomNum(min, max){
  return Math.floor(Math.random() * (max - min) + min);}
//Game 1
async function start() {
  console.log(
    "Welcome to the FIRST Number Guessing Game. This is where you (the human) make up a secret number that I (the CPU) will work to the FULLEST extent that your personal computer's processing power will ALLOW...\nto guess your number...\n"
  );
  console.log(
    "First. Let us set some parameters before the game begins.\nI don't wanna make this too easy or too hard on you so I'll let you set the range of numbers that I have to work with."
  );
  let min = await ask("What's the lowest number you can think of? ");
  if (min < 0) {
    console.log(
      "Sorry but my programmer wasn't smart enough to let me deal with negative numbers.\nYou can blame him for what I'm about to do "
    );
    process.exit();
  }
  let max = await ask(
    "What's the HIGHEST number I can go up to :D?\nYou might not wanna make this too far from your low. You may have a tougher time... "
  );
  if (max === min || max < min || max < 0) {
    console.log("Yeah no that's not gonna work for this game.");
    process.exit();
  }
  console.log(
    "Thank you very much for your cooperation.\nNow that we got the specifics out of the way... "
  );
  
  let secretNumber = await ask(
    "What's your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);


  guessing(min, max)
  async function guessing() {
    let binary = randomNum(min, max)
    let guessTwo = await ask(
      `Is your number higher or lower than ${binary}? Or is it a match? `
    );
    if (guessTwo === "higher") {
      min = binary + 1;
  
      guessing()
    } else if (guessTwo === "lower") {
      max = binary - 1;
  
      guessing()
    }
    else if (guessTwo=== "match") {
  
      (console.log(`Hey I did it. Probably didn't take me that long I bet ;)`))
    stepthree()
    }
    
    else {
      console.log("nice try cheater");
      process.exit()
    }
  
  }
      
    }
  
  //End Game Instructions. Asking user if they'd like to try again or not with options to either return to the "main menu" or try another round of this game

  async function stepthree() {
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
