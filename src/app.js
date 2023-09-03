const express = require("express");
var indexRouter = require("./routes/index");
var indexMiddleware = require("./middleware/index");

const db = require("./config/db-config");

const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./../swagger.json");

const app = express();

db.connectDb();

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: true}));

app.use(indexMiddleware.LoggerMiddleware);


app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:4100', 'http://localhost:4100'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use("/", indexRouter);

// FOR DOCUMENTATION
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, function () {
    console.log(
        "Server is running and listening in port 4000: http://localhost:3000"
    );
});