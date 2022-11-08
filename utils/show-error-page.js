export const showErrorPage = (res, message) => {
    res.render('error', {
        message,
    });
}
