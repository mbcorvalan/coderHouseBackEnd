/**
 * Clase para gestionar productos.
 *
 * @class ProductManager
 */
class ProductManager {
	/**
	 * Crea una instancia de ProductManager.
	 *
	 * @constructor
	 */
	constructor() {
		/**
		 * @property {Array<Object>} products - Arreglo de productos.
		 */
		this.products = []

		/**
		 * @property {number} nextId - Siguiente ID para el nuevo producto.
		 */
		this.nextId = 1
	}

	/**
	 * Agrega un producto al arreglo de productos.
	 *
	 * @param {Object} product - Objeto del producto a agregar.
	 * @param {string} product.title - Título del producto.
	 * @param {string} product.description - Descripción del producto.
	 * @param {number} product.price - Precio del producto.
	 * @param {string} product.thumbnail - Ruta de la imagen del producto.
	 * @param {string} product.code - Código identificador del producto.
	 * @param {number} product.stock - Número de piezas disponibles.
	 * @throws {Error} Si falta algún campo obligatorio o si el código del producto ya existe.
	 */
	addProduct({ title, description, price, thumbnail, code, stock }) {
		if (
			!title ||
			!description ||
			!price ||
			!thumbnail ||
			!code ||
			stock === undefined
		) {
			throw new Error('Todos los campos son obligatorios')
		}

		if (this.products.some((product) => product.code === code)) {
			throw new Error('El código del producto ya existe')
		}

		const newProduct = {
			id: this.nextId++,
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		}

		this.products.push(newProduct)
	}

	/**
	 * Devuelve todos los productos.
	 *
	 * @returns {Array<Object>} Arreglo de productos.
	 */
	getProducts() {
		return this.products
	}

	/**
	 * Busca un producto por su ID.
	 *
	 * @param {number} id - ID del producto a buscar.
	 * @returns {Object|null} El producto encontrado o null si no existe.
	 */
	getProductById(id) {
		const product = this.products.find((product) => product.id === id)
		if (!product) {
			console.error('Not found')
			return null
		}
		return product
	}
}
