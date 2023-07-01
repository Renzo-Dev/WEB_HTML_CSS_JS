window.addEventListener('load', () => {
    let createDOMElement = (tagName = '', options = {}, parent = null) => {
        if (tagName.length == 0) console.error("Имя тега не определено");
        let node = document.createElement(tagName);
        for (const key in options) {
            node.setAttribute(key, options[key]);
        }
        parent.appendChild(node);
        return node;
    }
    let currencyContainer = document.querySelector('.currency');

    let header = createDOMElement('div', {
        class: 'currency-header',
        title: 'Панель элементов'
    }, currencyContainer);

    let body = createDOMElement('div', {
        class: 'currency-body',
        title: 'Список доступных валют'
    }, currencyContainer);

    let renderTable = (curenciesList) => {
        let table = createDOMElement('table', {
            class: 'currency-table-list'
        }, body);
        let headRow = createDOMElement('tr', {}, table);
        let headTitles = ["Код валюти", "Название", "Стоимость", "ISO 4217"];
        headTitles.forEach((value, index) => {
            createDOMElement('th', {}, headRow).innerHTML = value;
        })
        curenciesList.forEach((oneCurr, index) => {
            let oneRow = createDOMElement('tr', {}, table);
            createDOMElement('td', {}, oneRow).innerHTML = oneCurr.r030;
            createDOMElement('td', {}, oneRow).innerHTML = oneCurr.txt;
            createDOMElement('td', {}, oneRow).innerHTML = oneCurr.rate;
            createDOMElement('td', {}, oneRow).innerHTML = oneCurr.cc;
        })
    }

    let fill__selector__list__currencies = (currencyList) => {
        // получаем элемент блока ( select )
        let selector__second__list__cur = second__currency.querySelector('.select__currency');

        currencyList.forEach((curr) => {
            createDOMElement('option', {}, selector__second__list__cur).innerHTML = curr.txt;
        })
    }

    let environment = {
        currenciesList: [],
        selectedDate: '20230624',
    }
    environment.bankUriApi = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${environment.selectedDate}&json`

    fetch(environment.bankUriApi, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((currencies) => {
        environment.currenciesList = currencies;
        renderTable(environment.currenciesList);
        fill__selector__list__currencies(environment.currenciesList);
        converter(environment.currenciesList);
    });

    let first__currency = document.getElementById('first__currency');
    let second__currency = document.getElementById('second__currency');

    let converter = (currencies) => {

        first__currency.querySelector('.currency__value').addEventListener('input', (e) => {

            let selectElement = second__currency.querySelector('.select__currency');

            // Получаем выбранный элемент option
            let selectedOption;

            for (var i = 0; i < selectElement.options.length; i++) {
                if (selectElement.options[i].selected) {
                    selectedOption = selectElement.options[i];
                    break;
                }
            }
            let currency = currencies.find(function (curr) {
                return curr.txt.toLowerCase() === selectedOption.value.toLowerCase();
            });

            let second__value = second__currency.querySelector('.currency__value');
            second__value.value = e.target.value * currency.rate;

            // console.log(selectedOption.value);
            console.dir(currency.rate);
        })
    }

});