$(() => {
    let responseData = {
        products: null
    }
    let selectedRow = null;
    $.get('https://dummyjson.com/products?skip=0&limit=100', {}).done((data) => {
        if (data != null) {
            responseData.products = data.products;
            console.dir(responseData);
            let $table = $('.table-products');
            renderTable(responseData.products, $table);

            $table.find('td').on('click', (e) => {
                if (selectedRow != null) selectedRow.removeClass('selected');
                selectedRow = $(e.target).closest('tr').addClass('selected');
            }).on('dblclick', (e) => {
                let idProduct = parseInt($(e.target).closest('tr').first().text());
                showModal(idProduct);
            });

            let $buttApply = $("#ApplyPrice");
            $buttApply.click(function () {
                let priceMin = 0;
                if ($("#PriceFrom").val() >= 0) {
                    priceMin = $("#PriceFrom").val();
                    let priceMax = 999999;
                    if ($("#PriceTo").val() >= 0) {
                        priceMax = $("#PriceTo").val();
                    }

                    let minMaxProducts = [];
                    responseData.products.forEach((oneProduct) => {
                        if ((oneProduct.price >= priceMin) && (oneProduct.price <= priceMax)) {
                        } else {
                            minMaxProducts.push(oneProduct);
                        }
                    })
                    console.dir(minMaxProducts);
                }
            })

            let $buttSearch = $("#buttonSearch");
            $buttSearch.click(function () {
                if ($("#textSearch").val().length > 3) {
                    let subString = $("#textSearch").val();
                    // создаем массив с найденными продуктами
                    let searchProducts = [];
                    responseData.products.forEach((oneProduct) => {
                        if (oneProduct.title.toLowerCase().indexOf(subString.toLowerCase())) {
                            oneProduct.includes()
                        } else {
                            searchProducts.push(oneProduct);
                        }
                    })
                    $table.empty();
                    renderTable(searchProducts, $table);
                    $table.find('td').on('click', (e) => {
                        if (selectedRow != null) selectedRow.removeClass('selected');
                        selectedRow = $(e.target).closest('tr').addClass('selected');
                    }).on('dblclick', (e) => {
                        let idProduct = parseInt($(e.target).closest('tr').first().text());
                        showModal(idProduct);
                    });
                }
            });

        }
    })
    let renderRowHead = (options = []) => {
        let $row = $('<tr>');
        for (let i = 0; i < options.length; i++) {
            $row.append($('<th>').text(options[i]));
        }
        return $row;
    };
    let renderRowBody = (data = {}, options = []) => {
        let $row = $('<tr>');
        for (const key in data) {
            for (let i = 0; i < options.length; i++) {
                if (options[i] === key) {
                    $row.append($('<td>').text(data[key]));
                }
            }
        }
        return $row;
    }
    let renderTable = (products, parent) => {
        let tableOptions = ['id', 'title', 'price', 'rating', 'brand', 'category'];
        parent.append(renderRowHead(tableOptions))
        products.forEach((oneProduct) => {
            parent.append(renderRowBody(oneProduct, tableOptions));
        })
    }
    let showModal = (idProduct) => {
        let product = null;
        for (let i = 0; i < responseData.products.length; i++) {
            if (responseData.products[i].id === idProduct) {
                product = responseData.products[i];
                break;
            }
        }

        $(".modal-description").text(product.description);
        $(".modal-brand").text(product.brand);
        $("#productImg").attr("src", product.thumbnail);

        $("#exampleModal").modal('show');
        let $buttClose = $("#exampleModal .btn-close-modal");
        $buttClose.on("click", function () {
            $("#exampleModal").modal('hide');
        });
    }
})
