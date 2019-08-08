// get HTML Elements
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const createBtn = document.getElementById("createBtn");



//add event listeners
loginBtn.addEventListener("click", login);
createBtn.addEventListener("click", function(event){
  if (username.value == ""){
    alert("Please enter a Username");
  } else {
    //A BUTTON EVENT NOT A LOGIN EVENT
    createAccount(event);
  }
});

//Authentication
const auth = firebase.auth();


function createAccount(event){
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(function(){
      user = auth.currentUser;
      const profile = {
        displayName: username.value
      }
      console.log(user);
      user.updateProfile(profile);
      //window.location.href = "messages.html";
    })
    .catch(function(error){
      alert(error.message);
    });
}

function login(event){
  event.preventDefault();
  auth.signInWithEmailAndPassword(email.value, password.value)
    .then(function(event){
        window.location.href = "messages.html";
    })
    .catch(function(error){
      alert(error.message);
    });
}

//Docertian things depending on the state
auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // ...
    let message = "Signed in As: "+auth.currentUser.displayName;
    
  } else {
    // User is signed out.
    // ...
  }
});
