import { genRandomIdCard } from "../common";

const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const formattedDate = String(date.getDate()).padStart(2, "0");
const formattedHour = String(hour).padStart(2, "0");
const formattedMinute = String(minute).padStart(2, "0");

const addOwnerData = (
  ownerTitle,
  ownerName,
  ownerLastName,
  ownerEmail,
  ownerPhone
) => {
  cy.contains("ข้อมูลเจ้าของกรมธรรม์").click();
  cy.contains("label", /^คำนำหน้าชื่อ$/, { matchCase: true })
    .next(".MuiFormControl-root")
    .click();
  cy.contains(ownerTitle).click();
  cy.contains("label", /^ชื่อ$/)
    .next(".MuiStack-root ")
    .type(ownerName ? `${ownerName}` : `ทดสอบชื่อ`);
  cy.contains("label", /^นามสกุล$/)
    .next(".MuiStack-root")
    .type(ownerLastName ? `${ownerLastName}` : `ทดสอบนามสกุล`);
  //เลือกวันเดือนปีเกิดfixปีเป็น2000วันและเดือนเป็นปัจจุบัน
  cy.contains("div", "วัน/เดือน/ปี เกิด")
    .next(".MuiStack-root")
    .find("#form-control-birthDay")
    .click();
  cy.get(".MuiMenu-list").get(`li[data-value="${formattedDate}"]`).click();
  cy.contains("div", "วัน/เดือน/ปี เกิด")
    .next(".MuiStack-root")
    .find("#form-control-birthMonth")
    .click();
  cy.get(".MuiMenu-list")
    .get(`li[data-value="${date.getMonth() + 1}"]`)
    .click();
  cy.contains("div", "วัน/เดือน/ปี เกิด")
    .next(".MuiStack-root")
    .find("#form-control-birthYear")
    .click();
  cy.get(".MuiMenu-list").get(`li[data-value="2000"]`).click();
  //สุ่มบัตรประชาชน
  cy.contains("label", /^เลขบัตรประชาชน$/)
    .next(".MuiStack-root")
    .type(genRandomIdCard());
  cy.contains("label", /^ที่อยู่ตามบัตรประชาชน$/)
    .next(".MuiStack-root")
    .type("11/11");
  cy.contains("label", "รหัสไปรษณีย์")
    .next(".MuiFormControl-root")
    .type(`10310`);
  cy.contains("ห้วยขวาง").click();
  cy.contains("label", /^อีเมล$/)
    .next(".MuiStack-root")
    .type(ownerEmail);
  cy.contains("label", /^ยืนยันอีเมล$/)
    .next(".MuiStack-root")
    .type(ownerEmail);
  cy.contains("label", /^เบอร์โทร$/)
    .next(".MuiStack-root")
    .type(ownerPhone);
  cy.contains("บันทึก").click();
};

const addOwnerLocationData = (ownerStatus, effectiveDate) => {
  cy.contains("ข้อมูลสถานที่เอาประกัน").click();
  if (ownerStatus) {
    cy.contains("ใช่").click();
  } else {
    cy.contains("ใช่").click();
  }
  cy.contains("label", /^ที่อยู่$/)
    .next(".MuiStack-root")
    .type("11/11");
  cy.contains("label", "รหัสไปรษณีย์")
    .next(".MuiFormControl-root")
    .type(`71150`);
  cy.contains("ไทรโยค").click();

  cy.contains("div", "วันเริ่มคุ้มครอง").find(".MuiStack-root").click();
  cy.contains(
    effectiveDate.day
      ? new RegExp(`^${Number(effectiveDate.day) + 1}$`).padStart(2, "0")
      : new RegExp(`^${Number(formattedDate) + 1}$`)
  ).click();
};

const step3 = async (
  ownerTitle,
  ownerName,
  ownerLastName,
  ownerEmail,
  ownerPhone,
  ownerStatus,
  effectiveDate,
  promoCode
) => {
  addOwnerData(ownerTitle, ownerName, ownerLastName, ownerEmail, ownerPhone);
  addOwnerLocationData(ownerStatus, effectiveDate);
  cy.contains("บันทึก").click();
  cy.contains("สรุปแผนประกันเพื่อชำระเงิน").click();
  cy.wait(1000);
  if(promoCode.use){
    cy.contains("เลือกโค้ดส่วนลด").click();;
    if(promoCode.use == "code" && promoCode.code != ""){
      cy.get("#searchPromotionText").type(`${promoCode.code}`);
      cy.contains("button","ค้นหา").click();
    }
    else if(promoCode.use == "set" && promoCode.set != ""){
      cy.contains(`ส่วนลด ${promoCode.set} %`).click();
      cy.contains("button","ใช้โค้ด").click();
    } else {
      cy.contains("ย้อนกลับ").click();
    }
  }
  cy.contains("button", "ยืนยันการทำประกันภัย").click();
  cy.pause();
};
export default { step3 };
