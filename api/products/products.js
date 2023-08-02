
const products = [

    { 
      title: "Producto1",
      description: "Descripción 1",
      price: 10,
      thumbnail: "thumbnail1.jpg",
      code: "ABC123",
      status: true,
      stock: 50
    },
    
    {
      title: "Producto 2",
      description: "Descripción 2",
      price: 110,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1232",
      status: true,
      stock: 501
    },
    
     {
      title: "Producto 3",
      description: "Descripción 3",
      price: 101,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1231",
      status: true,
      stock: 52
    },
     {
      title: "Producto 4",
      description: "Descripción 4",
      price: 101,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1231",
      status: true,
      stock: 52
    },
     {
      title: "Producto 5",
      description: "Descripción 5",
      price: 101,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1231",
      status: true,
      stock: 52
    },
    {
      title: "Producto 6",
      description: "Descripción 6",
      price: 101,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1231",
      status: true,
      stock: 52
    },
     {
      title: "Producto 7",
      description: "Descripción 3",
      price: 101,
      thumbnail: "thumbnail1.jpg",
      code: "ABC1231",
      status: true,
      stock: 52
    },
    ]
    const usedIds = new Set();


    var lastId = 0;
    
    function generateUniqueId() {
      let id;
      do {
        id = ++lastId;
      } while (usedIds.has(id));
      usedIds.add(id);
      return id;
    }
    
    products.forEach(product => {
      product.id = generateUniqueId();
    });
    
    module.exports = products