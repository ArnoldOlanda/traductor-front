const URL = 'http://localhost:7000'

const palabras = document.getElementById('palabras');
const resultado = document.getElementById('resultado');
const btnTranslate = document.getElementById('btnTranslate');

let palabraSeleccionada = {};


const fetchData = async () =>{
    palabras.innerText='Cargando...'
    btnTranslate.style.display = 'none';
    
    const resp = await fetch(`${URL}/api/traducciones`)
    const data = await resp.json()
    const container = document.createElement('div');

    container.style.display='flex';
    container.style.flexDirection='column';

    data.forEach( palabra => {
        const label = document.createElement('label');
        label.classList.add('container');
        label.innerHTML=`
            ${palabra.quechua}(${palabra.espaniol})
            <input type="radio" id="${palabra.id}" value="${palabra.id}" name="palabras">
            <span class="checkmark"></span>
        `
        container.append(label)
    });

    palabras.innerHTML='';
    btnTranslate.style.display = 'initial';
    palabras.append(container);

    data.forEach(palabra => {
        const radio = document.getElementById(`${palabra.id}`)
        radio.addEventListener('change',() => {
            if(radio.checked) {
                palabraSeleccionada = palabra;
            }
        })
    })

}
btnTranslate.onclick = ()=>{
    resultado.innerHTML=''
    const arrImgs = palabraSeleccionada.senias.split(' ');
    arrImgs.forEach(img => {
        const image = document.createElement('img')
        image.src=`${URL}/img/${img}`
        resultado.append(image)
    });
}

fetchData()

