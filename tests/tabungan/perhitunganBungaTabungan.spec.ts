import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function perhitunganBungaTabungan() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') }); const usernameCoopmax = process.env.USERNAME_COOPMAX!;
    const passwordCoopmax = process.env.PASSWORD_COOPMAX!;
    test('testing Perpanjang Tabungan', async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', usernameCoopmax);
        await page.fill('input[name="password"]', passwordCoopmax);
        await page.getByRole('button', {
            name: "Masuk"
        }).click();
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        const menuTabungan = page.getByRole('link', { name: 'Tabungan' });
        // await menuTabungan.waitFor({ state: 'visible' });
        await menuTabungan.click();
        await page.waitForTimeout(7000);
        await page.getByText('Perhitungan Bunga Tabungan').isVisible();
        await page.getByText('Perhitungan Bunga Tabungan').first().click();
        await expect(page).toHaveTitle('PUSAT  | Bunga Tabungan');
        await page.screenshot({ path: 'Perpanjang Tabungan.png', fullPage: true })
    })

}
//perhitunganBungaTabungan()