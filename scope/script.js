var ul;  //global scope
var liItems; //global scope
var imageWidth; //global scope
var imageNumber; //global scope

function init(){

    ul = document.getElementById(‘image_slider’);
    liItems = ul.children;
    imageNumber = liItems.length;
    imageWidth = liItems[0].children[0].offsetWidth;
    // set ul’s width as the total width of all images in image slider.
    ul.style.width = parseInt(imageWidth * imageNumber) + ‘px’;
    slider(ul);
}

/**delta function is to set how the image slide—keep still for a while and move to next picture.
*step function will be called many times until clearInterval() been called
* currentImage * imageWidth is the currentImage position of ul
* delta start from 0 to 1, delta * imageWidth is the pixels that changes
**/
function slider(ul){ 
    animate({
        delay:17,
        duration: 3000,
        delta:function(p){return Math.max(0, -1 + 2 * p)},
        step:function(delta){
            ul.style.left = ‘-’ + parseInt(currentImage * imageWidth + delta * imageWidth) + ‘px’;
    },
        callback:function(){
            currentImage++; // currentImage staat in de global scope
        // if it doesn’t slied to the last image, keep sliding
            if(currentImage < imageNumber-1){
                slider(ul);
        }
       // if current image it’s the last one, it slides back to the first one
            else{
                var leftPosition = (imageNumber - 1) * imageWidth; // var leftPosition staat in de local scope 
               // after 2 seconds, call the goBack function to slide to the first image 
                setTimeout(function(){goBack(leftPosition)},2000); 
                setTimeout(function(){slider(ul)}, 4000);
            }
        }
    });
}

function goBack(leftPosition){
    currentImage = 0; 
    var id = setInterval(function(){ // var id staat in de local scope 
        if(leftPosition >= 0){
            ul.style.left = ‘-’ + parseInt(leftPosition) + ‘px’;
            leftPosition -= imageWidth / 10;
        }
        else{
            clearInterval(id);
        } 
    }, 17);
}

//generic animate function
function animate(opts){
    var start = new Date; // var start staat in de local scope 
    var id = setInterval(function(){ // var id staat in de local scope
        var timePassed = new Date - start; // var timepassed staat in de local scope
        var progress = timePassed / opts.duration // var progress staat in de local scope
        if(progress > 1){
            progress = 1;
        }
        var delta = opts.delta(progress); // var delta staat in de local scope
        opts.step(delta);
        if (progress == 1){
            clearInterval(id);
           opts.callback();
         }
    }, opts.dalay || 17);
}
window.onload = init;