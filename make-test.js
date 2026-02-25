const fs = require('fs');
const path = require('path');

// Mengambil nama file/fungsi dari input CLI (misal: "editProfile")
const namaFungsi = process.argv[2];

if (!namaFungsi) {
  console.log('❌ Error: Masukkan nama file! Contoh: npm run make:test editProfile');
  process.exit(1);
}

// Template yang sudah disesuaikan dengan milik Anda, tapi nama fungsinya dinamis
const template = `import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

function ${namaFungsi}() {
    dotenv.config({ path: path.resolve(__dirname, '..', '..', 'secreet_key', '.env') });
    const username = process.env.USERNAME_COOPMAX!;
    const password = process.env.PASSWORD_COOPMAX!;

    test('testing ${namaFungsi}', async ({ page }) => {
        await page.goto('https://test-5.solusisakti.xyz/admin/auth/login');
        await page.waitForTimeout(5000);
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
          await page.keyboard.press('Enter');
        await expect(page).toHaveURL('https://test-5.solusisakti.xyz/admin/cb/dashboard/umum');
        await page.waitForTimeout(5000);
        await page.screenshot({
            path : '${namaFungsi}_screenshot.png'
        })
    })
}
${namaFungsi}();
`;

// Tentukan path penyimpanan (Pastikan folder 'tests' sudah ada)
const filePath = path.join(__dirname, 'tests', `${namaFungsi}.spec.ts`);

// Buat file baru
fs.writeFileSync(filePath, template);
console.log(`✅ Berhasil! File dibuat di: ${filePath}`);