/*
    Copyright C 2019  Tim Maia (Carlos A.)
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    at your option any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function CloseShop() {
    $("#wrapper").html('');
	$("#shopmenu").hide();
    $.post('http://esx_vehicleshop/CloseMenu', JSON.stringify({}));
}


$(document).keyup(function(e) {
     if (e.key === "Escape") {
        CloseShop()
    }
});

$(document).ready(function(){

    var page = 1;
    var mpage = 0;

    $(".card-body").on('click', ':button', function () {
        $("#shopmenu").hide();
        $("#wrapper").html('');
        $.post('http://esx_vehicleshop/BuyVehicle', JSON.stringify({id: $(this).data('id')}));
    });

    $("#close").click(function() {
        CloseShop()
    });

    $("#page-prv").click(function () {
        $("#page-"+page).hide();
        if (page > 1) {
            page = page - 1;
        }
        $("#page-"+page).show();
    });

    $("#page-nxt").click(function () {
        $("#page-"+page).hide();
        if (page < mpage) {
            page = page + 1;
        }
        $("#page-"+page).show();
    });
    
    $("#btnValid").click(function () {
        var dropdown = $("#dropdownVehicle");
        var csrftoken = getCookie('csrftoken');

        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

        $.ajax({
            url: '',
            type: 'POST',
            dataType: 'json',
            data: {"listing": "okay"},
            success: function(data) {
                var vehModels = JSON.parse(data.cars) // vehModels[i].fields -> listed all fields in the models
                var vehs = [] // stocks all vehicles with their attributes
                var listCateg = []; // stocks all category of the vehicle
                
                for (let i = 0; i < vehModels.length; i++) {
                    if (!listCateg.includes(vehModels[i].fields.category)) {
                        listCateg.push(vehModels[i].fields.category);
                    } else {
                        // pass
                    }
                    vehs.push(vehModels[i].fields);
                }
                console.log(listCateg);
                console.log(vehs);

                /* For filter vehicle by category */
                const vehFilter = (arr, categ) => {
                    return arr.filter(el => el.category === categ);
                };
                /* ****************************** */

                console.log(vehFilter(vehs, 'sport'));

                for (let i = 0; i < listCateg.length; i++) {
                    dropdown.append(
                        `<i class="dropdown-item" id="${listCateg[i]}">${listCateg[i]}</i>`
                    );
                    $(`#${listCateg[i]}`).click(function () {
                        console.log(`click sur la catégorie ${listCateg[i]}`);
                    });
                }

            },
            error: function(error) {
                console.warn(error);
            }
        });

    });
    
    /*
    window.addEventListener('message', function(event) {
        var data = event.data;

        * for debug *
        var forDebug = document.getElementById('debug');
        forDebug.innerText = `debug: ${data.show}`;

        for (const i = 0; i < data.categ.length; i++) {
            console.log(data.categ[i].name);
        }

        * ********** *

        if (data.show) {
            let apage = 1;
            $("#shopmenu").show();
            for (var i = 0; i < data.cars.length/6; i++) {
                mpage = data.cars.length/6;
                var st = i * 6 + 0;
                var nd = i * 6 + 1;
                var rd = i * 6 + 2;
                var th = i * 6 + 3;
                var kh = i * 6 + 4;
                var lh = i * 6 + 5;

                $("#wrapper").append(`
                                <div id="page-`+ apage +`">
                                    <div class="row my-2">
                                        <div class="col">
                                            <div class="card" style="border:0">
                                                <img src="`+data.cars[st].imglink+`" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">`+data.cars[st].name+`</h5>
                                                    <p class="card-text">Categoria: <b>`+data.cars[st].category+`</b></p>
                                                    <p class="card-text">Valor: <b>R$`+data.cars[st].price+`</b></p>
                                                    <p class="card-text"><button type="button" id="action1" data-id="`+ st +`" class="btn btn-primary btn-lg btn-block">Comprar</button></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card" style="border:0">
                                                <img src="`+data.cars[nd].imglink+`" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">`+data.cars[nd].name+`</h5>
                                                    <p class="card-text">Categoria: <b>`+data.cars[nd].category+`</b></p>
                                                    <p class="card-text">Valor: <b>R$`+data.cars[nd].price+`</b></p>
                                                    <p class="card-text"><button type="button" id="action2" data-id="`+ nd +`" class="btn btn-primary btn-lg btn-block">Comprar</button></p>
                                                </div>
                                            </div>  
                                        </div>
                                        <div class="col">
                                            <div class="card" style="border:0">
                                                <img src="`+data.cars[rd].imglink+`" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">`+data.cars[rd].name+`</h5>
                                                    <p class="card-text">Categoria: <b>`+data.cars[rd].category+`</b></p>
                                                    <p class="card-text">Valor: <b>R$`+data.cars[rd].price+`</b></p>
                                                    <p class="card-text"><button type="button" id="action3" data-id="`+ rd +`" class="btn btn-primary btn-lg btn-block">Comprar</button></p>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col">
                                            <div class="card" style="border:0">
                                                <img src="`+data.cars[th].imglink+`" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">`+data.cars[th].name+`</h5>
                                                    <p class="card-text">Categoria: <b>`+data.cars[th].category+`</b></p>
                                                    <p class="card-text">Valor: <b>R$`+data.cars[th].price+`</b></p>
                                                    <p class="card-text"><button type="button" id="action1" data-id="`+ th +`" class="btn btn-primary btn-lg btn-block">Comprar</button></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="card" style="border:0">
                                                <img src="`+data.cars[kh].imglink+`" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">`+data.cars[kh].name+`</h5>
                                                    <p class="card-text">Categoria: <b>`+data.cars[kh].category+`</b></p>
                                                    <p class="card-text">Valor: <b>R$`+data.cars[kh].price+`</b></p>
                                                    <p class="card-text"><button type="button" id="action2" data-id="`+ kh +`" class="btn btn-primary btn-lg btn-block">Comprar</button></p>
                                                </div>
                                            </div>  
                                        </div>
                                        <div class="col">
                                            <div class="card" style="border:0">
                                                <img src="`+data.cars[lh].imglink+`" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <h5 class="card-title">`+data.cars[lh].name+`</h5>
                                                    <p class="card-text">Categoria: <b>`+data.cars[lh].category+`</b></p>
                                                    <p class="card-text">Valor: <b>R$`+data.cars[lh].price+`</b></p>
                                                    <p class="card-text"><button type="button" id="action3" data-id="`+ lh +`" class="btn btn-primary btn-lg btn-block">Comprar</button></p>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
                                </div>`);
                            if (apage !== page) {
                                $("#page-" + apage).hide();
                            }
                            apage = apage +1;
            }
        }    
    });*/
});
