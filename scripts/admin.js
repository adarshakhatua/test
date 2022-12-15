let form =document.getElementById("form");

form.addEventListener("submit",logIn);


function logIn(event){
    event.preventDefault();
    let email=form.email.value;
    let pass=form.password.value;

    let adminData={email:email, password:pass};
    let token;
    fetch("https://reqres.in/api/login",{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
    }).then((val)=>val.json()).then((res)=>{
        token=res.token;
        if(token){window.location.href="adminTable.html"}
        else{
            alert("invalid credential!")
        }
    })
}