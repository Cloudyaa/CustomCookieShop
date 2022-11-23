import {Request, Response, Router} from "express";
import {CookieShopApp} from "../app";
import {MyRouter} from "../types/my-router";

export class HomeRouter implements MyRouter{
    public readonly urlPrefix = '/';
    public readonly router: Router = Router();

    constructor(private csapp: CookieShopApp) {
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.get('/', this.home);
    }

    private home = (req: Request, res: Response): void => {
        const {base, toppings, availableBases, availableToppings, summary} = this.csapp.getCookieSettings(req);

        res.render('home', {
            cookie: {
                base,
                toppings,
            },
            summary,
            availableBases,
            availableToppings,
        });
    }
}
