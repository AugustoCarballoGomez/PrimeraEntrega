const fs = require('fs').promises;


class ProductManager {
  constructor(products) {
    this.products = [];
    this.idProduct = 0;
    this.path = `${process.cwd()}/products/products.json`; 
  }

  async getProducts() {
    try {
      if (await fs.access(this.path)) {
        const data = await fs.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.log(error);
      this.products = [];
    }
    return this.products;
  }

  async addProduct(newProduct) {
    try {
      this.idProduct++;
      const { title, description, price, thumbnail, code, stock } = newProduct;
      const product = {
        id: this.idProduct,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(product);
      await fs.writeFile(this.path, JSON.stringify(this.products));
      
      return product;
    } catch (error) {
      console.log(error);
      throw error; // Lanzar el error para que el código que utiliza la clase pueda manejarlo.
    }
  }

  async getProductById(id) {
    try {
      if (await fs.access(this.path)) {
        const data = await fs.readFile(this.path, 'utf-8');
        this.products = JSON.parse(data);
        const product = this.products.find((product) => product.id === id);
        return product || null; // Devuelve null si no se encuentra el producto con el ID especificado.
      }
      return null; // Devuelve null si el archivo no existe.
    } catch (error) {
      console.log(error);
      throw error; // Lanzar el error para que el código que utiliza la clase pueda manejarlo.
    }
  }
}

module.exports = ProductManager;
