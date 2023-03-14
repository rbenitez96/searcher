let elemts_template_products = document.getElementsByName('template_products');
let elementos_datos = [];
loadProducts_json = () =>{
    let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"
    let request = async ( myURL ) => {

        try {
    
          let response = await fetch( myURL ); 
          let result = await response.json() /* Convierte el response a JSON */
    
          /* Éxito: Procese el result */
        for(let data of result){
            let { name, price, src, type} = data;
            elementos_datos.push({ name, price, src, type});
        }
        console.log(elementos_datos);
        loadProductsxml();
             
        } catch (error) {
    
          /* Fallo: Procese el error */
          
          console.log( error );
    
        }
    
      }
    
    request( URL );
}

loadProductsxml = () =>{
    let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml";
    let request = async ( myURL ) => {

        try {
      
            let response = await fetch( myURL ); 
            let result = await response.text()
            let xml = (new DOMParser()).parseFromString(result, 'application/xml');

            let products = xml.getElementsByTagName("products");
            for(let data of products){
                let product = data.getElementsByTagName("product");
                let data_almace = {};
                for(let data_product of product){
                    data_almace = {
                        "name":data_product.getElementsByTagName("name")[0].innerHTML,
                        "price":data_product.getElementsByTagName("price")[0].innerHTML,
                        "src":data_product.getElementsByTagName("src")[0].innerHTML,
                        "type":data_product.getElementsByTagName("type")[0].innerHTML,
                    }
                    elementos_datos.push(data_almace);
                }
            }
            loadVisibilityProducts(elementos_datos);
      
        } catch (error) {
      
          /* Fallo: Procese el error */
          
          console.log( error );
      
        }
      
      }
      
      request( URL );
}

loadVisibilityProducts = (elementos_datos) => {
    let message = "";
        for(let data of elementos_datos){
            let { name, price, src, type} = data;
            message+=`<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
            <div class="card card-blog card-plain">
              <div class="card-header p-0 mt-n4 mx-3">
                <a class="d-block shadow-xl border-radius-xl">
                  <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                </a>
              </div>
              <div class="card-body p-3">
                <p class="mb-0 text-sm">${type}</p>
                <a href="javascript:;">
                  <h5>
                    ${name}
                  </h5>
                </a>
                <p class="mb-4 text-sm">
                  <b>Price: </b> $ ${price}
                </p>
              </div>
            </div>
          </div>`
        }
        elemts_template_products[0].innerHTML = message;
}

loadProducts_json();

let button_filter = document.getElementById('filter');

button_filter.addEventListener('click', (event) => {
    let text_filter = document.getElementById('text');
    let valor_text = text_filter.value;
    let filteredData = [];
    if(valor_text != null && valor_text.length != 0){
      filteredData = elementos_datos.filter(item => item.type.toLowerCase().includes(valor_text.toLowerCase()));
    }else{
      filteredData = elementos_datos;
    }
      
    loadVisibilityProducts(filteredData);    
    console.log(valor_text);

});

//let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/FSD02/main/S03D03/clase/recursos/products.json";
