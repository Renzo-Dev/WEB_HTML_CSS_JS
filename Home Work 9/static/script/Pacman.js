window.addEventListener('load', function () {
    const canvas = document.getElementById('MyCanvas');
    const ctx = canvas.getContext('2d');

    const pacman = {
        x: 200,
        y: 250,
        radius: 30,
        mouthOpen: true,
        mouthAngle: 0,
        speed: 2,
        direction: 'right',
    };

    function drawPacman() {
        ctx.save(); // Сохраняем текущую трансформацию контекста

        // Перемещаем контекст в центр Пакмана
        ctx.translate(pacman.x, pacman.y);

        // Вычисляем угол поворота головы Пакмана в зависимости от направления
        let angle;
        switch (pacman.direction) {
            case 'up':
                angle = -Math.PI / 2;
                break;
            case 'down':
                angle = Math.PI / 2;
                break;
            case 'left':
                angle = Math.PI;
                break;
            case 'right':
            default:
                angle = 0;
                break;
        }

        // Поворачиваем контекст на вычисленный угол
        ctx.rotate(angle);

        // Рисуем голову Пакмана с учетом поворота
        ctx.beginPath();
        ctx.arc(0, 0, pacman.radius, pacman.mouthAngle, Math.PI * 2 - pacman.mouthAngle);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = 'yellow';
        ctx.fill();

        ctx.restore(); // Восстанавливаем сохраненную трансформацию контекста
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        clearCanvas();
        drawPacman();

        // Обновляем угол открытия рта, чтобы симулировать открытие и закрытие
        if (pacman.mouthOpen) {
            pacman.mouthAngle += 0.1;
            if (pacman.mouthAngle >= Math.PI / 4) {
                pacman.mouthOpen = false;
            }
        } else {
            pacman.mouthAngle -= 0.1;
            if (pacman.mouthAngle <= 0) {
                pacman.mouthOpen = true;
            }
        }

        // Обновляем позицию в зависимости от направления
        switch (pacman.direction) {
            case 'up':
                if (pacman.y > 30) {
                    pacman.y -= pacman.speed;
                }
                break;
            case 'down':
                if (pacman.y < document.getElementById("MyCanvas").height - 30) {
                    pacman.y += pacman.speed;
                }
                break;
            case 'left':
                if (pacman.x > 30) {
                    pacman.x -= pacman.speed;
                }
                break;
            case 'right':
                if (pacman.x < document.getElementById("MyCanvas").width - 30) {
                    pacman.x += pacman.speed;
                }
                break;
        }

        requestAnimationFrame(update);
    }

// Обрабатываем клавиатурный ввод
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 38: // Стрелка вверх
                pacman.direction = 'up';
                break;
            case 40: // Стрелка вниз
                pacman.direction = 'down';
                break;
            case 37: // Стрелка влево
                pacman.direction = 'left';
                break;
            case 39: // Стрелка вправо
                pacman.direction = 'right';
                break;
        }
    });

    update();
});