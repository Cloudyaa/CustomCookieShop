import * as express from "express";
import {Application, json, Request, Response, static as expStatic} from "express";
import * as cookieParser from "cookie-parser";
import {engine} from "express-handlebars";
import {HomeRouter} from "./routes/home";
import {ConfigRouter} from "./routes/configurator";
import {OrderRouter} from "./routes/order";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import {COOKIE_BASES, COOKIE_TOPPINGS} from "./data/cookies-data";
import {Entries} from "./types/entries";
import {MyRouter} from "./types/my-router";

export class CookieShopApp {
    private app: Application = express();
    public readonly data = {
        COOKIE_BASES,
        COOKIE_TOPPINGS
    };

    private readonly routers = [HomeRouter, ConfigRouter, OrderRouter];

    constructor(){
        this._configApp();
        this._setRoutes();
        this._run();
    }

    _configApp() : void {
        this.app = express();
        this.app.use(json());
        this.app.use(expStatic('public'));
        this.app.use(cookieParser());
        this.app.engine('.hbs', engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');
    }

    _setRoutes() : void {
        // auto create routers
        for (const router of this.routers) {
            const obj: MyRouter = new router(this);
            this.app.use(obj.urlPrefix, obj.router);
        }
    }

    _run() : void{
        this.app.listen(3000, 'localhost', () => {
            console.log('Listening on http://localhost:3000/');
        });
    }

    showErrorPage (res: Response, message: string): void{
        res.render('error', {
            message,
        });
    }

    // get toppings from request
    getToppings(req: Request): string[] {
        const {cookieToppings} = req.cookies as {
            cookieToppings: string;
        };
        return cookieToppings ? JSON.parse(cookieToppings) : [];
    }

    getCookieSettings(req: Request): {
        toppings: string[],
        base: string | undefined,
        summary: number,
        availableBases: Entries,
        availableToppings: Entries,

    } {
        // getting cookie "cookieBase" but under name "base"
        const {cookieBase: base} = req.cookies as {
            cookieBase: string | undefined;
        };
        // getting toppings from request
        const toppings = this.getToppings(req);

        const availableBases = Object.entries(this.data.COOKIE_BASES);
        const availableToppings = Object.entries(this.data.COOKIE_TOPPINGS);

        // total price
        const summary = (base ?  handlebarsHelpers.findPrice(availableBases, base) : 0) + toppings.reduce((prev, curr) => (
            prev + handlebarsHelpers.findPrice(availableToppings, curr)
        ), 0);
        return {
            // selected
            base,
            toppings,

            // price of selected
            summary,

            // all available 'things'
            availableBases,
            availableToppings
        }
    }

}

new CookieShopApp();
