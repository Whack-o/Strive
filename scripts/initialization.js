export const initializationPages = [
  `
  <h2>👋 Welcome to Strive!</h2>
  <p>It looks like this is your first time using the app. Let's get you set up!</p>
  <button id="btnPage1">Get Started</button>
  `,
  `
  <h2>Try Something New for A Month</h2>
  <p>Think about something you have always wanted to try in your life, and try it for a month.</p>
  <p>One month is the perfect amount of time to add a habit or subtract one.</p>
  <p><b>Why?</b></p>
  <p>👉 The months will feel much more memorable.</p>
  <p>👉 You will learn and grow as a person.</p>
  <p>👉 You can achieve things you want, if you want them badly enough.</p>
  <button id="btnPage2">Continue</button>
  `,
  `
  <h2>Event-Based vs Quantity-Based Challenges</h2>
  <p>There are two types of challenges you can create: event-based and quantity-based.</p>
  <p>✅ Event-based challenges are things you do or don't do once a day.<br><i>Examples: bike to work, meditate, no candy, no Facebook.</i></p>
  <p>📊 Quantity-based challenges are things you do <b>at least</b> or <b>at most</b> a certain number of times a day. It is totally acceptable and awesome to go beyond.<br><i>Examples: read 20 pages of a book, run a mile, watch at most 1 hour of TV, use my phone 2 hours at most.</i></p>
  <p>Choose the type that best suits your goal!</p>
  <button id="btnPage3">Continue</button>
  `,
  `
  <h1>🚀 Start your first challenge!</h1>
  <p id="firstChallengeRecommendation"></p>
  <div class="challengeCreationBox">
    <form id="challengeCreationForm" action="javascript:void(0);">
      <div>
        <input type="radio" id="firstChallengeThisMonth" name="firstChallengeStart" value="current" required>
        <label for="firstChallengeThisMonth">Start this month (<span id="currentMonthSpan"></span>)</label>
      </div><br>
      <div>
        <input type="radio" id="firstChallengeNextMonth" name="firstChallengeStart" value="next" >
        <label for="firstChallengeNextMonth">Start next month (<span id="nextMonthSpan"></span>)</label>
      </div>
      <select name="challengeType" id="challengeType" required>
        <option value="" disabled selected>Challenge type</option>
        <option value="event">Event-based</option>
        <option value="quantity">Quantity-based</option>
      </select>
      <span id="challengeTypeUnset">Select challenge type</span><br><br>
      <div id="optionsSection"></div>
      <button type="submit">Start Challenge</button>
    </form>
  `   
];


export const optionsForms = {
  event:
    `
    <div id="eventOptions">
      <input type="text" id="eventChallengeName" placeholder="Do a challenge" name="eventChallengeName" required> <span><b>every day for a month.</b></span><br><br>
      <p><i>Example: Bike to work every day, don't eat candy every day.</i></p>
    </div>
    `,
  quantity:
    `
    <div id="quantityOptions">
      <input type="text" id="quantityChallengeAction" placeholder="Do" name="quantityChallengeAction" required>
      <select name="quantityChallengeCondition" id="quantityCondition" required>
        <option value="at least">at least</option>
        <option value="at most">at most</option>
      </select>
      <input type="number" id="quantityChallengeAmount" name="quantityChallengeAmount" placeholder="Amount" required> <input type="text" id="quantityChallengeThing" name="quantityChallengeThing" placeholder="things" required><span><b> every day for a month.</b></span><br><br>
      <p><i>Example: Read at least 20 pages of a book every day, use phone at most 2 hours every day.</i></p>
    </div>
    `
}


export function setPage(i) {
  var firstLogin = document.querySelector(".firstLogin");

  firstLogin.innerHTML = initializationPages[i];
  if (document.getElementById("btnPage" + String(i +1))) {
    document.getElementById("btnPage" + String(i +1)).onclick = () => {
      setPage(i + 1);
    }
  }

  if (i == 3) {
    const currentDate = new Date();
    const nextDate = new Date(); // The date object for next month
    const currentMonth = currentDate.toLocaleDateString('default', { month: 'long' });

    nextDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    const nextMonth = nextDate.toLocaleDateString('default', { month: 'long' });


    // MAKE URRENT MONTH SPAN TO MONTH AS WORD, NOT NUMBER
    document.getElementById("currentMonthSpan").textContent = currentMonth;
    // FIX NEXT MONTH
    document.getElementById("nextMonthSpan").textContent = nextMonth;
    document.getElementById("challengeType").onchange = (event) => {
      const value = event.target.value;
      let challengeTypeUnset = document.getElementById("challengeTypeUnset");
      let eventOptions = document.getElementById("eventOptions");
      let quantityOptions = document.getElementById("quantityOptions");
      console.log(challengeTypeUnset, eventOptions, quantityOptions);

      let optionsSection = document.getElementById("optionsSection");

      if (value == "event") {
        optionsSection.innerHTML = optionsForms.event;
      } else if (value == "quantity") {
        optionsSection.innerHTML = optionsForms.quantity;
      }
    }

    console.log("challengeCreationForm");

    document.getElementById("challengeCreationForm").addEventListener("submit", (event) => {
      console.log("Submitting form...");

      const form = new FormData(event.target);

      console.log(form);
      console.log(form.get);

      const challengeType = form.get("challengeType");
      const challengeStart = form.get("firstChallengeStart");

      let newChallenge = {};

      newChallenge.type = challengeType;

      console.log(challengeType);

      if (challengeType == "event") {
        console.log("event");

        const eventChallengeName = form.get("eventChallengeName");
        newChallenge.name = eventChallengeName;
      } else if (challengeType == "quantity") {
        console.log("quantity");

        const quantityChallengeAction = form.get("quantityChallengeAction");
        const quantityChallengeCondition = form.get("quantityChallengeCondition");
        const quantityChallengeAmount = form.get("quantityChallengeAmount");
        const quantityChallengeThing = form.get("quantityChallengeThing");


        newChallenge.action = quantityChallengeAction;
        newChallenge.condition = quantityChallengeCondition;
        newChallenge.amount = quantityChallengeAmount
        newChallenge.thing = quantityChallengeThing;
      }

      const newChallengeStringified = JSON.stringify(newChallenge);

      if (challengeStart == "current") {
        localStorage.setItem("currentMonth", newChallengeStringified);
      } else if (challengeStart == "next") {
        localStorage.setItem("nextMonth", newChallengeStringified);
      }

      localStorage.setItem("firstTime", "false");

      document.querySelector(".app").style.display = "block";
      firstLogin.style.display = "none";
    });
  }
}