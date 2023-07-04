// ----------------------------elements---------------------------------------------
let lat = document.getElementById('lat');
let long = document.getElementById('long');
let city = document.getElementById('city');
let region = document.getElementById('region');
let organisation = document.getElementById('organisation');
let hostname = document.getElementById('hostname');

//frame
let frame = document.getElementById('frame');

//time date
let timeZone = document.getElementById('timeZone');
let dateTime = document.getElementById('dateTime');
let pincode = document.getElementById('pincode');
let message = document.getElementById('message');

//post office array
let filterCards = document.getElementById('filter-card');
let postOfficeArr = [];

/*
---------------------------------- data format----------------------------------------------
{
  "ip": "223.190.95.51",
  "city": "Gurgaon",
  "region": "Haryana",
  "country": "IN",
  "loc": "28.4601,77.0263",
  "org": "AS24560 Bharti Airtel Ltd., Telemedia Services",
  "postal": "122004",
  "timezone": "Asia/Kolkata",
  "readme": "https://ipinfo.io/missingauth"
} 
*/

//--------------------------------setting IP address------------------------------------
const IPAddress = localStorage.getItem('userIpAddress');
document.getElementById('ip-address').innerText = IPAddress;

let userInfo = JSON.parse(localStorage.getItem('userData'));
console.log(userInfo);

//-----------------------------setting the location----------------------------------------
let latPoint = userInfo.loc.split(',')[0];
lat.innerHTML = `<b>Lat: </b> ${latPoint}`;

let longPoint = userInfo.loc.split(',')[1];
long.innerHTML = `<b>Long: </b> ${longPoint}`;

city.innerHTML = `<b>City: </b> ${userInfo.city}`;
region.innerHTML = `<b>Region: </b> ${userInfo.region}`;

organisation.innerHTML = `<b>Organisation: </b> ${userInfo.org}`;
hostname.innerHTML = `<b>Hostname: </b> ${userInfo.ip}`;

//------------------------------------MAP---------------------------------------------------

frame.setAttribute('src', `https://maps.google.com/maps?q=${latPoint},${longPoint}&z=12&output=embed`);

//--------------------------------------INFO-------------------------------------------------

timeZone.innerHTML = `<b>Time Zone: </b>${userInfo.timezone}`;
let currentTime = new Date().toLocaleString(`${userInfo.country}`, { timeZone: `${userInfo.timezone}` });
dateTime.innerHTML = `<b>Date And Time: </b>${currentTime}`;
pincode.innerHTML = `<b>Pincode: </b>${userInfo.postal}`;


// ------------------------------ POSTAL OFFICE API ---------------------------------------

fetch(`https://api.postalpincode.in/pincode/${userInfo.postal}`)
.then(response => response.json())
.then(data => {
    // console.log(data);
    message.innerHTML = `<b>Message: </b>${data[0].Message}`;
    postOfficeArr = data[0].PostOffice;
    console.log(postOfficeArr);
    // console.log(postOfficeArr[0].Name);

    displayPostalOffices(postOfficeArr);

})
.catch(error => {
    document.getElementById('filter-card').innerText = 'Error fetching postal offices';
});

//function to display postal offices
function displayPostalOffices(arr){
    filterCards.innerHTML = "";
    for(let i=0;i<arr.length;i++){
        let card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
        <p>Name: ${arr[i].Name}</p>
        <p>Branch Type: ${arr[i].BranchType}</p>
        <p>Delivery Status: ${arr[i].DeliveryStatus}</p>
        <p>District: ${arr[i].District}</p>
        <p>Division: ${arr[i].Division}</p>
    `;
    filterCards.append(card);
    }
}

// ------------------------------FILTER FUNCTION--------------------------------------

// Function to filter postal offices
function filterPostalOffices() {
    const search = document.getElementById("search").value.toLowerCase();
    const filteredPostalOffices = postOfficeArr.filter(postalOffice => {
        const name = postalOffice.Name.toLowerCase();
        const branch = postalOffice.BranchType.toLowerCase();
        return name.includes(search) || branch.includes(search);
    });

    displayPostalOffices(filteredPostalOffices);
}

// Event listener for search box input
document.getElementById("search").addEventListener("input", filterPostalOffices);