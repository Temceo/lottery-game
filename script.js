const board = document.querySelector("main");
const lotteryNumbers = new Array(59).fill().map((_, i) => i + 1);
const chosenNumbers = document.querySelector(".chosen");
const result = document.querySelector("#result");
const reset = document.querySelector("#reset");

reset.style.display = "none";
lotteryNumbers.forEach((number) => {
  const numberElement = document.createElement("div");
  numberElement.classList.add("number");
  numberElement.id = number;
  numberElement.textContent = number;
  board.appendChild(numberElement);
});

function chooseNumber(e) {
  let divOnly = e.target.closest("div");
  if (divOnly === null) return; // Exit if clicked outside a number div
  const numberDivs = document.querySelectorAll(".number");
  const selectedCount = [];
  e.target.classList.toggle("selected");
  numberDivs.forEach((div) => {
    if (div.classList.contains("selected")) {
      selectedCount.push(Number(div.id));
      chosenNumbers.textContent = `${selectedCount.join(", ")}`;
    }
    if (selectedCount.length < 1) {
      chosenNumbers.textContent = "";
    }
    if (selectedCount.length === 6) {
      showResults(selectedCount);
      document.removeEventListener("click", chooseNumber);
    }
  });
}

function showResults(selectedCount) {
  reset.style.display = "block";
  result.textContent = `Your numbers: ${selectedCount.join(", ")}`;
  // show lottery numbers

  const lotteryResult = lotteryNumbers
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .sort((a, b) => a - b);

  const matchedNumbers = selectedCount.filter((num) =>
    lotteryResult.includes(num)
  );

  document.querySelector(
    "#lottery"
  ).textContent = `Lottery numbers: ${lotteryResult.join(", ")}`;
  if (matchedNumbers.length > 0) {
    document.querySelector(
      "#matched"
    ).textContent = `Matched numbers: ${matchedNumbers.join(", ")}`;
  }

  if (matchedNumbers.length === 0) {
    document.querySelector("#matched").textContent = "No matched numbers.";
  }

  // check if user won
  let resultMessage;
  if (matchedNumbers.length === 6) {
    resultMessage = "Congratulations! You won the lottery!";
  } else if (matchedNumbers.length >= 3) {
    resultMessage = `You matched ${matchedNumbers.length} numbers. You win a small prize!`;
  } else {
    resultMessage = "Sorry, you didn't win this time.";
  }
  document.querySelector("#winnings").textContent = resultMessage;
  //
  chosenNumbers.style.display = "none";
  document.querySelector("#welcome").style.display = "none";
  document.querySelector("#pick").style.display = "none";
  board.style.display = "none";
}

function resetGame() {
  reset.style.display = "none";
  document.querySelectorAll(".number").forEach((div) => {
    div.classList.remove("selected");
  });
  chosenNumbers.textContent = "";
  result.textContent = "";
  document.querySelector("#lottery").textContent = "";
  document.querySelector("#matched").textContent = "";
  document.querySelector("#winnings").textContent = "";
  chosenNumbers.style.display = "block";
  document.querySelector("#welcome").style.display = "block";
  document.querySelector("#pick").style.display = "block";
  board.style.display = "grid";
  document.addEventListener("click", chooseNumber);
}
document.querySelector("#reset").addEventListener("click", resetGame);

document.addEventListener("click", chooseNumber);
