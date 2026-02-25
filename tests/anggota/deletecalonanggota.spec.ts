import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function deletecalonanggota() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing deletecalonanggota', async ({ page }) => {
        // 1. LOGIN SCRIPT
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);

        // Tekan Enter untuk Submit
        await page.keyboard.press('Enter');

        // 2. JURUS MENUNGGU HALAMAN TERMUAT SEMPURNA (BEST PRACTICE)
        // Pertama, pastikan URL sudah berpindah ke dashboard
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForTimeout(10000);
        // 3. NAVIGASI MENU
        await page.locator('a:has-text("Anggota")').first().click();

        // Langsung paksa klik submenu-nya (mengabaikan animasi dropdown yang lambat)
        await page.locator('a:has-text("Calon Anggota")').click();

        // 4. KLIK DATA & TOMBOL EDIT
        await page.getByText('N260252').click();

        // TYPO FIXED: Menghapus kurung siku ] yang berlebih pada script Bapak sebelumnya
        // Diubah menjadi class selector yang lebih bersih (.fa-edit)
        await page.locator('a.btn-delete').filter({ hasText: /\bHapus\b/ }).first().click();
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        // 1. Tangkap elemen pop-up menggunakan ID aslinya
        const pesanPeringatan = page.locator('#swal2-title');

        // 2. TUNGGU DAN PASTIKAN pop-up tersebut benar-benar muncul di layar
        await expect(pesanPeringatan).toBeVisible();

        // 3. (Opsional tapi Sangat Disarankan) VALIDASI apakah isi pesannya sesuai
        await expect(pesanPeringatan).toHaveText('Penghapusan data nasabah tidak dapat dilakukan pada company konsolidasi');
        await page.screenshot({
            path: 'deletecalonanggota_screenshot.png'
        });
    });
}
// deletecalonanggota();
