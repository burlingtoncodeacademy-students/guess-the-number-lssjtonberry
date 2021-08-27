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
  } else {
    console.log(
      "I didn't think the instructions were that hard but...it seems maybe they were. Let's loop it back and have you read one more time"
    );
    init();
  }
}

//Generated random CPU number to use as a first guess as well as any following guesses it would take.
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//Game 1
async function start() {
  //game 1 intro for player
  console.log(
    "Welcome to the FIRST Number Guessing Game. This is where you (the human) make up a secret number that I (the CPU) will work to the FULLEST extent that your personal computer's processing power will ALLOW...\nto guess your number...\n"
  );
  //informing player that they will need to give range parameters to play the game
  console.log(
    "First. Let us set some parameters before the game begins.\nI don't wanna make this too easy or too hard on you so I'll let you set the range of numbers that I have to work with."
  );
  //asks for the lowest number it can guess
  let min = await ask("What's the lowest number you can think of? ");
  //if the numbers less than 0
  if (min < 0) {
    console.log(
      "Sorry but my programmer wasn't smart enough to let me deal with negative numbers.\nYou can blame him for what I'm about to do "
    );
    process.exit();
  }
  //asks for the highest number it can guess
  let max = await ask(
    "What's the HIGHEST number I can go up to :D?\nYou might not wanna make this too far from your low. You may have a tougher time... "
  );
  //setting params for error handling
  if (max === min || max < min || max < 0) {
    console.log("Yeah no that's not gonna work for this game.");
    process.exit();
  }
  //transition to the actual game
  console.log(
    "Thank you very much for your cooperation.\nNow that we got the specifics out of the way... "
  );

  //request for the player to make their guess
  let secretGuess = await ask(
    "What's your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretGuess);
  //sets a counting variable to increase with each successive guess
  let count = ``;

  //the cpu's guessing function logic according to the players previously set min and max params
  guessing(min, max);
  async function guessing() {
    //setting a value for the CPU's first guess
    let binary = randomNum(min, max);
    //CPU the player to confirm one of three options about its guess
    let guess = await ask(
      `Is your number higher or lower than ${binary}? Or is it a match? `
    );
    //if the player responds "higher", the CPU will set a new minimum number before triggering the guess function again
    if (guess === "higher") {
      min = binary + 1;
      count++;
      guessing();
    }
    //if the player responds "lower", the CPU will set a new maximum number before triggering the guess function again
    else if (guess === "lower") {
      max = binary - 1;
      count++;
      guessing();
    }
    //should the player say the guess is a match
    else if (guess === "match") {
      //needed to add 1 to the guess counter to match the appropriate amount of guesses
      console.log(
        `Hey I did it. It only took me ${count + 1} try/s to do it ;)`
      );
      stepthree();
    }
    //should the player give any other answer aside from the three choices
    else {
      console.log("nice try cheater");
      //the game ends
      process.exit();
    }
  }
}

//End Game Instructions. Asking user if they'd like to try again or not with options to either return to the "main menu" or try another round of this game

async function stepthree() {
  //a request to play again
  let newComment2 = await ask("Would you like to try again? ");
  if (newComment2 === "yes") {
    //asks the player if they'd like to repeat this game, or go back to the main menu
    let newComment3 = await ask(
      "Would you like to play another round here or go back to the main menu? Enter `here` or main menu` "
    );
    //here triggers a new Game 1
    if (newComment3 === "here") {
      start();
      //main menu starts the entire program over again
    } else if (newComment3 === "main menu") {
      init();
    }
  }
  //upon entry of any other kind of response
  else {
    console.log("Bye");
    process.exit();
  }
}

//Officially starting the Reverse Number Guessing Game
async function start2() {
  console.log(
    "Welcome to the Second Number Guessing Game! In THIS version, you (the human) can try to guess a secret number that I (the CPU) will think of."
  );
  //requesting range parameters from player
  console.log(
    "First. Let us set some parameters before the game begins.\nI don't wanna make this too easy or too hard on you so I'll let you set the range of numbers that I have to work with."
  );
  //request to set the minimum number
  let minimum = await ask("What's the lowest number you can think of? ");
  //error handing. the game cannot handle using negative numbers so I needed to set this condition
  if (minimum < 0) {
    console.log(
      "Sorry but my programmer wasn't smart enough to let me deal with negative numbers.\nYou can blame him for what I'm about to do "
    );
    //game ends 
    process.exit();
  }
  //request to set the maximum number
  let maximum = await ask(
    "What's the HIGHEST number I can go up to :D?\nYou might not wanna make this too far from your low. You may have a tougher time... "
  );
  //the game will break if the min and max are the same so there is a conditional set to handle this possibility
  if (maximum === minimum) {
    console.log("Yeah no that's not gonna work for this game.");
    process.exit();
  }
  //the CPU's number randomly generated guess according to the min and max params set by the user
  let cpusNumber = randomNum(minimum, maximum);
  console.log(
    "Thank you very much for your cooperation.\nNow that we got the specifics out of the way... "
  );

  let secretGuess = await ask(
    "Care to press your luck friend?\nI bet you won't figure it out right away X)\nWhat's your guess? "
  );
  secretGuess = parseInt(secretGuess);
  console.log("You entered: " + secretGuess);

  //sets a count so player will know how many times it took to find the correct answer
  let count = ``;

  if (cpusNumber === secretGuess) {
    console.log("You got it on the FIRST TRY!");
  } else {
    // upon the wrong guess, player triggers a while loop that runs until guess is correct
    while (cpusNumber !== secretGuess) {
      // if a guess is higher, CPU gives player a hint and prompts a new guess
      if (cpusNumber < secretGuess) {
        secretGuess = await ask("It's lower than that, guess again! ");
        secretGuess = parseInt(secretGuess);
        //count goes up by one
        count++;
        // if a guess is lower, CPU gives player a hint and prompts a new guess
      } else if (cpusNumber > secretGuess) {
        secretGuess = await ask("It's higher than that, try again! ");
        secretGuess = parseInt(secretGuess);
        //count goes up by one
        count++;
      }
      console.log(
        `Nice work! And now that you FINALLY guessed my number...in ${count} try/s no less\n`
      );

      //asks the player if they wish to play another round of this game again
      let tryagain = await ask("How bout we try this game again? ");

      //should they respond yes, a new round of Game 2 is triggered 
      if (tryagain === "yes") {
        console.log("ALLLRRIIIGHHHTTT!");
        start2();
      } 
      //should they say no, player is prompted a new question
      else if (tryagain === "no");
      {
        //asks if player wants to try the other number game
        let tryagain2 = await ask("Care to try something else ");
        //if response is yes, player is taken back to the start of the program
        if (tryagain2 === "yes") {
          console.log(
            "Sounds good. I'll take you back to the main menu now :D"
          );
          init();
        } 
        //any other input triggers the program to close
        else {
          console.log(
            "Awww. I bet you would have gotten it next time. Oh well"
          );
          process.exit();
        }
      }
    }
  }
}