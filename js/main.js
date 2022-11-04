var url = window.location.href;
//sve f-je
//globalnefunkcije
const baseurl = "data/";
//ajax callback
function ajaxCallBack(url, method, result) {
    $.ajax({
        url: url,
        method: method,
        dataType: "json",
        success: result,
        error: function (xhr) { console.log(xhr); }
    });
}
//sort by rate
function rating() {
    var izabrano = document.querySelector("#rate").value;
    var productForSortbyRate = JSON.parse(localStorage.getItem('productsLocal'));
    if (izabrano == 'LB') {
        productForSortbyRate = productForSortbyRate.sort(function (a, b) {
            return a.brojZvezdica - b.brojZvezdica;
        })
    }
    else if (izabrano == 'BL') {
        productForSortbyRate = productForSortbyRate.sort(function (a, b) {
            return b.brojZvezdica - a.brojZvezdica;
        })
    }
    productIspis(productForSortbyRate);
}
//sort by values
function sortiranje() {
    var izabrano = document.querySelector("#selected").value;
    var productForSort = JSON.parse(localStorage.getItem('productsLocal'));
    //console.log(idproizovda)
    if (izabrano == 'izaberi') {
        ajaxCallBack(baseurl + "proizvodi.json", "GET", function (result) {
            //console.log(result);
            productIspis(result);
        });
    }
    else if (izabrano == 'rastuceCena') {
        productForSort = productForSort.sort(function (a, b) {
            return a.cena - b.cena;
        })
    }
    else if (izabrano == 'opadajuceCena') {
        productForSort = productForSort.sort(function (a, b) {
            return b.cena - a.cena;
        })
    }
    else if (izabrano == 'rastuceNaziv') {
        productForSort = productForSort.sort(function (a, b) {
            if (a.naslov > b.naslov) {
                return 1;
            }
            else if (a.naslov < b.naslov) {
                return -1;
            }
            return 0;
        })
    }
    else if (izabrano == 'opadajuceNaziv') {
        productForSort = productForSort.sort(function (a, b) {
            if (a.naslov > b.naslov) {
                return -1;
            }
            else if (a.naslov < b.naslov) {
                return 1;
            }
            return 0;
        })
    }
    productIspis(productForSort);
}


//typing
function typing() {
    let tekst = document.getElementById("text");
    const slova = ["W", "E", "L", "C", "O", "M", "E", " ", "T", "O", " ", "O", "U", "R", " ", "S", "H", "O", "P"];
    //ispis
    setTimeout(
        () =>
            slova.forEach((slova, i) => {
                setTimeout(() => {
                    tekst.innerHTML += slova;
                }, i * 500);
            }),
        //brzina kucanja
        500
    );
}
//social
function ispisSocial() {
    let socWrapper = document.querySelector('.social-info');
    let ispisSoc = '';
    const mreze = ["fa fa-instagram", "fa fa-facebook", "fa fa-google", "fa fa-linkedin"]
    const linkovi = ["www.instagram.com", "www.facebook.com", "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=kimixphotography@gmail.com", "www.linkedin.com"];
    for (let i = 0; i < mreze.length; i++) {
        ispisSoc += `<a href = "${linkovi[i]}"><i class="${mreze[i]}" aria-hidden="true"></i></a> `;
    }
    socWrapper.innerHTML = ispisSoc;
}
//newsletter
function newsletter() {
    let newsWrapper = document.querySelector('.newsletter-area');
    let ispisNews = `<div class="container">
        <div class="row align-items-center">
            <!-- Newsletter Text -->
            <div class="col-12 col-lg-6 col-xl-7">
                <div class="newsletter-text mb-100">
                <h2>Subscribe for a <span>25% Discount</span></h2>
        <p>Enter your email to get a discount</p>
                </div>
            </div>
            <!-- Newsletter Form -->
            <div class="col-12 col-lg-6 col-xl-5">
                <div class="newsletter-form mb-100">
                    <form>
                        <input type="email" name="email" class="nl-email text-center" placeholder="Your E-mail">
                        <input type="button" class="btn amado-btn w-100" id="newsSend" value="Subscribe">
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>`;
    newsWrapper.innerHTML = ispisNews;
}
//footernav
function ispisFooterNav(data) {
    let footerNav = document.querySelector('#footerNavContent')
    let ispisFooter = '<ul class="navbar-nav ml-auto">';
    for (let i = 0; i < data.length; i++) {
        ispisFooter += `<li class="nav-item">
                    <a class="nav-link" href="${data[i].putanja}">${data[i].naziv}</a>
               </li>`
    }
    ispisFooter += `</ul>`;
    footerNav.innerHTML = ispisFooter;
}
//ISPIS NAVIGACIJE
function ispisiNavigaciju(data) {
    let navHolder = document.querySelector('.amado-nav');
    let ispis = '<ul>';
    for (let i = 0; i < data.length; i++) {
        ispis += `<li>
        <a href="${data[i].putanja}">${data[i].naziv}</a>
        </li>`;
    }
    ispis += '</ul>';
    navHolder.innerHTML = ispis;
}
// funckija sa ispisivanje zvezdica
function zvezdice(brojZvezdica) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= brojZvezdica) {
            html += `<i class="fas fa-star"></i>`
        }
        else {
            html += `<i class="far fa-star"></i>`
        }
    }
    return html;
}
//ispisprod
function productIspis(data) {
    let prodWrapp = document.querySelector('.produktiIspis');
    let ispis = '';
    data.forEach(product => {
        ispis += `<div class="col-12 col-sm-6 col-md-12 col-xl-6 prikaz">
        <div class="single-product-wrapper">
            <!-- Product Image -->
            <div class="product-img">
                <img src="${product.slika.putanjaSlike}" alt="${product.slika.alt}">
            </div>

            <!-- Product Description -->
            <div class="product-description d-flex align-items-center justify-content-between">
                <!-- Product Meta Data -->
                <div class="product-meta-data">
                    <div class="line"></div>
                    <p class="product-price">$${product.cena}</p>
                        <h6>${product.naslov}</h6>
                </div>
                <!-- Ratings & Cart -->
                <div class="ratings-cart text-right">
                    <div class="ratings">
                    ${zvezdice(product.brojZvezdica)}
                    </div>
                    <div class="cart">
                        <a href="" class="add-to-cart" data-toggle="modal" data-target="#staticBackdrop" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt="cart"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    });
    prodWrapp.innerHTML = ispis;
    var productsLocal = JSON.stringify(data);
    localStorage.setItem('productsLocal', productsLocal);
    var productCart = JSON.parse(localStorage.getItem('productsLocal'));

    var carts = document.querySelectorAll('.add-to-cart');
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(productCart[i]);
            totalCost(productCart[i]);
        })
    }
}
//cart
//local storage for cart
function onLoadNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart-nav span').textContent = productNumbers;
    }
}
//local storage for cart
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-nav span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-nav span').textContent = 1;
    }
    setItems(product);
}
//local storage for cart
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //console.log('itemsi su', cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }
    else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
//totalnacena
function totalCost(product) {
    // console.log("cena je",product.cena);
    let cartCost = localStorage.getItem("totalCost");

    //console.log("my cart cost is",cartCost);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.cena);
    }
    else {
        localStorage.setItem("totalCost", product.cena);
    }

}

//search
function pretraga() {
    var uneto = this.value.toLowerCase();
    ajaxCallBack(baseurl + "proizvodi.json", "GET", function (result) {
        const pretrazeno = result.filter(function (p) {
            if (p.naslov.toLowerCase().indexOf(uneto) != -1) {
                return true;
            }
        })
        productIspis(pretrazeno);
    })
}
//kateg
function ispisKategorija(data) {
    let ispis = "<ul>";
    data.forEach(element => {
        ispis += `<li><a href="#" class="cat" data-idkat="${element.categId}">${element.name}</a></li>`;
    });
    ispis += "</ul>";
    document.querySelector('.catagories-menu').innerHTML = ispis;

    $(".catagories-menu ul li a").click(filtrirajProizvodePoKategoriji);
}

//po kategoriji
function filtrirajProizvodePoKategoriji(e) {
    e.preventDefault();
    const idKat = this.dataset.idkat;
    ajaxCallBack(baseurl + "proizvodi.json", "GET", function (result) {
        //console.log(result);
        // const filtriraniPostovi = postovi.filter(function (el) {
        //   return el.(function (kat) {
        //     return kat.categId == idKat
        //   });
        const filtriraniProizvodi = result.filter(function (c) {
            if (c.categId == idKat) {
                return c;
            }
        });
        productIspis(filtriraniProizvodi);
    });
}
function brands(data) {
    let brandsWrapp = document.querySelector('.brendoviDrzac');
    let ispis = '<ul>';
    data.forEach(element => {
        ispis += `<li><a href="#" class="brendovi" data-idkat="${element.brandId}">${element.name}</a></li>`;
    });
    ispis += '</ul>';
    brandsWrapp.innerHTML = ispis;

    $(".brendovi").click(filterPoBrendu);
}

//filter po brendu
function filterPoBrendu(e) {
    e.preventDefault();
    const idBrend = this.dataset.idkat;
    ajaxCallBack(baseurl + "proizvodi.json", "GET", function (result) {
        const filtriraniPostovi = result.filter(function (b) {
            if (b.categId == idBrend) {
                return b;
            }
        });
        productIspis(filtriraniPostovi);
    });
}
//validacija 
function validate() {
    //panel koji iskace ako je forma dobra
    var successPanel = $("#success");
    successPanel.hide();
    //elements
    let formData = [];
    let btnSend = $('#btnSend');
    btnSend.click(function () {
        let firstName = $('#first_name');
        let lastName = $("#last_name");
        let email = $("#email");
        let message = $("#Msg");

        //regex
        let regIme = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,18}$/;
        let regPrezime = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,20}$/;
        let regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; //bez čćšđž
        let regPoruka = /^([1-zćčžđšA-ZČĆŠĐŽ0-1@.\s]{1,255})$/; //sprecava sumljiv kod kao npr  17454' string ili \*&gt;$&lt;&amp;

        //provera

        //niz gresaka
        let errors = [];
        //poruka greske
        let errorMsg = "";
        //firstName
        if (firstName.val() == '') {
            firstName.css({
                'border': '2px solid red',
            });
            firstName.val(''); //reset
            errorMsg = 'First name can\'t be empty';
            firstName.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regIme.test(firstName.val())) {
            firstName.css({
                'border': '2px solid red',
            });
            firstName.val("");
            errorMsg = 'eg. Marko';
            firstName.attr("placeholder", errorMsg);
            errors.push(errorMsg);
        } else {
            firstName.css({
                'border': '2px solid #64a19d',
            });
            formData.push(firstName.val());
        }

        //lastName
        if (lastName.val() == '') {
            lastName.css({
                'border': '2px solid red',
            });
            lastName.val(''); //reset
            errorMsg = "Last name can\'t be empty";
            lastName.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regPrezime.test(lastName.val())) {
            lastName.css({
                'border': '2px solid red',
            });
            lastName.val("");
            errorMsg = "eg. Marković";
            lastName.attr("placeholder", errorMsg);
            errors.push(errorMsg);
        } else {
            lastName.css({
                'border': '2px solid #64a19d',
            });
            formData.push(lastName.val());
        }
        //email
        if (email.val() == '') {
            email.css({
                'border': '2px solid red',
            });
            email.val(''); //reset
            errorMsg = "Email can't be empty";
            email.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regEmail.test(email.val())) {
            email.css({
                'border': '2px solid red',
            });
            email.val('');
            errorMsg = "eg. somebody@example.com";
            email.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else {
            email.css({
                'border': '2px solid #64a19d',
            });
            formData.push(email.val());
        }

        //message
        if (message.val() == '' || message.val() == "Message can't be empty") {
            message.css({
                'border': '2px solid red',
            });
            message.val(''); //reset
            errorMsg = "Message can't be empty";
            message.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else if (!regPoruka.test(message.val())) {
            message.css({
                'border': '2px solid red',
            });
            message.val('');
            errorMsg = "Message can't contain malicious code";
            message.attr('placeholder', errorMsg);
            errors.push(errorMsg);
        } else {
            message.css({
                'border': '2px solid #64a19d',
            });
            formData.push(message.val());
        }

        //ako nema greske i ako je forma ispravna
        if (errors.length == 0) {
            successPanel.fadeIn();
            setTimeout(() => {
                successPanel.html(""); //praznjenje
            }, 7000);
        }
    });
}
//news
function validateNews() {
    //panel koji iskace ako je forma dobra
    let email = $(".nl-email");
    //regex
    let regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; //bez čćšđž

    //niz gresaka
    let errors = [];
    //poruka greske
    let errorMsg = "";

    //email
    if (email.val() == '') {
        email.css({
            'border': '2px solid red',
        });
        email.val(''); //reset
        errorMsg = "Email can't be empty";
        email.attr('placeholder', errorMsg);
        errors.push(errorMsg);
    } else if (!regEmail.test(email.val())) {
        email.css({
            'border': '2px solid red',
        });
        email.val('');
        errorMsg = "eg. somebody@example.com";
        email.attr('placeholder', errorMsg);
        errors.push(errorMsg);
    } else {
        email.css({
            'border': '2px solid #64a19d',
        });
        formData.push(email.val());
    }
}

 //console.log(cartItems);
window.onload = function () {
    //menu 
    ajaxCallBack(baseurl + "menu.json", "GET", function (result) {
        //console.log(result);
        ispisiNavigaciju(result);
        ispisFooterNav(result);
    });
    //pozivanje funkcija iz globala
    ispisSocial();
    newsletter();
    //validacija news
    $('#newsSend').click(validateNews);
    // if (url == "http://127.0.0.1:5500/index.html") {
        if (url == "https://kimixfurniture.netlify.app/index.html") {
        //console.log("Ucitan index");
        //typing funct
        typing();
        onLoadNumbers();
    }
    //da bi se ucitavao i bez index.html nastavka
    if (url == "https://kimixfurniture.netlify.app/") {
        //console.log("Ucitan index");
        //typing funct
        typing();
        onLoadNumbers();
    }

    // else if (url == "http://127.0.0.1:5500/shop.html") {
        else if (url == "https://kimixfurniture.netlify.app/shop.html") {
        //funkcije
        //AJAX CALLBACKS
        //categMenu
        ajaxCallBack(baseurl + "categories.json", "GET", function (result) {
            //console.log(result);
            ispisKategorija(result);
        });
        //brendovi
        ajaxCallBack(baseurl + "brands.json", "GET", function (result) {
            //console.log(result);
            brands(result);
        });
        //produkti
        ajaxCallBack(baseurl + "proizvodi.json", "GET", function (result) {
            //console.log(result);
            productIspis(result);
            zvezdice(result);
        });
        //pretraga
        document.getElementById('search').addEventListener('keyup', pretraga);
        //document.querySelector('.catagories-menu ul li a').addEventListener('click', function(){console.log("udfjhb")});
        onLoadNumbers();
    }
    else if (url == "https://kimixfurniture.netlify.app/cart.html") {
    // else if (url == "http://127.0.0.1:5500/cart.html") {
        // console.log("Ucitan cart");
        onLoadNumbers();
    }
    //CHECKOUT
    else if (url == "https://kimixfurniture.netlify.app/checkout.html") {
//    else if (url == "http://127.0.0.1:5500/checkout.html") {
        validate();
        onLoadNumbers();
    }
}