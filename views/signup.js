async function signup(event){
    event.preventDefault(event);
    const Name = event.target.nam.value;
    const Email = event.target.gmail.value;
    const PassWord = event.target.pass.value;
    
   
    const obj = {
        Name,
        Email,
        PassWord
    }
    axios.post('http://localhost:3000/user/signup', obj)
    .then((response)=>{
        
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
}