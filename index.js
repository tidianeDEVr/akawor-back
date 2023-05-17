const express = require('express');
const app = express();
const db = require('./models')
const cors = require('cors')
const boostRouter = require('./routers/boost-router')
const categoryRouter = require('./routers/category-router')
const deliveryRouter = require('./routers/delivery-router')
const imageRouter = require('./routers/image-router')
const orderlineRouter = require('./routers/order-line-router')
const orderRouter = require('./routers/order-router')
const packRouter = require('./routers/pack-router')
const productRouter = require('./routers/product-router')
const roleRouter = require('./routers/role-router')
const shopRouter = require('./routers/shop-router')
const subscriptionRouter = require('./routers/subscription-router')
const transactionRouter = require('./routers/transaction-router')
const userRouter = require('./routers/user-router')

// EXPRESS CONFIG
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// ROUTES
app.use('/api/boost', boostRouter)
app.use('/api/category', categoryRouter)
app.use('/api/delivery', deliveryRouter)
app.use('/api/image', imageRouter)
app.use('/api/orderline', orderlineRouter)
app.use('/api/order', orderRouter)
app.use('/api/pack', packRouter)
app.use('/api/product', productRouter)
app.use('/api/role', roleRouter)
app.use('/api/shop', shopRouter)
app.use('/api/subscription', subscriptionRouter)
app.use('/api/transaction', transactionRouter)
app.use('/api/user', userRouter)

db.sequelize.sync().then((req)=>{
    app.listen(3001, ()=>{
        console.log('Akawor Back Running : 3001');
    })
})