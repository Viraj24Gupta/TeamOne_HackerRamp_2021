let currentTab = 0;
showTab(currentTab);

function showTab(n) {
  let x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n === x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  let x = document.getElementsByClassName("tab");
  if (n === 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  let emailRegex = /^[a-zA-Z0-9_.]*[@][a-zA-Z]+[.][a-zA-Z]+$/;
  let numberRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  let passwordRegex = /^[A-Za-z0-9]{7,}$/;

  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value === "") {
      y[i].className += " invalid";
      valid = false;
    } else if (y[i].id === "email") {
      if (!emailRegex.test(y[i].value)) {
        y[i].setCustomValidity("Email is not valid");
        y[i].className += " invalid";
        valid = false;
      } else {
        y[i].setCustomValidity("");
        y[i].className += " valid";
      }
    } else if (y[i].id === "number") {
      if (!numberRegex.test(y[i].value)) {
        y[i].setCustomValidity("phone number is not valid");
        y[i].className += " invalid";
        valid = false;
      } else {
        y[i].setCustomValidity("");
        y[i].className += " valid";
      }
    } else if (y[i].id === "password") {
      if (!passwordRegex.test(y[i].value)) {
        y[i].setCustomValidity("password should be of minimum 7 characters");
        y[i].className += " invalid";
        valid = false;
      } else {
        y[i].setCustomValidity("");
        y[i].className += " valid";
      }
    } else if (y[i].id === "confirm_password") {
      let password = document.getElementById("password");
      if (String(password.value) !== String(y[i].value)) {
        y[i].setCustomValidity("passwords do not match. Please check");
        y[i].className += " invalid";
        valid = false;
      } else {
        y[i].setCustomValidity("");
        y[i].className += " valid";
      }
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  let i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}
