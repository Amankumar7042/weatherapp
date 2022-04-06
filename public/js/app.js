const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#one')
const messagetwo = document.querySelector('#two')



weatherform.addEventListener('submit', (e)=>{
        e.preventDefault()
        messageOne.textContent = 'LOADING...'
        messagetwo.textContent = '';
        const address = search.value
        fetch("http://localhost:3000/weather?address="+encodeURIComponent(address)+"").then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.place_name;
                messagetwo.textContent = data.forcastdata;
            }
        })
    })

})