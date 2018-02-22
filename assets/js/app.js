$(document).ready(() => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyASbSb-bQEi9Yx1GCWv3vfZn-dXjaJJ-l4",
    authDomain: "chatbot-lab89.firebaseapp.com",
    databaseURL: "https://chatbot-lab89.firebaseio.com",
    projectId: "chatbot-lab89",
    storageBucket: "chatbot-lab89.appspot.com",
    messagingSenderId: "656948156356"
  };
  firebase.initializeApp(config);

  $('#content').hide();
  
  $('#btn-reg-send').click(function reg(){
    var email = $('#reg-email').val();
    var pw = $('#reg-pw').val();
    var pw2 = $('#reg-pw2').val();
    
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(function(){
      verify();
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + errorMessage);
    // console.log(errorMessage);
    });
  })

  $('#btn-signin-send').click(function login(){
    var email2 = $('#signin-email').val();
    var password2 = $('#signin-pw').val();
    
    firebase.auth().signInWithEmailAndPassword(email2, password2)
    .then(function(){
      window.location.reload(); // recargar la pagina
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    });
  })


  function viewer(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("Ha iniciado sesión");
        inicialized(user);

        var displayName = user.displayName;
        var email = user.email;
        // console.log(user.emailVerified);
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log("No ha iniciado sesión");
      }
    });
  }
  viewer();

  function inicialized(user){
    // console.log(user);
    var user = user;
    if (user.emailVerified) {
      var content = $('#content');
      var btnClose = $('#btn-close');

      btnClose.empty();
      btnClose.append(`
        <button id="btn-logout" onclick="cerrar();" class="btn btn-danger ml-2 my-2 my-sm-0 btn-sm">Cerrar Sesión</button>`);
      $('#content').show();
    } 
  }
});

function cerrar(){
  firebase.auth().signOut()
  .then(function(){
    console.log("Cerrando Sesión");
    window.location.reload(); // recargar la pagina
  })
  .catch(function(error){
    console.log(error);
  })
};

function verify(){
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("Enviando correo...");
  }).catch(function(error) {
    console.log(error);
    // An error happened.
  });
}

// ******************* CHAT BOT ***************

$('#send').click(function(){
  var text = $('#mytext').val();
  // console.log(text);
  if (text !== ''){
    insertChat('me', text);            
    $('#mytext').val('');
  }
  
  fetch(`https://www.cleverbot.com/getreply?key=CC7bxld2Rq52cSUQl2RUwyvWQ4w&input=${text}&output=${'#'}&cs=MXYxCTh2MQlBdldYSlo5SEpWQ0wJMUZ2MTUxOTE3NTYyNwk2NGlBIG1pbnV0ZSBpcyBzaXh0eSBzZWNvbmRzIGxvbmcuLgk=&callback=ProcessReply`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);
    // console.log(data.output);
    var output = data.output;
    insertOutput('you', output);
  })
});

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function insertChat(who, text, time = 0){
  var date = formatAMPM(new Date());
  
  setTimeout(function(){                        
      $('ul').append(`
        <li style="width:95%;">
          <div class="msj-rta macro">
            <div class="text text-r">
              <p>${text}</p>
              <p><small>${date}</small></p>
            </div>
          </div>
        </li>`);
  }, time);  
}  

function insertOutput(who, text, time = 0){
  var date = formatAMPM(new Date());

  setTimeout(function(){                        
      $('ul').append(`
        <li style="width:95%">
          <div class="msj macro">
            <div class="text text-l">
              <p id="answer">${text}</p>
              <p><small>${date}</small></p>
           </div>
          </div>
       </li>`);
  }, time);   
}