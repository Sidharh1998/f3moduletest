let postArry;
let userData = JSON.parse(localStorage.getItem("user-data"))
console.log(userData);
let loc = userData.loc

let latlong = loc.split(",")




document.querySelector(".lat").textContent += latlong[0]
document.querySelector(".long").textContent += latlong[1]
document.querySelector(".city").textContent += userData.city
document.querySelector(".organisation").textContent += "NULL"
document.querySelector(".hostname").textContent += userData.hostname
document.querySelector(".region").textContent += userData.region


document.querySelector(".map").innerHTML =
    `<iframe src="https://maps.google.com/maps?q=${latlong[0]}, ${latlong[1]}&z=15&output=embed" width="100%" height="270" frameborder="0" style="border:0"></iframe>`

document.querySelector(".time-zone").textContent += userData.timezone


let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: `${userData.timezone}` });



document.querySelector(".date-time").textContent += chicago_datetime_str


document.querySelector(".pincode").textContent += userData.postal


fetch(`https://api.postalpincode.in/pincode/${userData.postal}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
       
        document.querySelector(".message").textContent += data[0].Message
        console.log(data[0].PostOffice[0].Name);
        for (let i = 0; i < data[0].PostOffice.length; i++) {
            document.querySelector(".post-office").innerHTML += `
<div id=${data[0].PostOffice[i].Name}>
        <div class="post-office-detail">
            <div class="Name">Name :${data[0].PostOffice[i].Name}</div>
            <div class="Branch">Branch Type :${data[0].PostOffice[i].BranchType}</div>
            <div class="Delivery">Delivery Status :${data[0].PostOffice[i].DeliveryStatus}</div>
            <div class="District">District :${data[0].PostOffice[i].District}</div>
            <div class="Division">Division :${data[0].PostOffice[i].Division}</div>
        </div>
            </div>
`
        }
        postArry=data[0].PostOffice;
console.log(postArry);
    document.querySelector(".search").addEventListener('input',()=>{

        document.querySelector(".post-office").style.display='none'
       
        console.log("input taken");
        displayPostOffice(postArry,document.querySelector(".search").value)
    })


    //-------------------------------- 
    function displayPostOffice(postOffices, searchTerm) {
        const filteredPostOffices = postOffices.filter(postOffice => {
          const nameMatches = postOffice.Name.toLowerCase().includes(searchTerm.toLowerCase());
          const branchMatches = postOffice.BranchType.toLowerCase().includes(searchTerm.toLowerCase());
          return nameMatches || branchMatches;
        });
      
        document.getElementById('card').innerHTML = filteredPostOffices.map(postOffice => `
        <div class="box"> 
        <div class="cardinner">
            <div>Name : ${postOffice.Name}</div>
            <div>Branch : ${postOffice.BranchType}</div>
            <div>Delivery Status : ${postOffice.DeliveryStatus}</div>
            <div>District : ${postOffice.District}</div>
            <div>Division : ${postOffice.Division}</div>
          </div>
          </div>
        `).join('');
      }
    





// ------------------------------------
    }).catch(error => {
        console.log(error, "error")
    }) 



   
     
   