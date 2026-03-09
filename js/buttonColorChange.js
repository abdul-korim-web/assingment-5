const buttonColorChange = (id)=>{
    const allbtn = document.getElementById("Allbtn")
    const openbtn = document.getElementById("Openbtn")
    const closebtn = document.getElementById("Closedbtn")
    const clickbtn = document.getElementById(id)
    allbtn.classList.remove("active")
    openbtn.classList.remove("active")
    closebtn.classList.remove("active")
    clickbtn.classList.add("active")
}