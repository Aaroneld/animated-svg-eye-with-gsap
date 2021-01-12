
const eye = document.querySelector('#eye-proper');
const iris = document.querySelector('#iris-pupil');
const container = document.querySelector('#eye-container');

console.log(iris);
console.log(iris.getBoundingClientRect())

const bRect = iris.getBoundingClientRect()
const center = [bRect.x + bRect.width / 2, bRect.y + bRect.height / 2]

console.log(center);

let switcher = 0

container.addEventListener('mouseover', e => {

    if(switcher === 0) {
        console.log(e);
        switcher = 1
    }
    
});


container.addEventListener('click', e => {

    console.log(e.clientX, e.clientY);
});