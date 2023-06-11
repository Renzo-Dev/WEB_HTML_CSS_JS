(() => {
    console.dir(document)
    console.dir(document.body)

    //поис кодного элемента по совпадению идентификатора
    var pifTable = document.getElementById("myTable")
    console.dir(pifTable);
    pifTable.style.borderCollapse = "collapse";
    var tables = document.getElementsByClassName('myPifTable')
    console.dir(tables)

    if (pifTable != null) {
        var rows = pifTable.getElementsByTagName('tr');             //[ ]
        console.log(rows.length)
        for (let i = 0; i < rows.length; i++) {
            var thcells = rows[i].getElementsByTagName('th');
            for (let j = 0; j < thcells.length; j++) {
                thcells[j].style.border = '1px solid red';
                thcells[j].style.width = '50px';
                thcells[j].style.height = '50px';
                if (i == 0) thcells[j].innerHTML = j;
                else thcells[j].innerHTML = i;
                thcells[j].classList.add("bgGreen");
                thcells[j].classList.add("textWhite");
            }

        }

        //tdCells = pifTable.querySelector()          //one math
        tdCells = pifTable.querySelectorAll("td")       //many math
        for (let i = 0; i < tdCells.length; i++) {
            tdCells[i].style.border = '1px solid red';
            tdCells[i].style.width = '50px';
            tdCells[i].style.height = '50px';
            tdCells[i].addEventListener('click', (e) => {
                console.dir(e)
                //e.target - ссылка на обьект который сгенерировал это событие
                e.target.classList.toggle("active");
            })

            //mouseout - генерится когда указатель мыши уходит с тела обьекта
            tdCells[i].addEventListener('mouseout', (e) => {
                e.target.classList.remove('lighted')
            })
            //mouseout - генерится когда указатель мыши заходит в тело обьекта
            tdCells[i].addEventListener('mouseover', (e) => {
                e.target.classList.add('lighted')
            })
        }
    }

})()