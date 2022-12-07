const ProductManager = require('./ProductManager')
const { response } = require('express')
const express = require('express')

const app = express()

const path = 'misproducts.txt'
const productManager = new ProductManager(path)


app.get('/products', async (req, res)=>{
    let products = await productManager.getProduct()
    let limit = req.query.limit
    let result = products
    if((limit>0) && (limit<products.length)){
        let newProducts = []
        for(let i= 0; i<limit; i++){
            newProducts.push(products[i])
        }
        result = newProducts
    }
    res.send(result)
})

app.get('/add', async (req, res)=>{
    const body = req.query
    const obj = await productManager.addProduct(body)
    res.json(obj)
})

app.get('/products/:pid', async (req, res) =>{
    let id = 0
    try{
        let id = parseInt(req.params)
    }catch(error){
        console.log('Error en id', error)
    }
    console.log(id)
    const  product = await productManager.getProductById(id)
    res.json(product)
})

app.listen(8080, () => console.log('Server is running'))