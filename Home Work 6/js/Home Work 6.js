(() => {
    let sliderBlock = document.querySelector('.slider')
    if (sliderBlock != null) {
        let prevButton = sliderBlock.querySelector("#prevButton");
        let nextButton = sliderBlock.querySelector("#nextButton");
        let mainImage = sliderBlock.querySelector("#mainImage");
        let thumbnailBlock = sliderBlock.querySelector('.thumbnail-container');
        let smallImages = thumbnailBlock.querySelectorAll('.thumbnail');

        let currentPositonInStack = 0;

        smallImages[0].style.border = '5px solid yellow';

        /**
         * @description side == 1 => to right , side == -1 => left
         * @param side
         */

        let changeSlide = (side) => {
            switch (side) {
                case 1 : {
                    // next

                    smallImages[currentPositonInStack].style.border = 'none';
                    if (currentPositonInStack < smallImages.length - 1) {
                        currentPositonInStack++;
                        smallImages[currentPositonInStack].style.border = '5px solid yellow';
                    } else {
                        currentPositonInStack = 0;
                        smallImages[currentPositonInStack].style.border = '5px solid yellow';
                    }
                    break;
                }
                case -1: {
                    // prev

                    smallImages[currentPositonInStack].style.border = 'none';
                    if (currentPositonInStack !== 0) {
                        currentPositonInStack--;
                        smallImages[currentPositonInStack].style.border = '5px solid yellow';
                    } else {
                        currentPositonInStack = smallImages.length - 1;
                        smallImages[currentPositonInStack].style.border = '5px solid yellow';
                    }
                    break;
                }
            }
            console.log(currentPositonInStack);
            console.log(smallImages.length);
            mainImage.src = smallImages[currentPositonInStack].src;
        }

        nextButton.addEventListener("click", function (e) {
            changeSlide(1);
        });
        prevButton.addEventListener("click", function (e) {
            changeSlide(-1);
        });
        for (let i = 0; i < smallImages.length; i++) {
            smallImages[i].addEventListener("click", (e) => {
                smallImages[currentPositonInStack].style.border = 'none';
                currentPositonInStack = i;
                mainImage.src = smallImages[i].src;
                smallImages[i].style.border = '5px solid yellow';
            })
        }
    }
})();