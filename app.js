import express from "express";
import cookieParser from "cookie-parser";
import {engine} from "express-handlebars";
import {homeRouter} from "./routes/home.js";
import {configRouter} from "./routes/configurator.js";
import {orderRouter} from "./routes/order.js";
import {handlebarsHelpers} from "./utils/handlebars-helpers.js";

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/config', configRouter);
app.use('/order', orderRouter);

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000/');
});
