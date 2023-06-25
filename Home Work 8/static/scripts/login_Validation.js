window.addEventListener('load', () => {

    let login_form = document.querySelector('.login__form'); // получаем дескриптор формы
    let validator = new Validator();

    ////////////////////////////////////////////////////////////////////////
    /* Валидация Логина */

    // получаем элемент ввода логина
    let loginInput = login_form.querySelector('#login');

    loginInput.addEventListener('input', function (e) {
        if (e.target.value.length > 0) {
            // задаем параметры для валидатора
            validator.Validator(e.target.value);
            // вызываем валидацию логина
            validator.loginValidation();
            // выводим ошибку в случае если есть ошибка
            if (validator.GetError().length > 0) {
                // задаем ошибку в поле ошибки
                login_form.querySelector('#error_login').innerHTML = validator.GetError();
                return;
            }
        }
        // обнуляем ошибку
        login_form.querySelector('#error_login').innerHTML = ' ';
    });

    ////////////////////////////////////////////////////////////////////////
    /* Валидация пароля */

    // получаем элемент ввода пароля
    let passwordInput = login_form.querySelector('#password');

    passwordInput.addEventListener('input', function (e) {
        if (e.target.value.length > 0) {
            // задаем параметры для валидатора
            validator.Validator(e.target.value);
            // вызываем валидацию логина
            validator.passwordValidation();

            // выводим ошибку в случае если есть ошибка
            if (validator.GetError().length > 0) {
                // Задаем ошибку в поле ошибки
                login_form.querySelector('#error_password').innerHTML = validator.GetError();
            } else {
                login_form.querySelector('#error_password').innerHTML = ' ';
            }
        } else {
            // обнуляем ошибку
            login_form.querySelector('#error_password').innerHTML = ' ';
        }
    });
});