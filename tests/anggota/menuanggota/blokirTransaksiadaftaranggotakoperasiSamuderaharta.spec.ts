import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function blokirTransaksiadaftaranggotakoperasiSamuderaharta() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing blokirTransaksiadaftaranggotakoperasiSamuderaharta', async ({ page }) => {
        test.setTimeout(120000);

        // 1. FASE LOGIN
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');

        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForLoadState('networkidle');

        // 2. FASE PINDAH CABANG
        await page.locator('#header_session_company_id').selectOption('1');

        // Beri waktu singkat untuk reload setelah ganti cabang
        await page.waitForTimeout(3000);

        // =========================================================================
        // 3. FASE NAVIGASI MENU
        // =========================================================================
        // A. Tunggu menu Anggota muncul
        const menuAnggota = page.locator('a').filter({ hasText: /^Anggota$/ }).first();
        await menuAnggota.waitFor({ state: 'visible', timeout: 15000 });
        await menuAnggota.click();

        // B. Tunggu dropdown Calon Anggota
        // Klik elemen pertama dengan kelas 'nav-sub-link' yang memiliki teks 'Anggota'
        await page.locator('.nav-sub-item', { hasText: /^Anggota$/ }).first().click();
        await page.getByText('A005493').click();
        // memilih pilihan ubah 
        await page.locator('a.nav-link').filter({ hasText: /\bBlokir Transaksi\b/ }).first().click();
        await page.locator('[data-id="customer_is_blocked"]').waitFor({ state: 'visible' });
        await page.locator('[data-id="customer_is_blocked"]').click();
        await page.locator('button:has-text("Simpan"):visible').click();
        await page.waitForTimeout(7000);
        const tombolYes = page.locator('button.swal2-confirm:has-text("Yes")');
        await tombolYes.waitFor({ state: 'visible', timeout: 10000 });
        await tombolYes.click();
        await page.waitForTimeout(8000);
        await page.screenshot({
            path: 'blokirTransaksiadaftaranggotakoperasiSamuderaharta_screenshot.png'
        })
    })
}
blokirTransaksiadaftaranggotakoperasiSamuderaharta();
