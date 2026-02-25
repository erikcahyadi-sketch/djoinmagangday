import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function tambahcalonanggotatest() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing tambahcalonanggotatest', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForTimeout(7000);
        await page.locator('a:has-text("Anggota")').first().click();
        await page.locator('a:has-text("Calon Anggota")').isVisible();
        await page.locator('a:has-text("Calon Anggota")').click();
        await page.locator('a:has-text(" Tambah")').click();
        const kolomTanggal = page.locator('#customer_date');
        await kolomTanggal.click();
        await page.keyboard.press('Delete');
        await page.fill('input[name="customer_date"]', '22-02-2026');
        // Tekan Tab untuk menutup Datepicker (Solusi dari sesi sebelumnya)
        await page.keyboard.press('Tab');
        // HAPUS SEMUA waitForTimeout yang panjang (4000, 10000)
        await page.fill('input[name="nip"]', '3232321');
        // Fokus ke elemen target Anda: kyc_nik. Langsung isi saja!
        await page.fill('input[name="kyc_nik"]', '5220065654011211');
        await page.fill('input[name="customer_name"]', 'nanikaodppi');
        // Definisi locator langsung ke ID select aslinya
        const dropdownTipe = page.locator('#customer_type');
        await dropdownTipe.selectOption({ label: 'Anggota Saham' }, { force: true });
        // Cari label yang memiliki teks Laki - Laki, lalu klik
        await page.locator('label').filter({ hasText: 'Laki - Laki' }).click();
        await page.fill('input[name="customer_birth_place"]', 'Denpasar');
        const kolomTanggalLahir = page.locator('#customer_birth_date');
        await kolomTanggalLahir.click();
        // 2. Pilih Tahun (Biasanya ada dropdown select untuk tahun di kalendernya)
        // Kita gunakan class umum jQuery UI, sesuaikan jika berbeda di inspect element Bapak
        await page.waitForTimeout(3000);
        await page.locator('.ui-datepicker-year').selectOption('2002');
        // 3. Pilih Bulan (Biasanya ada dropdown select untuk bulan)
        // Nilai bulan biasanya dimulai dari 0 (Januari) sampai 11 (Desember)
        // Karena Bapak ingin Januari, kita pilih '0' (Atau sesuaikan dengan nama label 'Jan')
        await page.locator('.ui-datepicker-month').selectOption('0');
        // 4. Klik angka Hari (22)
        // Kita cari elemen <a> (link hari) di dalam tabel kalender yang teksnya persis '22'
        await page.locator('.ui-state-default').filter({ hasText: /^20$/ }).click();
        await page.keyboard.press('Tab');
        // Kita langsung tembak id select aslinya menggunakan selectOption dengan force: true
        // Berdasarkan HTML Bapak, nilai untuk 'PELAJAR/MAHASISWA' adalah "6"
        const dropdownPekerjaan = page.locator('#professions');
        await dropdownPekerjaan.selectOption('5', { force: true });
        const dropdownAgama = page.locator('#religions');
        await dropdownAgama.selectOption('3', { force: true });
        const statusPernikahan = page.locator('#maritals');
        await statusPernikahan.selectOption('1', { force: true });
        const jenisIdentitas = page.locator('#identity');
        await jenisIdentitas.selectOption('1', { force: true });
        await page.fill('input[name="customer_identity_number"]', '153163232589432');
        await page.fill('input[name="customer_phone"]', '834891119783');
        await page.fill('input[name="customer_mother_name"]', 'Kadrhheefedssd tes11ting');
        await page.fill('input[name="customer_heir_name"]', 'Pu ');
        await page.fill('input[name="customer_email"]', 'testi121827ng@gmail.com');
        await page.fill('textarea[name="address[1]"]', 'BR DLOD BLAMBANG');
        await page.fill('textarea[name="address[2]"]', 'Banjar tegal buah');
        await page.fill('textarea[name="address[3]"]', 'blahkiuh ciung wanara');
        await page.getByRole('button', {
            name: " Simpan"
        }).click();
        await page.keyboard.press('Enter');
        await page.keyboard.press('Enter');
        await page.screenshot({
            path: 'tambahcalonanggotatest_screenshot.png'
        })
    })
}
// tambahcalonanggotatest();
