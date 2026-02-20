import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function transaksiTabungan() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') }); const usernameCoopmax = process.env.USERNAME_COOPMAX!;
    const passwordCoopmax = process.env.PASSWORD_COOPMAX!;
    test('testing transaksi tabungan', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', usernameCoopmax);
        await page.fill('input[name="password"]', passwordCoopmax);
        await page.getByRole('button', {
            name: "Masuk"
        }).click();
        await expect(page).not.toHaveURL('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.locator('.nav-link').filter({ hasText: 'Tabungan' }).click();        await page.getByRole('link', {
            name: 'Transaksi Tabungan'
        }).isVisible;

        await page.getByRole('link', {
            name: 'Transaksi Tabungan'
        }).click();
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'buktiTransaksiTabungan.png', fullPage: true })
    })

}
transaksiTabungan();