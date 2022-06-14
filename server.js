//Load express
const express = require("express");
//import the controller function
const getData = require("./Controllers/getData")
//call getData
const productsData = getData();

//create an instance of express
const app = express();
const PORT = 3001

//Middleware functions
//they update the request as soon as they come in
app.use((req, res, next) => {
    console.log(`Running middleware function!`)
    next(); //got to the next middleware or to the response
})

//JSON Middleware
app.use(express.json())
//if we don't need to read data from the url.
app.use(express.urlencoded({extended: false}))

//Setup view engine
app.set("view engine", "ejs");
app.set('views', "./Views");

//Root route
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: "Home Page",
        pageHeader: "Welcome to our home page",
    })
})

//Display all products
app.get("/products", (req, res) => {
    res.render("products", { data: productsData, pageTitle: "Products Page" })
})

//HTML Form
app.get("/products/new", (req, res) => {
    res.render("newProduct")
})

app.get('/products/:id', (req, res) => {
    console.log(req.params)
    const result = products.filter(item => item.id === Number(req.params.id))

    res.render('productId', {product: result[0]})
})

//Create a new product
app.post("/products", (req, res) => {
    console.log(req.body)

productsData.push(req.body)
res.redirect("/products")
})

// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

