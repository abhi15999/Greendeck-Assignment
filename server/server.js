const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const port = 5000;
const net = require('../models/netaporterModel')
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const router = express.Router();

app.get('/', (req, res) => {
    net.find({})
    .then((data)=>res.send(data))
})

app.post('/search', (req, res) => {
    let filters = req.body.filters;
    let query = [];

    filters.forEach((filter) => {
        if (filter.key === 'discount') {

            switch (filter.operator) {
                case 'greater-than':
                    query.push({
                        'similar_products.meta.avg_discount':{$gt: filter.value}
                    })
                    break;
                case 'smaller-than':
                    query.push({
                        'similar_products.meta.avg_discount':{$lt: filter.value}
                    })
                    break;
                case 'equal':
                    query.push({
                        'similar_products.meta.avg_discount': {$eq:filter.value}
                    })
                    break;
                default:
                    break;
            }
        }

        if (filter.key === 'brand') {
            query.push({ 'brand.name': filter.value })
        }

        
    });

    net.find({ $and: query })
        .then((data) => res.send(data))

})


//Database
const mongoDB = 'mongodb://127.0.0.1:27017/greendeck'
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => console.log(`Magic begins from ${port}`))



