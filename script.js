//create html element of the color
function creElementWithClass(tagname, classes) {
    const el = document.createElement(tagname);

    el.setAttribute('class', classes);

    return el;
}

/** initialize the color value and append the value and element to dom
 * 
 * @param {string} color : the value of the color; rbg or hex
 * @param {string} desc : the desc name of the color
 */
function createItem(color, desc) {
    const elItem = creElementWithClass('div', 'palette-item');
    const elmColor = creElementWithClass('div', 'palette-color');
    const elmDesc = creElementWithClass('div', 'palette-desc');
    const elmInput = creElementWithClass('input', 'palette-input');
    const lockIcon = '<div onclick="lockHandler(event)" class="lock-icon"><i class="fas fa-unlock"></i></div>';

    elmColor.style.background = color;
    elmInput.value = color;
    elmDesc.textContent = desc;

    elItem.appendChild(elmColor);
    elItem.appendChild(elmInput);
    elmColor.appendChild(elmDesc);
    elmColor.insertAdjacentHTML('beforeend', lockIcon);

    elmInput.onfocus = () => elmInput.select();

    return elItem;
}

const paletteContainer = document.querySelector('.palette');

fetch('data/color.json').then(Response => {
    return Response.json();
}).then(colorList => {
    for (const {
            desc,
            color
        } of colorList) {
        paletteContainer.appendChild(createItem(color, desc))
    }
})


//--------------------------------------------color generator process------------------------------------------
const colorGenerator = document.querySelector('.color-genegerator');
const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

colorGenerator.addEventListener('click', () => {
    const paletteItem = document.querySelectorAll('.palette-item');

    paletteItem.forEach(el => {
        //get the first children of the element .palette-item
        const colorPalette = el.children[0];

        //change the palettes with random color
        let getColor = generateRandomColor();
        if (colorPalette.children[1].children[0].className === 'fas fa-unlock') {
            //change all palette color name to generated color
            colorPalette.children[0].textContent = 'generated colour';

            //change the bg of the palette
            colorPalette.style.background = getColor;

            //change the hex of the color
            el.children[1].value = getColor;
        }

    });

})

function generateRandomColor() {
    let hex = '#'

    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(hexValues.length * Math.random());
        let randomValue = hexValues[randomIndex];
        hex = hex + randomValue;
    }
    return hex;
}


//--------------------------------------------Icon lock process------------------------------------------
function lockHandler(e) {
    const message = document.querySelector('.message');

    if (e.target.className === 'fas fa-unlock') {
        //add the popup animation to the message
        message.classList.add('animation');

        //delete the popup animation after 1s
        setTimeout(() => {
            message.classList.remove('animation')
        },1000)
        
        e.target.parentNode.innerHTML = '<i class="fas fa-lock"></i>';
    }

    if (e.target.className === 'fas fa-lock') {
        e.target.parentNode.innerHTML = '<i class="fas fa-unlock"></i>';
    }

}