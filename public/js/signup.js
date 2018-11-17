$(document).ready(function () {
  // Getting references to our form and inputs
  const signupForm = $("form.signup");
  const usernameInput = $("#username-input");
  const passwordInput = $("#password-input");
  const emailInput = $("#email-input");
  

  // When the form is submitted, we validate there's an email and password entered
  signupForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      email: emailInput.val().trim()
    };

    console.log(userData);
    if (!userData.email || !userData.password || !userData.email) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    signupUser(userData.username, userData.password, userData.email);
    usernameInput.val('');
    passwordInput.val('');
    emailInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function signupUser(username, password, email) {
    console.log("Add user");
    $.post("/api/signup", {
      username: username,
      password: password,
      email: email
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });
  }

});
