window.addEventListener('load', () => {
    // Данные о странах и зароботках
    const countriesData = [
        {country: 'США', salary: 15164},
        {country: 'Польша', salary: 10332},
        {country: 'Румыния', salary: 8492},
        {country: 'Литва', salary: 5432},
        {country: 'Болгария', salary: 4303},
        {country: 'Швейцария', salary: 1493}
    ];

    // Сортируем страны по убыванию зарплат

    let sortedCountries = countriesData.sort((a, b) => b.salary - a.salary);

    class Diagram {
        x = 50;
        y = 90;
        width = 70;
        height = 450;
        barSpacing = 40; // Отступ между столбцами

        renderColumns = (sortedCountries, ctx) => {

            console.dir(sortedCountries);
            // получаем максимальную зарплату
            let maxSalary = sortedCountries[0].salary;
            // масштабирование высоты колонок по сравнение с самлой большой
            let scaleFactor = this.height / maxSalary;

            sortedCountries.forEach((country, index) => {
                ctx.beginPath();
                let barHeight = country.salary * scaleFactor;
                // кординаты столибка
                let x = index * (this.width + this.barSpacing) + this.barSpacing;
                let y = this.height - barHeight;

                // делаем тень для колонок
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Цвет тени (черный полупрозрачный)
                ctx.shadowBlur = 5; // Размытие тени
                ctx.shadowOffsetX = 3; // Горизонтальное смещение тени
                ctx.shadowOffsetY = 3; // Вертикальное смещение тени

                //
                if (index === 0 || index === 1) {
                    ctx.fillStyle = "green";
                } else if (index === 2 || index === 3) {
                    ctx.fillStyle = "yellow";
                } else if (index === 4 || index === 5) {
                    ctx.fillStyle = "red";
                }
                // рисуем колонку
                ctx.fillRect(x + this.x, y + this.y, this.width, barHeight);
                ctx.closePath();
                ctx.beginPath();
                // рисуем зарплату
                ctx.textAlign = "center";
                ctx.fillStyle = "white"; // Здесь вы можете указать цвет текста
                ctx.font = '25px Arial';
                ctx.fillText(country.salary, x + this.x + 35, y + this.y - 20, 70);
                // рисуем название страны
                ctx.font = '25px Arial';
                ctx.fillText(country.country, x + this.x + 35, y + this.y + barHeight + 40, 90);
                ctx.closePath();
            });
        }
    }


    // Получаем ссылку на convas

    let convas = document.getElementById('myCanvas');
    let ctx = convas.getContext('2d');

    let diagram = new Diagram();
    diagram.renderColumns(sortedCountries, ctx);
})
