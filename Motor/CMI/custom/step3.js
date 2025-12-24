import { genRandomIdCard } from "../common";
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const formattedDate = String(date.getDate()).padStart(2, "0");
const formattedHour = String(hour).padStart(2, "0");
const formattedMinute = String(minute).padStart(2, "0");
const addCarData = (
  carType,
  carBrand,
  carModel,
  carYear,
  chassisNumber,
  carColor,
  carCC,
  carWeight,
  carSeat,
  plateType,
  plateNumber,
  carProvince,
  effectiveDate
) => {
  cy.contains("ข้อมูลรถที่เอาประกัน").click();
  cy.contains("label", "ยี่ห้อ").next(".MuiFormControl-root").click();
  cy.contains(carBrand).click();
  cy.contains("label", "รุ่น").next(".MuiFormControl-root").click();
  cy.contains(carModel).click();
  cy.contains("label", "ปีจดทะเบียน").next(".MuiFormControl-root").click();
  cy.contains(carYear).click();
  cy.contains("label", "หมายเลขตัวถัง")
    .next(".MuiStack-root")
    .type(
      chassisNumber
        ? `${chassisNumber}`
        : `${date.toLocaleDateString(
            "en-GB"
          )}${formattedHour}${formattedMinute}`
    );
  cy.contains("label", "สีรถตามเล่มทะเบียน")
    .next(".MuiFormControl-root")
    .click();
  cy.get(".MuiMenu-list")
    .find(".MuiMenuItem-root")
    .filter(`:contains(${carColor})`)
    .eq(1)
    .click();
  if (carType == 1) {
    cy.contains("label", "ขนาดเครื่องยนต์").next(".MuiStack-root").type(carCC);
  }
  if (carType == 2){
    cy.contains("label", "น้ำหนักรวม (กก.)").next(".MuiStack-root").type(carWeight);
  }
  if (carType == 3){
    cy.contains("label", "จำนวนที่นั่ง").next(".MuiStack-root").type(carSeat);
  }
  switch (plateType) {
    case 1:
      cy.contains("ป้ายขาว").click();
      break;
    case 2:
      cy.contains("ป้ายแดง").click();
      break;
  }
  cy.contains("label", "หมายเลขทะเบียนรถ")
    .next(".MuiStack-root")
    .type(
      plateNumber
        ? `${plateNumber}`
        : `ทส${formattedHour}${formattedMinute}`
    );
  cy.contains("label", "จังหวัด").next(".MuiFormControl-root").click();
  cy.get(".MuiMenu-list")
    .find(".MuiMenuItem-root")
    .filter(`:contains(${carProvince})`)
    .click();
  //เลือกวันเริ่มคุ้มครอง
  //วัน
  cy.contains("div", "วันเริ่มคุ้มครอง")
    .next(".MuiStack-root")
    .next(".MuiStack-root")
    .find("#form-control-start_day")
    .click();
  cy.get(".MuiMenu-list")
    .get(
      `li[data-value="${
        effectiveDate.day ? effectiveDate.day.padStart(2, "0") : formattedDate
      }"]`
    )
    .click();
  //เดือน
  cy.contains("div", "วันเริ่มคุ้มครอง")
    .next(".MuiStack-root")
    .next(".MuiStack-root")
    .find("#form-control-start_month")
    .click();
  cy.get(".MuiMenu-list")
    .get(
      `li[data-value="${
        effectiveDate.month ? effectiveDate.month.padStart(2, "0") : date.getMonth() + 1
      }"]`
    )
    .click();
  //ปี
  cy.contains("div", "วันเริ่มคุ้มครอง")
    .next(".MuiStack-root")
    .next(".MuiStack-root")
    .find("#form-control-start_year")
    .click();
  cy.get(".MuiMenu-list")
    .get(
      `li[data-value="${
        effectiveDate.year ? effectiveDate.year.padStart(2, "0") : date.getFullYear()
      }"]`
    )
    .click();
  //บันทึก
  cy.contains("บันทึก").click();
};

const addOwnerData = (
  ownerTitle,
  ownerName,
  ownerLastName,
  ownerEmail,
  ownerPhone,
  ownerOccupation
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
  cy.contains("label", /^หมายเลขบัตรประชาชน$/)
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
  cy.contains("label", /^อาชีพ$/)
    .next(".MuiFormControl-root")
    .click();
  cy.get(".MuiMenu-list").contains(`${ownerOccupation}`).click();
  cy.contains("บันทึก").click();
  cy.contains("ดำเนินการต่อ").click();
};

const step3 = async (
  carType,
  carBrand,
  carModel,
  carYear,
  chassisNumber,
  carColor,
  carCC,
  carWeight,
  carSeat,
  plateType,
  plateNumber,
  carProvince,
  ownerTitle,
  ownerName,
  ownerLastName,
  ownerEmail,
  ownerPhone,
  ownerOccupation,
  effectiveDate
) => {
  addCarData(
    carType,
    carBrand,
    carModel,
    carYear,
    chassisNumber,
    carColor,
    carCC,
    carWeight,
    carSeat,
    plateType,
    plateNumber,
    carProvince,
    effectiveDate
  );
  addOwnerData(
    ownerTitle,
    ownerName,
    ownerLastName,
    ownerEmail,
    ownerPhone,
    ownerOccupation
  );
};
export default { step3 };
