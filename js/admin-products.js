const games = [
  {
    id: 1,
    name: "The Legend of Zelda: Breath of the Wild",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
    price: 59.99,
    category: "Action",
    description:
      "An open-world action-adventure game set in a vast, post-apocalyptic world where players control Link to defeat Calamity Ganon and save Princess Zelda.",
    createdAt: "2023-10-01T12:00:00Z",
  }, // 0
  {
    id: 2,
    name: "Super Mario Odyssey",
    image:
      "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
    price: 49.99,
    category: "Adventure",
    description:
      "A 3D platformer where Mario travels across various kingdoms to rescue Princess Peach from Bowser.",
    createdAt: "2023-10-02T12:00:00Z",
  }, // 1
  {
    id: 3,
    name: "God of War Ragnarok",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1750909504",
    price: 99.99,
    category: "Action",
    description:
      "An action-adventure game that follows Kratos and his son Atreus as they journey through the world of Norse mythology.",
    createdAt: "2023-10-03T12:00:00Z",
  }, // 2
  {
    id: 4,
    name: "The Witcher 3: Wild Hunt",
    image:
      "https://juegosdigitalesargentina.com/files/images/productos/1618591872-the-witcher-3-wild-hunt-complete-edition-ps5.jpg",
    price: 49.99,
    category: "Role-Playing",
    description:
      "An open-world RPG that follows Geralt of Rivia as he searches for his adopted daughter while battling monsters and engaging in political intrigue.",
    createdAt: "2023-10-04T12:00:00Z",
  }, // 3
  {
    id: 5,
    name: "Spider Man 2",
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2651280/cb8da9b3e99cf7362cd88c10a0544b7fe892ccad/capsule_616x353.jpg?t=1750954033",
    price: 39.99,
    category: "Adventure",
    description:
      "An action-adventure game where players control both Peter Parker and Miles Morales as they fight against various villains in New York City.",
    createdAt: "2023-10-05T12:00:00Z",
  },
  
];

import {formatDate} from './date-utils.js';
const gamesForm = document.getElementById("gamesForm");
const tableBody = document.getElementById("tableBody");

const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categoryFilter");
const sortBtn = document.querySelectorAll("[data-ord]");
const aBtnDialog = document.querySelectorAll(".cell-name a");

gamesForm.addEventListener("submit",(formulario) => {
  formulario.preventDefault();
  games.push({
    id:games.length+1,
    name:formulario.target.elements.title.value,
    price:formulario.target.elements.price.value,
    description:formulario.target.elements.description.value,
    category:formulario.target.elements.category.value,
    image:formulario.target.elements.image.value,
    createdAt: new Date().toISOString()
  })

  buildTable(games);
  Swal.fire({
    icon: "success",
    title: "Carga correcta!",
    text: "Juego cargado correctamente.",
    toast: true,
    theme: "dark"
    })
  })
 
function buildTable(arrayJuegos){
    tableBody.innerHTML="";

    if(arrayJuegos.length===0){
      tableBody.innerHTML= `
      <tr>

      <td colspan="6" class="text-center">
      <h3 class="text-secondary"> No hay juegos disponibles </h3>
      </td>
      </tr>`
      return;
    }
    
    arrayJuegos.forEach((juego) => {
    tableBody.innerHTML += ` <tr>
                                <td class="cell-image">
                                    <img
                                        src="${juego.image}"
                                        alt="imagen del producto"
                                        class="img-fluid"
                                    />
                                </td>
                                <td class="cell-name">
                                <a id="a-name" data-id="${juego.id}" >${juego.name}         </a>                                
                                
                                </td>
                                <td class="cell-category">${juego.category}</td>
                                <td class="cell-price">${juego.price}</td>
                                <td class="cell-date">${formatDate(juego.createdAt)}</td>
                                <td class="cell-actions">
                                    <button class="btn btn-primary btn-sm">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm" data-id="${juego.id}">
                                        <i class="fa-solid fa-trash-can")"></i>
                                    </button>
                                </td>

                                </td>
                            </tr>`

                        
    });
    getADialogButton();
    getDeleteGameBtn();
  }


function deleteGame(id){
  const indice = games.findIndex(juego =>{
    return juego.id===id;
  })
  const confirmed = confirm("Estas seguro que desear eliminar el juego?");
  if(confirmed) {
    games.splice(indice,1);
    buildTable(games);
  }
  
}

buildTable(games);

// search input, para buscar juegos
searchInput.addEventListener("keyup",(evento)=>{
  const inputValue = searchInput.value;
  
  const filteredGames = games.filter((juego)=>{
    if(juego.name.toLowerCase().includes(inputValue.toLowerCase())) return true; 
  }
  );

  buildTable(filteredGames);

})


// category filter
categorySelect.addEventListener("change",(evento)=>{
  if(categorySelect.value===""){
    buildTable(games);
    return;
  }
  const filteredGames = games.filter((juego)=>{
    if(juego.category.toLowerCase()===categorySelect.value.toLowerCase()) return true ;
  })
  buildTable(filteredGames);
})

sortBtn.forEach((btn)=>{
  
  btn.addEventListener("click",(evento)=>{

    const dataSort = evento.currentTarget.dataset.ord;

    if(dataSort==="reset"){
      buildTable(games);
      return;
    }
    const sortedGames = games.toSorted((a,b)=>{
      if(dataSort==="asc") {
        return a.price - b.price;
      }
      return b.price-a.price;
    })
    buildTable(sortedGames);
  })
  
})


function showDialog(id){

  const juego = games.find((jueguito) =>{
    
    return jueguito.id === id;
  })

  Swal.fire({
    title: juego.name,
    /*color: "#fff",
    text: juego.description,
    imageAlt: juego.name,
    background: "#333",*/
    html: `
          <div class="product-dialog">
        <div class="image-container">
            <img src="${juego.image}" alt="${juego.name}">

        </div>

        <div class="details-container">
            
            <div class="category-item">${juego.category}</div>
            <div class="description">${juego.description}</div>
            <div class="price">${juego.price}</div>
            
            <div class="footer-wrapper">
                <div class="date">${formatDate(juego.createdAt)}</div>
                <button class="btn btn-primary">Editar</button>
            </div>
        </div>
    </div>
           `,
    theme: "dark"
  })
  

}





function getADialogButton(){
  const aBtnDialog = document.querySelectorAll(".cell-name a");
  //console.log(aBtnDialog);
  console.log();
  aBtnDialog.forEach((a_etiqueta)=>{
      a_etiqueta.addEventListener("click",(evento)=>{
        evento.stopPropagation();
        const id = parseInt(a_etiqueta.dataset.id);
        showDialog(id);
  })
})
}

function getDeleteGameBtn(){
  const deleteGameBtn = document.querySelectorAll(".cell-actions .btn-danger");
  deleteGameBtn.forEach((btn)=>{
    btn.addEventListener("click",(evento)=>{
      evento.stopPropagation();
      const id = parseInt(btn.dataset.id);
      deleteGame(id);
    })
  })
}