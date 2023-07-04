let getDataBtn = document.getElementById('getData');

//on loading fetching IP address
// Fetch user's IP address from the API
fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
    // console.log(data);
    const ipAddress = data.ip;
    document.getElementById('ip-address').innerText = ipAddress;
    // Set the IP address in local storage
    localStorage.setItem('userIpAddress', ipAddress);
})
.catch(error => {
    document.getElementById('ip-address').innerText = 'Error fetching IP address';
});

//fetching data


getDataBtn.addEventListener('click', (event) =>{
    // console.log('button clicked');
    document.location.href = '/location';
    const userIpAddress = localStorage.getItem('userIpAddress');
    
    //fetching location
    const token = '87feb413ce799e';
    fetch(`https://ipinfo.io/${userIpAddress}/geo?token=${token}`)
    .then(response => response.json())
    .then(data => {

        // console.log(data);
        //storing the data
        localStorage.setItem("userData", JSON.stringify(data));
    })
    .catch(error => {
        alert("Error Fetching the data", error);
    });
});