import {Request, Response, Router} from "express";
import {CookieShopApp} from "../app";
import {MyRouter} from "../types/my-router";


export class OrderRouter implements MyRouter {
    public readonly urlPrefix = '/order';
    public readonly router: Router = Router();

    constructor(private csapp: CookieShopApp) {
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.get('/checkout', this.checkout);
        this.router.get('/thanks', this.thanks);
    }

    private checkout = (req: Request, res: Response): void => {
        const {base, toppings, availableBases, availableToppings, summary} = this.csapp.getCookieSettings(req);
        res.render('order/checkout', {
            cookie: {
                base,
                toppings,
            },
            summary,
            availableBases,
            availableToppings,
        });
    };

    private thanks = (req: Request, res: Response): void => {
        const {summary} = this.csapp.getCookieSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieToppings')
            .render('order/thanks', {
                summary,
            });
    };
}
