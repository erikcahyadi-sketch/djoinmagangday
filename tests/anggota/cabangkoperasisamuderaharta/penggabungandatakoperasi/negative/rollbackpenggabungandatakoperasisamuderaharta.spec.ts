import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function rollbackpenggabungandatakoperasisamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing rollbackpenggabungandatakoperasisamuderaharta', async ({ page }) => {
        test.setTimeout(60000);

        // 1. Login
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForLoadState('networkidle');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await page.waitForURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum', { timeout: 10000 });
        await expect(page).toHaveTitle('KOPERASI  SAMUDRA HARTA  | Dashboard');

        // 2. Pindah cabang
        await page.locator('#header_session_company_id').selectOption('1');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(8000);
        // 4. Navigasi ke menu Penggabungan Data
        const menuAnggota = page.locator('a').filter({ hasText: /^Anggota$/ }).first();
        await menuAnggota.waitFor({ state: 'visible', timeout: 15000 });
        await menuAnggota.click();

        const PengabunganData = page.locator('a').filter({ hasText: /^Penggabungan Data$/ }).first();
        await PengabunganData.waitFor({ state: 'visible', timeout: 10000 });
        await PengabunganData.click({ force: true });

        await page.locator('a:has-text("A005182")').first().waitFor({ state: 'visible', timeout: 10000 });
        await page.getByText('A005182').first().click();

        await page.waitForTimeout(7000);
        await page.waitForLoadState('networkidle');

        // 5. Klik tombol Rollback
        const tombolRollback = page.locator('a:has-text(" Rollback")');
        await tombolRollback.waitFor({ state: 'visible', timeout: 30000 });
        await tombolRollback.click();

        // 6. Konfirmasi rollback
        const tombolYes = page.locator('button.swal2-confirm:has-text("Rollback")');
        await tombolYes.waitFor({ state: 'visible', timeout: 10000 });
        await tombolYes.click();

        // 7. Klik OK pada notifikasi sukses
        await page.locator('button.swal2-confirm:has-text("OK")').waitFor({ state: 'visible', timeout: 10000 });
        await page.locator('button.swal2-confirm:has-text("OK")').click();
        
        await page.waitForTimeout(8000);
        // 8. Screenshot
        await page.screenshot({ path: 'rollbackpenggabungandatakoperasisamuderaharta_screenshot.png' });
    });
}
// rollbackpenggabungandatakoperasisamuderaharta();