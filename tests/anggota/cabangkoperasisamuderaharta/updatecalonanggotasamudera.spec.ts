import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function updatecalonanggotasamudera() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing updatecalonanggotasamudera', async ({ page }) => {
        // Perbesar timeout test menjadi 2 menit (120000 ms)
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
        const submenuCalon = page.locator('a').filter({ hasText: /^Calon Anggota$/ }).first();
        await submenuCalon.waitFor({ state: 'visible', timeout: 15000 });
        await submenuCalon.click();

        // 4. memilih data yang ingin diupdate sesuai id
        await page.getByText('N260268').click();
        // memilih pilihan ubah 
        await page.locator('a.nav-link').filter({ hasText: /\bUbah\b/ }).first().click(); const kolomNama = page.locator('#customer_name');
        await kolomNama.click();
        await page.keyboard.press('Backspace');
        await page.fill('input[name="customer_name"]', 'kokakakelazz');
        // Cukup tambahkan :visible di akhir string locator-nya!
        await page.locator('button:has-text("Simpan"):visible').click();
        // 5. AMBIL SCREENSHOT
        // Beri jeda sangat kecil saja sebelum jepret agar animasi buka form edit selesai
        await page.waitForTimeout(2000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);
        // 1. Tangkap elemen pop-up menggunakan ID aslinya
        const pesanPeringatan = page.locator('#swal2-title');

        // 2. TUNGGU DAN PASTIKAN pop-up tersebut benar-benar muncul di layar
        await expect(pesanPeringatan).toBeVisible();

        // 3. (Opsional tapi Sangat Disarankan) VALIDASI apakah isi pesannya sesuai
        await expect(pesanPeringatan).toHaveText('Berhasil memperbaharui data');
        // Tunggu data baru dengan nama 'puyua' muncul di tabel
        await page.locator('table tbody tr:has-text("kokakakelazz")').waitFor({ state: 'visible', timeout: 15000 });

        // Jeda singkat untuk memastikan tabel sudah dirender sempurna
        await page.waitForTimeout(5000);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(4000);
        await page.screenshot({
            path: 'updatecalonanggota_screenshot.png'
        });
    })
}
// updatecalonanggotasamudera();