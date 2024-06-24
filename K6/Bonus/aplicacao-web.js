import { chromium } from 'k6/experimental/browser';
import { sleep } from "k6";
import { check } from "k6";

export const options = {
    scenarios: {
        ui: {
            executor: "constant-vus",
            vus: 3,
            duration: "10s",
            options: {
                browser:{
                    type: "chromium",
                }
                    
            }
        },
    },
    thresholds: {
        checks: ['rate == 1.0']
    }
}

export default async function () {

    const page = chromium.newPage();

    try {

        await page.goto('https://test.k6.io/my_messages.php');

        page.locator('input[name="Login"]').type('admin');
        page.locator('input[name="Senha"]').type('123');

        const submitbutton = page.locator('input[type="submit"]');

        await Promise.all([submitbutton.click(), page.waitForNavigation()]);

        check(page, {
            header: (p) => p.locator('h2').textContent() === 'Welcome, admin!',});
        
    }finally{
         page.close();
    }
}  

