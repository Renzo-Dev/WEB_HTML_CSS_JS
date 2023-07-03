// $(document).ready(()=>{
//
// }); // выполняется полсе загрузки страницы

// второй вариант
$(()=> {
        // Инициализация игрового поля
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        // Получение всех ячеек таблицы
        const $cells = $('.tic_tac_toe td');

        // Переменная для хранения текущего игрока
        let currentPlayer = 'X';

        // Картинки для крестика и нолика
        const crossImage = 'url(https://celes.club/uploads/posts/2022-11/1667389195_1-celes-club-p-krasnii-krestik-bez-fona-pinterest-1.png)';
        const circleImage = 'url(https://catherineasquithgallery.com/uploads/posts/2021-02/1614529166_67-p-krasnii-krug-na-belom-fone-71.png)';

        // Функция для обработки хода игрока
        function PlayerMove() {
            const cell = $(this);
            const rowIndex = cell.parent().index();
            const cellIndex = cell.index();

            // Проверка, что ячейка пуста
            if (board[rowIndex][cellIndex] === '') {
                // Установка значения в ячейку
                board[rowIndex][cellIndex] = currentPlayer;
                cell.css({
                    'background-image': getPlayerImage(currentPlayer),
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain'
                });

                // Проверка на победителя
                if (checkWinner(currentPlayer)) {
                    alert(`Игрок ${currentPlayer} победил!`);
                    resetGame();
                    return;
                }

                // Проверка на ничью
                if (checkTie()) {
                    alert("Ничья!");
                    resetGame();
                    return;
                }

                // Смена игрока
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

                // Ход компьютера
                ComputerMove();
            }
        }

        // Функция для обработки хода компьютера
        function ComputerMove() {
            // Получение случайной пустой ячейки
            let emptyCells = [];
            board.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    if (cell === '') {
                        emptyCells.push({ row: rowIndex, cell: cellIndex });
                    }
                });
            });

            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const randomCell = emptyCells[randomIndex];
                const cell = $(`.tic_tac_toe tr:eq(${randomCell.row}) td:eq(${randomCell.cell})`);

                // Установка значения в ячейку
                board[randomCell.row][randomCell.cell] = currentPlayer;
                cell.css({
                    'background-image': getPlayerImage(currentPlayer),
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain'
                });

                console.log(currentPlayer)
                console.dir(circleImage);
                console.dir(crossImage);

                // Проверка на победителя
                if (checkWinner(currentPlayer)) {
                    alert(`Игрок ${currentPlayer} победил!`);
                    resetGame();
                    return;
                }

                // Проверка на ничью
                if (checkTie()) {
                    alert("Ничья!");
                    resetGame();
                    return;
                }

                // Смена игрока
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }

        // Функция для получения картинки игрока
        function getPlayerImage(player) {
            return (player === 'X') ? crossImage : circleImage;
        }

        // Функция для проверки победителя
        function checkWinner(player) {
            // Проверка по горизонтали
            for (let i = 0; i < 3; i++) {
                if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
                    return true;
                }
            }

            // Проверка по вертикали
            for (let i = 0; i < 3; i++) {
                if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
                    return true;
                }
            }

            // Проверка по диагоналям
            if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
                return true;
            }
            if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
                return true;
            }

            return false;
        }

        // Функция для проверки ничьей
        function checkTie() {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        return false;
                    }
                }
            }
            return true;
        }

        // Функция для сброса игры
        function resetGame() {
            board.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    board[rowIndex][cellIndex] = '';
                    $cells.eq(rowIndex * 3 + cellIndex).css({
                        'background-image': 'none',
                    })
                });
            });
            currentPlayer = 'X';
        }

        // Назначение обработчика события на каждую ячейку
        $cells.on('click', PlayerMove);
});