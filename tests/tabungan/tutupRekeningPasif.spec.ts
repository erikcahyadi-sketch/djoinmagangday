import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function tutupRekeningPasif() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') }); const usernameCoopmax = process.env.USERNAME_COOPMAX!;
    const passwordCoopmax = process.env.PASSWORD_COOPMAX!;
    test('testing Tutup Rekening', async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', usernameCoopmax);
        await page.fill('input[name="password"]', passwordCoopmax);
        await page.getByRole('button', {
            name: "Masuk"
        }).click();
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await expect(page).toHaveTitle('PUSAT  | Dashboard');
        const menuTabungan = page.getByRole('link', { name: 'Tabungan' });
        // await menuTabungan.waitFor({ state: 'visible' });
        await menuTabungan.click(); 
        await page.waitForTimeout(5000);
        await page.getByText('Tutup Rekening Pasif').isVisible;
        await page.getByText('Tutup Rekening Pasif').first().click();
        await page.getByTitle('PUSAT  | Tutup Rekening Tidak Aktif').isVisible;
        await page.screenshot({ path: 'Tutup Rekening Pasif.png', fullPage: true })
    })

}
//tutupRekeningPasif();