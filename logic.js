const canvas_slider = document.querySelector("#size"); //Slider for canvas size
const canvas_size = document.querySelector(".current-size"); //Description for the canvas Size
const container = document.querySelector('.canvas-block')



// Fresh Canvas
generateCanvas(canvas_slider.value)
drawingLogic()


canvas_slider.oninput = function () {

    deleteCanvas();
    generateCanvas(this.value);
    drawingLogic()

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
            e.target.style.backgroundColor = 'black'; 
        });
        
        pixel.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if(drawing == true){
            e.target.style.backgroundColor = 'black';    
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



