const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

$(document).ready(() => {
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
    const signupForm = $("signup.form");
    const firstnameInput = $("input#firstname-input");
    const lastnameInput = $("input#lastname-input");
    const emailsignupInput = $("input#emailsignup-input");
    const passwordsignupInput = $("input#passwordsign-input");

    loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
        .then(() => {
            window.location.replace("/members");
            // If there's an error, log the error
          })
          .catch(err => {
            console.log(err);
          });
    }

    signupForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      firstname: firstnameInput.val().trim(),
      lastname: lastnameInput.val().trim(),
      emailsignup: emailsignupInput.val().trim(),
      passwordsignup: passwordsignupInput.val().trim()
    };

    if (!userData.firstname || !userData.lastname || !userData.emailsignup || !userData.passwordsignup) {
      return;
    }
    signUpUser(userData.firstname, userData.lastname, userData.emailsignup, userData.passwordsignup);
    firstnameInput.val("");
    lastnameInput.val("");
    emailsignupInput.val("");
    passwordsignupInput.val("");
  
  function signUpUser(firstname, lastname, email, password) {
    $.post("/api/signup", {
      firstname: firstname, 
      lastname: lastname,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/login");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
};