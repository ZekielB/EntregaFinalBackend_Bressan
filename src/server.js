import express from "express"
import { connectMongoDB } from "./config/db-connection.js"
import productRouter from './routes/product-router.js'
import cartRouter from './routes/cart-router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
const PORT = process.env.PORT || 8080

connectMongoDB()
.then(()=>console.log('conectado a MongoDB'))
.catch((error)=> console.log(error))

app.listen(PORT, ()=> console.log (`Server ok en port ${PORT}`))