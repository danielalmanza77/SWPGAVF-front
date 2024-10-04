describe('Mi primera prueba en WebdriverIO', () => {
    it('debería tener el título correcto', async () => {
        await browser.url('http://localhost:5173');
        const title = await browser.getTitle();
        expect(title).toBe('Título de tu aplicación');
    });
});
