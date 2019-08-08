const logoutBtn = document.getElementById("logout");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
let displayName = "";

logoutBtn.addEventListener("click", logout);
button.addEventListener("click",updateDB);

//Set database object here
const database = firebase.database().ref();

// Set up authentication
const auth = firebase.auth();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = displayName;
    const message         = messageElement.value;

    messageElement.value  = "";
    
    console.log(username + " : " + message);

    //Update database here
    const value = {
        NAME: username,
        MESSAGE: message
    }
    database.push(value);
}

// Set database "child_added" event listener here
database.on("child_added",addMessageToBoard);

const messageContainer = document.querySelector(".allMessages");

/**
 * Takes a row of data from the database and adds the name and message to the message container.
 */
function addMessageToBoard(rowData){
    const row = rowData.val(); // returns object just like the "value" we pushed
    const name = row.NAME;
    const message = row.MESSAGE;

    const pElement = document.createElement("p");
    pElement.innerText = `${name}: ${message}`;
    messageContainer.appendChild(pElement);
}

function logout(event){
    auth.signOut();
}

auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = auth.currentUser;
      document.getElementById("username").innerText = "Logged in as: "+user.displayName;
      console.log(user.displayName);
      displayName = user.displayName;
      // ...
    } else {
        window.location.href = "index.html";
      // User is signed out.
      // ...
    }
  });