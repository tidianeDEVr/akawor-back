const express = require('express');
const helmet = require('helmet');
const app = express();
const db = require('./models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const boostRouter = require('./routers/boost-router');
const categoryRouter = require('./routers/category-router');
const deliveryRouter = require('./routers/delivery-router');
const imageRouter = require('./routers/image-router');
const orderlineRouter = require('./routers/order-line-router');
const orderRouter = require('./routers/order-router');
const packRouter = require('./routers/pack-router');
const productRouter = require('./routers/product-router');
const shopRouter = require('./routers/shop-router');
const subscriptionRouter = require('./routers/subscription-router');
const transactionRouter = require('./routers/transaction-router');
const userRouter = require('./routers/user-router');
const securityRouter = require('./routers/security-router');
const utilRouter = require('./routers/util-router');
const { ACTIVE_VERSION } = require('./env');
require('./auth/passport');

// EXPRESS CONFIG
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true, origin: ['http://localhost:4200'],}))
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(cookieParser());
app.use(express.static('public'));

// ROUTES
app.use(`/${ACTIVE_VERSION}/api/boost`, boostRouter)
app.use(`/${ACTIVE_VERSION}/api/category`, categoryRouter)
app.use(`/${ACTIVE_VERSION}/api/delivery`, deliveryRouter)
app.use(`/${ACTIVE_VERSION}/api/image`, imageRouter)
app.use(`/${ACTIVE_VERSION}/api/orderline`, orderlineRouter)
app.use(`/${ACTIVE_VERSION}/api/order`, orderRouter)
app.use(`/${ACTIVE_VERSION}/api/pack`, packRouter)
app.use(`/${ACTIVE_VERSION}/api/product`, productRouter)
app.use(`/${ACTIVE_VERSION}/api/shop`, shopRouter)
app.use(`/${ACTIVE_VERSION}/api/subscription`, subscriptionRouter)
app.use(`/${ACTIVE_VERSION}/api/transaction`, transactionRouter)
app.use(`/${ACTIVE_VERSION}/api/user`, userRouter)
app.use(`/${ACTIVE_VERSION}/api/security`, securityRouter)
app.use(`/${ACTIVE_VERSION}/api/util`, utilRouter)

db.sequelize.sync().then((req)=>{
// db.sequelize.sync({force:true}).then((req)=>{
    app.listen(3001, ()=>{
        console.log('Akawor Back Running : 3001');
    })
})