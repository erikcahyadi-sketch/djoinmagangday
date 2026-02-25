import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function deletecalonganggotasamudera() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing deletecalonganggotasamudera', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
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
        const submenuCalon = page.locator('a').filter({ hasText: /^Calon Anggota$/ }).first();
        await submenuCalon.waitFor({ state: 'visible', timeout: 15000 });
        await submenuCalon.click();
        // 4. KLIK DATA & TOMBOL EDIT
        await page.getByText('N260268').click();

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
        await page.waitForTimeout(5000);
        await page.keyboard.press('Enter');
        await page.screenshot({
            path: 'deletecalonganggotasamudera_screenshot.png'
        })
    })
}
// deletecalonganggotasamudera();
