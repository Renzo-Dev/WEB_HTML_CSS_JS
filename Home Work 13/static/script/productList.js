$(() => {
    let responseData = {
        products: null
    }
    let selectedRow = null;
    $.get('https://dummyjson.com/products?skip=0&limit=100', {}).done((data) => {
        if (data != null) {
            responseData.products = data.products;
            console.dir(responseData);

            let currentProducts = responseData.products;
            let $table = $('.table-products');
            renderTable(responseData.products, $table);

            // при клике на элемент выводит ShowModal
            $table.find('td').on('click', (e) => {
                if (selectedRow != null) selectedRow.removeClass('selected');
                selectedRow = $(e.target).closest('tr').addClass('selected');
            }).on('dblclick', (e) => {
                let idProduct = parseInt($(e.target).closest('tr').first().text());
                showModal(idProduct);
            });

            let $buttRestart = $("#buttonRestart");
            $buttRestart.on('click', () => {
                currentProducts = responseData.products;
                $table.empty();
                renderTable(responseData.products, $table);
            });

            let $buttPriceRange = $("#ApplyPrice");
            $buttPriceRange.on('click', () => {
                let minPrice = 0;
                let maxPrice = 99999;

                if (parseInt($("#PriceFrom").val()) > 0) {
                    minPrice = parseInt($("#PriceFrom").val());
                }
                if (parseInt($("#PriceTo").val()) > 0) {
                    maxPrice = parseInt($("#PriceTo").val());
                }
                if (minPrice + maxPrice > 0) {
                    let minMaxProducts = [];

                    currentProducts.forEach((oneProduct) => {
                        if (parseInt(oneProduct.price) >= minPrice && parseInt(oneProduct.price) <= maxPrice) {
                            minMaxProducts.push(oneProduct);
                        }
                    });
                    $table.empty();
                    renderTable(minMaxProducts, $table);
                }
            });

            let $buttRatingRange = $("#ApplyRating");
            $buttRatingRange.on('click', () => {
                let minRating = 0.0;
                let maxRating = 999999;
                if (parseFloat($("#ratingFrom").val()) > 0) {
                    minRating = parseFloat($("#ratingFrom").val());
                }
                if (parseFloat($("#ratingTo").val()) > 0) {
                    maxRating = parseFloat($("#ratingTo").val());
                }
                if (minRating + maxRating > 0) {
                    let minMaxProducts = [];

                    currentProducts.forEach((oneProduct) => {
                        if (parseFloat(oneProduct.rating) >= minRating && parseFloat(oneProduct.rating) <= maxRating) {
                            minMaxProducts.push(oneProduct);
                        }
                    });
                    $table.empty();
                    renderTable(minMaxProducts, $table);
                }
            });

            let $buttSearch = $("#buttonSearch");
            $buttSearch.click(function () {
                if ($("#textSearch").val().length > 3) {
                    let subString = $("#textSearch").val();
                    // создаем массив с найденными продуктами
                    let searchProducts = [];
                    responseData.products.forEach((oneProduct) => {
                        if (oneProduct.title.toLowerCase().includes(subString.toLowerCase())) {
                            searchProducts.push(oneProduct);
                        }
                    })
                    $table.empty();
                    currentProducts = searchProducts;
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
