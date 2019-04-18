// console.log("Client side Js file=app.js");

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit',(e)=>{
    msg1.textContent = "Loading...";
    msg2.textContent = ''
    e.preventDefault();//to prevent default behavior of form i.e refreshing on submit
    const location = search.value;    
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
         if(data.error){
            msg1.textContent = data.error;
         }else{
            msg1.textContent =data.location;
            msg2.textContent =data.forecastData;
            }
        });
    });
});