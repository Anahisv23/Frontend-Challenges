// grab the elements
const addButton = document.getElementById("add-button");
const toastsDiv = document.getElementById("toasts");
const messageContent = document.getElementById("message-content");
const duration = document.getElementById("duration");
const cancelable = document.getElementById("cancelable");
const successButton = document.getElementById("success");
const errorButton = document.getElementById("error");
const clearButton = document.getElementById("clear-button");

// used as an identifier for specific toastDivs 
let numOfToasts = 0;

// determine the duration for a toast 
const determineDuration = () => {
  if (isNaN(duration.value) || duration.value < 500 || duration.value === "") {
    // Default value is 500 milliseconds
    return 500;
  } else {
    // Use the provided value
    return parseInt(duration.value);
  }
};

// remove a particular toast based on id
const removeAToast = (id) => {
  const toastsDivChildren = toastsDiv.children;
  const arrayOfChildren = Array.from(toastsDivChildren);

  const newArray = arrayOfChildren.filter((toast) => {
    return toast.id !== String(id);
  });
  toastsDiv.replaceChildren(...newArray);
};

// create the toast 
const createToast = (id, content, isError, isCancelable, duration) => {
  const toastDiv = document.createElement("div");
  const toastP = document.createElement("p");
  const toastButton = document.createElement("button");

  toastDiv.setAttribute("id", id);
  toastDiv.classList.add("toast");

  if (isError) {
    toastDiv.classList.add("error-toast");
  } else {
    toastDiv.classList.add("success-toast");
  }

  toastP.classList.add("message");
  toastP.textContent = content ? content : isError ? "Error." : "Success!";
  toastDiv.appendChild(toastP);

  if (isCancelable) {
    toastButton.textContent = "X";
    toastButton.classList.add("cancel-button");
    // remove a specific toast 
    toastButton.addEventListener("click", () => {
      removeAToast(id);
    });
    toastDiv.appendChild(toastButton);
  }
  toastsDiv.prepend(toastDiv);
  setTimeout(() => {
    removeAToast(id);
  }, duration);
};

// add event listener to add button 
addButton.addEventListener("click", () => {
  const id = numOfToasts;
  const content = messageContent.value;
  const isError = errorButton.checked;
  const isCancelable = cancelable.checked;
  const durationValue = determineDuration();
  // call the create toast function 
  createToast(id, content, isError, isCancelable, durationValue);
  // when we add a toast increment numOfToasts 
  numOfToasts += 1;
});

// clear all toasts 
clearButton.addEventListener("click", () => {
  toastsDiv.textContent = "";
});
