import {Request, Response, Router} from "express";
import {CookieShopApp} from "../app";
import {MyRouter} from "../types/my-router";

export class ConfigRouter implements MyRouter {
    public readonly urlPrefix = '/config';
    public readonly router: Router = Router();

    constructor(private csapp: CookieShopApp) {
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.get('/base/:selected', this.selectBase);
        this.router.get('/topping/:selected', this.selectTopping);
        this.router.get('/remove/:selected', this.removeTopping);
    }

    //arrow function protect us of change of 'this' context
    private selectBase = (req: Request, res: Response): void => {
        const {selected} = req.params;

        if (!(this.csapp.data.COOKIE_BASES as Record<string, number>)[selected]) {
            return this.csapp.showErrorPage(res,`We don't have that kind of base as ${selected}`);
        }

        res
            .cookie('cookieBase', selected)
            .render('config/base-selected', {
                selected,
            });
    };

    private selectTopping = (req: Request, res: Response): void => {
        const {selected} = req.params;

        if (!(this.csapp.data.COOKIE_TOPPINGS as Record<string, number>)[selected]){
            return this.csapp.showErrorPage(res, `We don't have that kind of topping as ${selected}`);
        }

        const toppings = this.csapp.getToppings(req);
        if (toppings.includes(selected)) {
            return this.csapp.showErrorPage(res,`You have already added ${selected}`);
        } else toppings.push(selected);


        res
            .cookie('cookieToppings', JSON.stringify(toppings))
            .render('config/topping-added', {
                selected,
            });
    };

    private removeTopping = (req: Request, res: Response): void => {
        const {selected} = req.params;

        const oldToppings = this.csapp.getToppings(req);

        if(!oldToppings.includes(selected)){
            return this.csapp.showErrorPage(res,`Cannot remove ${selected} because it is not added to your cookie.`);
        }

        const toppings = oldToppings.filter(topping => topping !== selected);

        res
            .cookie('cookieToppings', JSON.stringify(toppings))
            .render('config/removed', {
                selected,
            });
    };
}
