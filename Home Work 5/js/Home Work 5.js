(() => {
    window.addEventListener('load', function () {
        // поиска каждого элемента по совпадению идентификатора
        let pifTable = document.getElementById("myTable");
        console.dir(pifTable);
        pifTable.style.borderCollapse = "collapse";

        if (pifTable != null) {
            // получаем строки
            let rows = pifTable.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                // получаем все заголовки в таблице
                let thcells = rows[i].getElementsByTagName('th');
                for (let j = 0; j < thcells.length; j++) {
                    thcells[j].style.border = '1px solid red';
                    thcells[j].style.width = '50px';
                    thcells[j].style.height = '50px'
                    // задаем значения для заголовков
                    if (i == 0) thcells[j].innerHTML = j;
                    else thcells[j].innerHTML = i;
                    thcells[j].classList.add("bgTable");
                    thcells[j].classList.add("textColor")
                }
            }
        }

        tdCells

    })
})()