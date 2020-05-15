const inputLoginEmail = document.getElementById("login-email");
const inputLoginPassword = document.getElementById("login-password");

const inputRegEmail = document.getElementById("register-email");
const inputRegPassword = document.getElementById("register-password");
const inputPasswordConfirmation = document.getElementById("password-confirmation");

const btnRegister = document.getElementById("btn-create");
const btnLogin = document.getElementById("btn-login");



let newPerson = {
     email: "", 
     password: "", 
     passwordConfirmation: "",
};

let loginPersonData = {
  email: "",
  password: ""
};

class ResponseModel {
  constructor() {
    this.IsSuccess= true;
    this.Message= "Success";
  }
}

function createPerson() {
    let _response = new ResponseModel();
    //#region Validations
    regEmail = inputRegEmail.value;
    regPassword = inputRegPassword.value;
    passwordConfirmation = inputPasswordConfirmation.value;

    newPerson["email"] = regEmail;  
    newPerson["password"] = regPassword;    
    newPerson["passwordConfirmation"] = passwordConfirmation;    

    if (regPassword.length < 3){
      _response.IsSuccess = false;
      _response.Message = "You have entered less than 3 characters for password";
      return _response;
    }else if (regPassword != passwordConfirmation){
      _response.IsSuccess = false;
      _response.Message = "Passwords Don't Match";
      return _response;
    }
    //#endregion

    return _response;
  }

  function loginPerson(){
    let _response = new ResponseModel();
    loginEmail = inputLoginEmail.value;
    loginPassword = inputLoginPassword.value;

    loginPersonData["email"] = loginEmail;  
    loginPersonData["password"] = loginPassword; 

    if (loginPassword.length < 3){
      _response.IsSuccess = false;
      _response.Message = "'You have entered less than 3 characters for password'"
      return _response;
    }
    return _response;

  }



  //  Datayı /register a gönderdiğimde {error: "Note: Only defined users succeed registration"} 
  //  hatası alıyorum bu yüzden /users a gönderdim.
  
  function register(){
    let res = this.createPerson();
    if (!res.IsSuccess){
      alert(res.Message)
      return;
    }

    // todo: Post NewPerson
    fetch('https://reqres.in/api/users', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPerson),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(err => console.log(err));

  }


  function login(){
    let res = this.loginPerson();
    if (!res.IsSuccess){
      alert(res.Message)
      return;
    }

    fetch('https://reqres.in/api/login', {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPersonData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(err => console.log(err));

  }

 