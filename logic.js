const canvas_slider = document.querySelector("#size"); //Slider for canvas size
const canvas_size = document.querySelector(".current-size"); //Description for the canvas Size
const container = document.querySelector('.canvas-block');
const color1 = document.querySelector('.color-1');
const color2 = document.querySelector('.color-2');
const all_color = document.querySelectorAll('.colors');

const color_array = ['#000000', '#ffffff', '#000000', '#ffffff', '#808080', '#FC0000','#FCF600','#1EFC00','#00FCF5','#0058FC','#0058FC','#FC008E'];

let c = 0;
all_color.forEach(e =>{
    console.log(c)
    e.style.backgroundColor = color_array[c];
    console.log(e)
    c +=1;
})

let selected_color = color1.value;

color1.addEventListener('change', e =>{
    e.target.style.zIndex =1;
    color2.style.zIndex =0;
    selected_color = e.target.value;
})
color2.addEventListener('change', e =>{
    e.target.style.zIndex =1;
    color1.style.zIndex =0;
    selected_color = e.target.value;
})


console.log(selected_color);


// Fresh Canvas
generateCanvas(canvas_slider.value);
drawingLogic();


canvas_slider.oninput = function () {

    deleteCanvas();
    generateCanvas(this.value);
    drawingLogic();

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
            e.target.style.backgroundColor = selected_color; 
        });
        
        pixel.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if(drawing == true){
            e.target.style.backgroundColor = selected_color;    
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



