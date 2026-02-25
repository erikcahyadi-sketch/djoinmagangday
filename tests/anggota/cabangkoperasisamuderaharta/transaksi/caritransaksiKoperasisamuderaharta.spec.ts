import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function caritransaksiKoperasisamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing caritransaksiKoperasisamuderaharta', async ({ page }) => {
        // Perbesar timeout test menjadi 60 detik
        test.setTimeout(60000);

        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForLoadState('networkidle');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await page.waitForURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum', { timeout: 10000 });
        await expect(page).toHaveTitle('KOPERASI  SAMUDRA HARTA  | Dashboard');

        // 2. FASE PINDAH CABANG
        await page.locator('#header_session_company_id').selectOption('1');
        await page.waitForLoadState('networkidle');

        // =========================================================================
        // 3. FASE NAVIGASI MENU
        // =========================================================================
        const menuAnggota = page.locator('a').filter({ hasText: /^Anggota$/ }).first();
        await menuAnggota.waitFor({ state: 'visible', timeout: 20000 });
        await page.waitForTimeout(5000);
        await menuAnggota.click();

        const PengabunganData = page.locator('a').filter({ hasText: /^Transaksi$/ }).first();
        await PengabunganData.waitFor({ state: 'visible', timeout: 10000 });
        await PengabunganData.click({ force: true });

        await page.fill('input[name="code"]', 'NT002656');
        await page.waitForTimeout(6000);
        await page.keyboard.press('Enter');

        await page.waitForTimeout(8000);
        await page.getByText('No. Nasabah : ').isVisible();
        await page.waitForTimeout(4000);
        await page.screenshot({ path: 'fotocari-transaksi-koperasisamuderaharta.png' });

    })
}
caritransaksiKoperasisamuderaharta();
