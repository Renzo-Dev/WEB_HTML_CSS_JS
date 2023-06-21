window.addEventListener('load', function () {

    setTimeout(index => {
        var bannerBlock = document.createElement('div');
        bannerBlock.style.width = '400px';
        bannerBlock.style.height = '300px';
        bannerBlock.style.zIndex = '99998';
        bannerBlock.style.position = 'fixed';
        bannerBlock.style.bottom = '15px';
        bannerBlock.style.right = '15px';
        bannerBlock.style.borderRadius = '15px';
        bannerBlock.style.boxShadow = "0 0 10px rgba(0,0,0,5)";
        bannerBlock.innerHTML = "<video muted=\"\" autoplay=\"\" loop=\"\" name=\"media\" width=\"400\" height=\"300\" id=\"rz-banner-img\" src=\"https://s0.rozetka.com.ua/video/weblayer_birthdayparty_120623.mp4\" poster=\"https://content.rozetka.com.ua/files/images/original/342646172.jpg\" type=\"video/mp4\">\n" +
            "</video>";
        bannerBlock.getElementsByTagName('video').item(index).style.borderRadius = '15px';

        document.body.appendChild(bannerBlock);

        // созданее бордера для таймера
        // let borderTimer = document.createElement('div');
        // borderTimer.classList.add('border-timer');
        // borderTimer.style.width = '400px';
        // borderTimer.style.height = '100px';
        // borderTimer.style.position = 'fixed';
        // borderTimer.style.bottom = '15px';
        // borderTimer.style.right = '15px';
        // borderTimer.style.zIndex = '100000';
        // borderTimer.style.backgroundColor = 'black';
        // borderTimer.style.opacity = '80%';
        // borderTimer.style.borderBottomLeftRadius = '15px';
        // borderTimer.style.borderBottomRightRadius = '15px';
        // borderTimer.style.display = 'flex';
        // bannerBlock.appendChild(borderTimer); // бордер для таймера

        var closeX = document.createElement('img');
        closeX.setAttribute('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAugAAALoBTx5ghQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGhSURBVEiJpZS/btNQFIe/392qOixd+iK2mBCqs3TjAZBgYYkKlZiY2hipA0tBEBVlYmJnYoq7MOG8BqgP4CAUqfJhoKlC6nt9HX6jzznfd637RwD1QfpA0geDRNhJUs4/s0UWefrYUCGoG3h+r6y+qR7efyhrvgI7N31m2NGgnF/0gdd5OhKaALr59NucHTpZM12DA0hoUufp6D/gADtqNHXAXstMtMQDX2XPIc48s52SDjiYzlwyq96aKIKSg+xos/BrmD4LwsWb5PL7u9tiPczGMk49IjPjxeCymqzgZpoG4bPqFZsNMRLnbBkLvyPokgjMPHNtcG9jx5+0pwXuX0lfiQceFERLAnAAF5p12E/AfHUDrOFH2O9J51Fc86wf4ShBD3in5A5gC3hQ8s8exNzQ4LMi3m8+K7egPte/z7OivvBVYiVa5NkT4JMPbqIYzKpxW63O00LoxCdBPNUiz66A/b7wSMmVA5bbwgEG5fzUsNee8tJJOgaut4F3SK7VuOO/m5xnjww+ArvAOCmr81j4ehZ59lJQGNSC0W5ZffkDcV/60qJU4rYAAAAASUVORK5CYII=")
        closeX.setAttribute('alt', "Close button")
        closeX.setAttribute('title', "Закрыть Баннер")
        closeX.style.position = 'fixed';
        closeX.style.zIndex = '100001';
        closeX.style.cursor = 'pointer';
        closeX.style.visibility = 'hidden';
        bannerBlock.appendChild(closeX);

        setTimeout(() => {
            closeX.style.visibility = 'visible'
        }, 2000);

        closeX.style.top = (window.innerHeight - bannerBlock.clientHeight) + 'px';
        closeX.style.left = (window.innerWidth - closeX.clientWidth * 2) + 'px';

        let closeClickCounter = 0;
        closeX.addEventListener('mouseover', function (re) {
            closeClickCounter++;
            if (closeClickCounter < 3) {
                // телепортировать крестик в рандомную позицию
                closeX.style.top = (window.innerHeight - bannerBlock.clientHeight - (100 + Math.random() * (bannerBlock.clientHeight))) + 'px';
                closeX.style.left = (window.innerWidth - closeX.clientWidth * 2 - (100 + Math.random() * (bannerBlock.clientWidth))) + 'px';
            }
        });
        closeX.addEventListener('click', function (re) {
            console.log(closeClickCounter);
            if (closeClickCounter > 2) {
                bannerBlock.style.visibility = 'hidden';
                closeX.style.visibility = 'hidden';
            }
        });
    }, 100);

    class Timer {
        #_seconds = 0;
        #_minutes = 0;
        #_hours = 0;
        #_days = 0;

        constructor(sec, min, hours, days) {
            this.#_seconds = sec;
            this.#_minutes = min;
            this.#_hours = hours;
            this.#_days = days;
            this.Start();
        }

        Start = () => {
            // получаем наши элементы
            let day = document.getElementById('day');
            let hour = document.querySelector('#hour');
            let min = document.querySelector('#minutes');
            let sec = document.querySelector('#seconds');

            day.textContent = this.#_days;
            hour.textContent = this.#_hours;
            min.textContent = this.#_minutes;
            sec.textContent = this.#_seconds;


            // изменяем их с интервалом в одну секунду


            let refreshID = setInterval(() => {
                if ((this.#_days + this.#_hours + this.#_minutes + this.#_seconds) === 0) {
                    document.querySelector('.border-timer').style.visibility = 'hidden';
                    clearInterval(refreshID);
                }

                if (this.#_seconds < 0) {
                    if (this.#_minutes > 0) {
                        this.#_minutes--;
                        this.#_seconds = 60;
                        sec.textContent = this.#_seconds;
                        min.textContent = this.#_minutes;
                    } else {
                        if (this.#_hours > 0) {
                            this.#_hours--;
                            this.#_minutes = 59;
                            this.#_seconds = 60;
                            sec.textContent = this.#_seconds;
                            min.textContent = this.#_minutes;
                            hour.textContent = this.#_hours;
                        } else {
                            if (this.#_days > 0) {
                                this.#_days--;
                                this.#_hours = 23;
                                this.#_minutes = 59;
                                this.#_seconds = 60;
                                sec.textContent = this.#_seconds;
                                hour.textContent = this.#_hours;
                                min.textContent = this.#_minutes;
                                day.textContent = this.#_days;
                            }
                        }
                    }
                } else {
                    sec.textContent = this.#_seconds;
                    this.#_seconds--;
                }
            }, 1000);
        }
    }

    let isTimerOn = true;
    if (isTimerOn) {
        document.querySelector('.border-timer').style.visibility = 'visible';
        // выставляем время длв таймера
        let timer = new Timer(2, 0, 0, 0);
    }
});