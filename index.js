window.addEventListener('load', () => {
    const template = (bandera, nombre, capital, poblacion) => {
        return `
            <div class="col mb-3">
                <div class="card">
                    <img src="${bandera}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">Capital: ${capital}</p>
                        <p class="card-text">Población: ${poblacion}</p>
                    </div>
                </div>
            </div>
        `;
    };
    
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    const alert = document.getElementById('alert')
    form.addEventListener('submit', (evet) => {
        evet.preventDefault()
        result.innerHTML = ''
        fetch('https://restcountries.eu/rest/v2/name/' + input.value) // Se agrega la URL donde se pedira la información 
        .then((res) => { // Recibe la respusta si el request funciona bien 
            console.log('res', res)
            if (res.status < 200 || res.status >= 300) { // Valida el status del request 
                alert.innerHTML = '<div class="alert alert-danger" role="alert">No hay resultados</div>'
                return Promise.reject(res.status) // Envia el request al catch 
            }else {
                return res.json() // Como el json es una promesa dentro de otra promesa, se realiza otro .then() 
            }   
        })
        .then((data) => { // Recibe la respuesta del la promesa del jason
            console.log(data)
            data.forEach(element => {
                const card = template(element.flag, element.name, element.capital, element.population)
                result.innerHTML += card
            });
        })
        .catch((err) => { // El request  tubo un error 
            
        })
    })
})




