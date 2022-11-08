// get toppings from request
export const getToppings = req => {
    const {cookieToppings} = req.cookies;
    return cookieToppings ? JSON.parse(cookieToppings) : [];
}
