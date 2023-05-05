
let IP;

fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
     IP=data.ip
     console.log(data);
    
    
  console.log(IP);
  document.querySelector(".address").textContent=IP

})
.catch(() => {
  console.error("error");
  });
document.getElementById("get-data").addEventListener("click",()=>{
    
  

  fetch(`https://ipinfo.io/${IP}/geo?token=8f90c0903cb8c9`)
  .then(response=>response.json())
  .then(data=>{
    console.log(data);
    localStorage.setItem("user-data",JSON.stringify(data))
    location.assign("./home/index.html")
  })
  .catch(error=>{
    console.log("error at")
  })
})
