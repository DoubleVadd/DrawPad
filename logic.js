const canvas_slider = document.querySelector("#size"); //Slider for canvas size
const canvas_size = document.querySelector(".current-size"); //Description for the canvas Size
const container = document.querySelector('.canvas-block');
const color1 = document.querySelector('.color-1');
const color2 = document.querySelector('.color-2');
const all_color = document.querySelectorAll('.colors');

const color_array = ['#000000', '#ffffff', '#808080', '#FC0000','#FCF600','#1EFC00','#00FCF5','#0058FC','#FC008E', '#4F0C90'];




let c = 0;
all_color.forEach(e =>{
    e.style.backgroundColor = color_array[c];
    c +=1;
})

let selected_color = color1.value;

color1.addEventListener('change', e =>{
    e.target.style.zIndex =1;
    color2.style.zIndex =0;
    selected_color = e.target.value;
    color1.value = e.target.value;
    // color1.defaultValue =  e.target.value;
    // console.log(color1.defaultValue, 'aaaaaaaaaaaa');
})
color2.addEventListener('change', e =>{
    e.target.style.zIndex =1;
    color1.style.zIndex =0;
    selected_color = e.target.value;
})

all_color.forEach( this_color =>{
    this_color.addEventListener('click', e => {
        e.stopPropagation();
        let current_color = e.target.id;
        current_color = Number(current_color.replace('color',''));
        color1.value = color_array[current_color-1];
        selected_color = color1.value;
        console.log(color1.value, 'aaa')
    })

    
}
)

let mode = 'default'


const rainbow = document.querySelector('#rainbow');
let random = false;
rainbow.addEventListener('change', function() {
    if (this.checked) {
        mode = 'random'
    } else{
        mode = 'default'
    }
})




// Fresh Canvas
generateCanvas(canvas_slider.value);
drawingLogic();


canvas_slider.oninput = function () {

    deleteCanvas();
    generateCanvas(this.value);
    drawingLogic();

}



function colourBrush(mode){
    switch(mode){
        case 'random':
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        case 'opacity':
            return selected_color;
        default:
            return selected_color;
    }

}





function drawingLogic() {

    const canvas_pixels = document.querySelectorAll('.canvas-pixel');


    let drawing = false;

    container.addEventListener('mouseleave', (e) => {
        e.stopPropagation();
        drawing = false; 
        }
    );

    canvas_pixels.forEach(pixel => {

        pixel.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            drawing = true;  
            e.target.style.backgroundColor = colourBrush(mode); 
        });
        
        pixel.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if(drawing == true){
            e.target.style.backgroundColor = colourBrush(mode);    
            }
        });

        pixel.addEventListener('mouseup', (e) => {
            e.stopPropagation();
            drawing = false;  
        });

        // console.log(drawing);
    })

}



// Generates a canvas of size i*i and adds empty div blocks
// The size of each divs is based on it being a fraction of the total canvas size
function generateCanvas(pixel_val){

    // Sets teh canvas size description
    canvas_size.textContent = `${pixel_val} x ${pixel_val}`;

    // Creating divs (pixels)
    let i = 0;
    for(i ; i<(pixel_val*pixel_val) ; i++){
        const new_pixel = document.createElement('div');
        new_pixel.classList.add('canvas-pixel');
        new_pixel.style.backgroundColor ='#' + Math.floor(Math.random()*16777215).toString(16);
        new_pixel.style.backgroundColor ='white';

        container.appendChild(new_pixel);
    }

    // Selecting and setting size of each divs (pixels)
    const canvas_pixels = document.querySelectorAll('.canvas-pixel');

    let current_x = current_y = pixel_val;
    let pixel_size = 35/current_x;

    canvas_pixels.forEach((e)=>{
        e.style.height=`${pixel_size}rem`;
        e.style.width=`${pixel_size}rem`;

    })
}

// Empties the canvas to recreate the div
function deleteCanvas(){
    const container = document.querySelector('.canvas-block');
    container.innerHTML = '';
}



