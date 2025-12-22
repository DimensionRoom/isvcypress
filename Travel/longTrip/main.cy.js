import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";
import { step5 } from "./step5";
import { step6 } from "./step6";

const env = "uat";
const date = new Date();

const selectedPackage = 1;
// 1 = S
// 2 = M
// 3 = L

const selectedAddOn = 3;
// 1 = คุ้มครองชีวิตและทรัพย์สิน
// 2 = คุ้มครองความไม่สะดวกในการเดินทาง
// 3 = ทั้งสองแบบ

const member = 15;
//สูงสุด 15 คน

const namePrefix = `${env}Name`; //ถ้าใส่ "" จะเป็น ชื่อ Anonymous ตามด้วย Index

const telephone = "0801110624";

const uniqueEmail = "tadasama115599@gmail.com";

const sameEmail = 0;
// 0 = ไม่ใช้อีเมลเดียวกับคนที่ 1
// 1 = ใช้อีเมลเดียวกับคนที่ 1
// 2 = ใช้ผสมกันอย่างละครึ่ง

const emailPrefix = `ta${env}${date.getDate()}${date.getMonth() + 1}`; // เช่น tadev30115 คือทดสอบวันที่ 30 เดือน 1 email คนที่ 15

const discount = 0;
// 0 = ไม่ใช้
// 1 = ใช้
const discountCode = env === "dev" ? "tapall" : env === "uat" ? "taallpro" : "";
// taallpro = ใช้ได้ทุก pack ลด 10% on uat
// tapall = ใช้ได้ทุก pack ลด 10% on dev

const renew = () => {
  cy.viewport(1980, 1080);
  cy.visit(
    env == "uat"
      ? "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/travel"
      // ? "https://head.isv-pwa.pages.dev/shopping/travel"
      : env == "dev"
      ? "https://insurverse-webapp-frontend.pages.dev/shopping/travel"
      : env == "pd"
      ? "https://insure.insurverse.co.th/shopping/travel"
      : ""
  );
};

const run = async () => {
  renew();
  cy.config("requestTimeout", 10000);
  step1();
  step2();
  step3();
  step4(selectedPackage, selectedAddOn);
  step5(member, telephone, uniqueEmail, sameEmail, emailPrefix, namePrefix);
  step6(discount, discountCode);
};

describe("template spec", () => {
  it("passes", () => {
    run();
  });
});
