describe('Products Page E2E Test', () => {
    it('should display at least one product', async () => {
        await browser.url('http://localhost:5173/');

        const productTitle = await $('a.me-6'); 

        await expect(productTitle).toBeExisting();
        await expect(productTitle).toHaveText('Productos');
    });
});

