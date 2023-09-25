const canvas_slider = document.querySelector("#size");
const canvas_size = document.querySelector(".current-size");


// Logic to create X by Y canvas
const container = document.querySelector('.canvas-block')
const current_canvas = document.getElementById('canvas')


console.log(canvas_slider.value)



function generateCanvas(pixel_val){
    let i = 0;
    for(i ; i<(pixel_val*pixel_val) ; i++){
        const new_pixel = document.createElement('div');
        new_pixel.classList.add('canvas-pixel');
        new_pixel.style.backgroundColor ='#' + Math.floor(Math.random()*16777215).toString(16);
        current_canvas.appendChild(new_pixel);
    }

    const canvas_pixels = document.querySelectorAll('.canvas-pixel')

    let current_x = current_y = pixel_val;
    let pixel_size = 35/current_x;

    canvas_pixels.forEach((e)=>{
    // console.log(e)
        e.style.height=`${pixel_size}rem`;
        e.style.width=`${pixel_size}rem`;

    })
}

function deleteCanvas(){
    const container = document.querySelector('.canvas-block');
    container.innerHTML = '';
}



generateCanvas(canvas_slider.value)



canvas_slider.oninput = function () {

    deleteCanvas();
    canvas_size.textContent = `${this.value} x ${this.value}`;
    generateCanvas(this.value);

}




