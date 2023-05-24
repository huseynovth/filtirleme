const data = [
 {
 id:1,
 price:130000,
 numberOfRoom:1,
 area: 73,
 img:"foto3.jpg",
},
{
id:2,
price:170000,
numberOfRoom:2,
area: 90,
img:"foto2.jpg",
 },
 {
id:3,
price:200000,
numberOfRoom:3,
area:120,
img:"foto1.jpg",
}, 
]

let activeFilter=[]

const container = document.querySelector(".container").querySelector('.second')

const room = document.querySelector('.filter').querySelectorAll('.room')
room.forEach(x=>{
    x.addEventListener('click', e=>{
        const id = e.target.id
        if (e.target.checked) {
            activeFilter.push(id)
        }else{
            activeFilter = activeFilter.filter(x=>x!=id)
        }
        renderProducts()
    })
})

function createProduct(data) {
    const card = document.createElement('div')
    
    card.innerHTML=`<div class="card">
    <img src="./images/${data.img}" alt="">
    <p class="price">${data.price} AZN</p>
    <p class="about">otaq -${data.numberOfRoom} , sahe - ${data.area}m^2  </p>
    </div>`

    return card;
}

const minAreaInput = document.querySelector(".min-area");
minAreaInput.value = 0;

const maxAreaInput = document.querySelector(".max-area");
maxAreaInput.value = 300;

const minAreaSpan = document.querySelector(".min-area-value");
minAreaSpan.innerText = minAreaInput.value;

const maxAreaSpan = document.querySelector(".max-area-value");
maxAreaSpan.innerText = maxAreaInput.value;

minAreaInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (parseInt(value) > parseInt(maxAreaInput.value)) {
    value = maxAreaInput.value;
    e.target.value = maxAreaInput.value;
  }

  minAreaSpan.innerText = value;
  renderProducts();
});

maxAreaInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (parseInt(value) < parseInt(minAreaInput.value)) {
    value = minAreaInput.value;
    e.target.value = minAreaInput.value;
  }

  maxAreaSpan.innerText = value;
  renderProducts();
});

const minInput = document.querySelector(".min");
minInput.value = 50000;

const maxInput = document.querySelector(".max");
maxInput.value = 300000;

const minSpan = document.querySelector(".min-value");
minSpan.innerText = minInput.value;

const maxSpan = document.querySelector(".max-value");
maxSpan.innerText = maxInput.value;

minInput.addEventListener("input", (e) => {
  let value = parseInt(e.target.value);

  if (value > parseInt(maxInput.value)) {
    value = parseInt(maxInput.value);
    e.target.value = value;
  }

  minSpan.innerText = value;
  renderProducts();
});

maxInput.addEventListener("input", (e) => {
  let value = parseInt(e.target.value);

  if (value < parseInt(minInput.value)) {
    value = parseInt(minInput.value);
    e.target.value = value;
  }

  maxSpan.innerText = value;
  renderProducts();
});

function renderProducts() {
    container.innerHTML = "";
    let _temp = [...data];
  
    if (activeFilter.length > 0) {
      _temp = _temp.filter((x) => activeFilter.some((y) => y == x.numberOfRoom));
    }
  
    const minPrice = parseInt(minInput.value);
    const maxPrice = parseInt(maxInput.value);
    _temp = _temp.filter((x) => x.price >= minPrice && x.price <= maxPrice);
  
    const minArea = parseInt(minAreaInput.value);
    const maxArea = parseInt(maxAreaInput.value);
    _temp = _temp.filter((x) => {
      if (x.area) {
        return x.area >= minArea && x.area <= maxArea;
      }
      return false;
    });
  
    _temp.forEach((x) => {
      const productDiv = createProduct(x);
      container.append(productDiv);
    });
  }
  
renderProducts()
