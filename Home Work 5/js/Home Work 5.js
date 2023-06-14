(() => {
    window.addEventListener('load', function () {
        // поиска каждого элемента по совпадению идентификатора
        let pifTable = document.getElementById("myTable");
        pifTable.style.borderCollapse = "collapse";
                
        if (pifTable != null) {
            // получаем строки
            let rows = pifTable.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                // получаем все заголовки в таблице
                let thCells = rows[i].getElementsByTagName('th');
                for (let j = 0; j < thCells.length; j++) {
                    thCells[j].classList.add("tableHead");
                    // задаем значения для заголовков
                    if (i == 0) thCells[j].innerHTML = j;
                    else thCells[j].innerHTML = i;
                    thCells[j].classList.add("bgTable");
                    thCells[j].classList.add("textColor");
                }
            }

            let tdCells = pifTable.querySelectorAll('td');

            for (let i = 0; i < tdCells.length; i++) {
                tdCells[i].classList.add("tableBox");
                tdCells[i].classList.add("textColor");

                //mouseout - генерится когда указатель мыши уходит с тела обьекта
                tdCells[i].addEventListener('mouseout', function (e) {
                    let tmpRow = e.target.parentNode.rowIndex * 10 - 10;
                    let tmpCol = e.target.parentNode.rowIndex * 10 - 10 + e.target.cellIndex - 1;
                    for (let s = tmpRow; s < tmpRow + e.target.cellIndex; s++) {
                        tdCells[s].classList.remove('lighted');
                    }
                    for (let g = tmpCol; g > 0; g -= 10) {
                        tdCells[g].classList.remove('lighted');
                    }
                });
                tdCells[i].addEventListener('mouseover', function (e) {
                    let tmpRow = e.target.parentNode.rowIndex * 10 - 10;
                    let tmpCol = e.target.parentNode.rowIndex * 10 - 10 + e.target.cellIndex - 1;
                    for (let s = tmpRow; s < tmpRow + e.target.cellIndex; s++) {
                        tdCells[s].classList.add('lighted');
                    }
                    for (let g = tmpCol; g > 0; g -= 10) {
                        tdCells[g].classList.add('lighted');
                    }
                });
            }

            let counter = 0;
            for (let i = 1; i < 11; i++) {
                for (let j = 1; j < 11; j++) {
                    tdCells[counter].innerText = i * j;
                    counter++;
                }
            }
        }
    })
})()