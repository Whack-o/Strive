export function goldModeSetup(monthCheckbox, weekCheckbox) {
    const monthCheckboxExists = monthCheckbox != null;
    const weekCheckboxExists = weekCheckbox != null;

    let monthCheckboxChecked;
    let weekCheckboxChecked;

    function toggleGoldMode() {
        // for gold mode to acitvate (or deactivate), if a checkbox exists, the checkbox must be checked
        const goldModeActive = (!monthCheckboxExists || monthCheckboxChecked) && (!weekCheckboxExists || weekCheckboxChecked);

        if (goldModeActive) {
            // activate gold mode
            document.body.classList.add("gold-mode");
        } else {
            // deactivate gold mode
            document.body.classList.remove("gold-mode");
        }

    }

    if (monthCheckboxExists) {
        monthCheckbox.addEventListener("change", (event) => {
            monthCheckboxChecked = event.target.checked;
            toggleGoldMode();
        });
    }
    if (weekCheckboxExists) {
        weekCheckbox.addEventListener("change", (event) => {
            weekCheckboxChecked = event.target.checked;
            toggleGoldMode();
        });
    }

    toggleGoldMode(); // call once to set initial state
}