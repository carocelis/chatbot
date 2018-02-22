$(document).ready(() => {
  
  $('#btn-reg-send').click(function registrar(){
    var email = $('#reg-email').val();
    var pw = $('#reg-pw').val();
    var pw2 = $('#reg-pw2').val();
    
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(function(){
      verificar();
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + errorMessage);
    // console.log(errorMessage);
    });
  })

  $('#btn-signin-send').click(function ingreso(){
    var email2 = $('#signin-email').val();
    var password2 = $('#signin-pw').val();
    
    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    });
  })


  function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("Ha iniciado sesión");
        aparece(user);

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
  observador();

  function aparece(user){
    // console.log(user);
    var user = user;
    if (user.emailVerified) {
      var content = $('#content');
      content.append(`
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Bienvenid@! ${user.email}</h4>
          <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
          <hr>
          <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
        <button id="btn-logout" onclick="cerrar();" class="btn btn-danger">Cerrar Sesión</button>`);
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

function verificar(){
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("Enviando correo...");
  }).catch(function(error) {
    console.log(error);
    // An error happened.
  });
}