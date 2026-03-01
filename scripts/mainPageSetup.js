export function mainPageSetup() {
    let monthBox = {
        content: document.getElementById("monthContent"),
        challengeText: document.getElementById("monthlyChallengeText"),
        checkbox: document.getElementById("monthlyCheckbox")
    }

    let weekBox = {
        content: document.getElementById("weekContent"),
        challengeText: document.getElementById("weeklyChallengeText"),
        checkbox: document.getElementById("weeklyCheckbox")
    }

    // Write content of boxes

    let currentMonthStringified = localStorage.getItem("currentMonth");
    let currentMonth;
    let monthChallengeText;

    let currentWeekStringified = localStorage.getItem("currentWeek");
    let currentWeek;
    let weekChallengeText;

    if (currentMonthStringified) {
        currentMonth = JSON.parse(currentMonthStringified);
        if (currentMonth.type == "event") {
            monthChallengeText = currentMonth.name;
        } else if (currentMonth.type == "quantity") {
            monthChallengeText = currentMonth.action + " " + currentMonth.condition + " " + currentMonth.amount + " " + currentMonth.thing;
        }
        monthBox.challengeText.innerText = monthChallengeText;
    } else {
        monthBox.content.innerHTML = "<h3>No Monthly Challenge This Month</h3><p>Go challenge yourself!</p>"
    }

    // do the same for weekly challenge

    if (currentWeekStringified) {
        currentWeek = JSON.parse(currentWeekStringified);
        if (currentWeek.type == "event") {
            // finish rest of code
            weekChallengeText = currentWeek.name;
        } else if (currentWeek.type == "quantity") {
            weekChallengeText = currentWeek.action + " " + currentWeek.condition + " " + currentWeek.amount + " " + currentWeek.thing;
        }
        weekBox.weekChallengeText.innerText = weekChallengeText;
    } else {
        weekBox.content.innerHTML = "<h3>No Weekly Challenge This Week</h3><p>Go challenge yourself!</p>"

    }
}