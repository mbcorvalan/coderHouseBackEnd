const fs = require('fs')

class ProductManager {
	constructor(path) {
		this.path = path
		this.init()
	}

	// Inicializa el archivo si no existe
	init() {
		if (!fs.existsSync(this.path)) {
			fs.writeFileSync(this.path, JSON.stringify([]))
		}
	}

	// Agrega un producto al archivo
	async addProduct(product) {
		const products = await this.readProducts()
		product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1
		products.push(product)
		await this.writeProducts(products)
		return product
	}

	// Lee todos los productos del archivo
	async getProducts() {
		return await this.readProducts()
	}

	// Encuentra un producto por su ID
	async getProductById(id) {
		const products = await this.readProducts()
		return products.find((p) => p.id === id)
	}

	// Actualiza un producto por su ID
	async updateProduct(id, updatedProduct) {
		const products = await this.readProducts()
		const index = products.findIndex((p) => p.id === id)
		if (index !== -1) {
			products[index] = {
				...products[index],
				...updatedProduct,
				id: products[index].id,
			}
			await this.writeProducts(products)
			return products[index]
		}
		return null
	}

	// Elimina un producto por su ID
	async deleteProduct(id) {
		const products = await this.readProducts()
		const filteredProducts = products.filter((p) => p.id !== id)
		await this.writeProducts(filteredProducts)
	}

	// Funciones auxiliares para leer y escribir en el archivo
	async readProducts() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.path, (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(JSON.parse(data))
				}
			})
		})
	}

	async writeProducts(products) {
		return new Promise((resolve, reject) => {
			fs.writeFile(this.path, JSON.stringify(products), (err) => {
				if (err) {
					reject(err)
				} else {
					resolve()
				}
			})
		})
	}
}

module.exports = ProductManager
