// Note 2020-03-02 t-eckert
// While this code does work, I think it relies on global state too much.
// It would be worthwhile to get a code review and write this in a more functional way.

/** Steps for the form */
const inputSteps = [
  {
    label: "Name",
    placeholder: "Winona",
  },
  {
    label: "Age",
    placeholder: "7 months",
  },
  {
    label: "Favorite food",
    placeholder: "peanut butter",
  },
];

const toCamelCase = string =>
  string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");

const saveInput = () => {
  stepName = toCamelCase(inputSteps[inputIndex].label);
  puppy[stepName] = document.getElementById("input").value;
};

// Question 2020-03-02 t-eckert
// These increment/decrement steps do WAY too much.
// I would like to make them more "functional", but every time I tried
// I wrote myself into a corner at the HTML/JS update layer...
// Worth revisiting.
const incrementInputStep = () => {
  saveInput();
  inputIndex = inputIndex + 1;
  updateHtml();
};

const decrementInputStep = () => {
  saveInput();
  inputIndex = inputIndex - 1;
  updateHtml();
};

const showPuppyReport = () => {
  saveInput();
  alert(`${puppy.name} is ${puppy.age} and loves ${puppy.favoriteFood}!`);
  inputIndex = 0;
  updateHtml();
};

const makeButton = (
  label,
  action,
  triggerOnEnterKey = false,
  cssClass = "btn-neutral"
) =>
  `<button onClick="${action}" ${
    "type=submit" ? triggerOnEnterKey : ""
  } class="${cssClass}">${label}</button>`;

const makeButtons = () => {
  switch (inputIndex) {
    case 0:
      // Question 2020-03-02 t-eckert
      // How could I have defered the execution of the functions passed to
      // `makeButton` in a more elegant way than making them strings?
      return makeButton("Next", "incrementInputStep()", true);
    case inputSteps.length - 1:
      return (
        makeButton("Submit!", "showPuppyReport()", true, "btn-positive") +
        makeButton("Back", () => "incrementInputStep()")
      );
    default:
      return (
        makeButton("Next", "incrementInputStep()", true) +
        makeButton("Back", "decrementInputStep()")
      );
  }
};

const setInputStep = index => {
  inputIndex = index;
};

const removeNonAlphaChars = str => str.replace(/\W/g, "");

const makeInput = () => {
  const step = inputSteps[inputIndex];
  const labelId = removeNonAlphaChars(step.label);
  const buttons = makeButtons();

  return `<form>
  <div class="form-input">
    <strong><label for="${labelId}">${step.label}</label></strong>
    <input type="text" id="input" name="${labelId}" placeholder="${step.placeholder}" autofocus/>
  </div>
  <div class="form-nav-buttons">${buttons}</div>
  </form>`;
};

/** Render the state */
const updateHtml = () => {
  document.getElementById("new-puppy-input").innerHTML = makeInput();
};

/** Set initial values and push initial state to HTML */
let inputIndex = 0;
let puppy = { name: undefined, age: undefined, favoriteFood: undefined };
updateHtml();
