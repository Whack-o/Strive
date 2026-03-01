export const challengeCreationBoxHTML = `
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
      <div id="optionsSection">
        <div id="eventOptions" style="display:none;">
            <input type="text" id="eventChallengeName" placeholder="Do a challenge" name="eventChallengeName" required> <span><b>every day for a month.</b></span><br><br>
            <p><i>Example: Bike to work every day, don't eat candy every day.</i></p>
        </div>
        <div id="quantityOptions" style="display:none;">
            <input type="text" id="quantityChallengeAction" placeholder="Do" name="quantityChallengeAction" required>
            <select name="quantityChallengeCondition" id="quantityCondition" required>
                <option value="at least">at least</option>
                <option value="at most">at most</option>
            </select>
            <input type="number" id="quantityChallengeAmount" name="quantityChallengeAmount" placeholder="Amount" required> <input type="text" id="quantityChallengeThing" name="quantityChallengeThing" placeholder="things" required><span><b> every day for a month.</b></span><br><br>
            <p><i>Example: Read at least 20 pages of a book every day, use phone at most 2 hours every day.</i></p>
        </div>
      </div>
      <button type="submit" class="createChallengeButton">I'm Committed</button>
    </form>
    <script src="scripts/challengeCreation.js"></script>
</div>
`

export function insertChallengeCreationForm(parent) {
    // INSERTS CHALLENGE CREATION FORM INTO parent AND INITALIZES ALL FUNCTIONS
    // does replace innerHTML of parent, does not append - so ensure to use in empty parent
    
    parent.innerHTML = challengeCreationBoxHTML;

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