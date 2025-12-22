import { genRandomIdCard } from "../common";

const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const formattedDate = String(date.getDate()).padStart(2, "0");
const formattedHour = String(hour).padStart(2, "0");
const formattedMinute = String(minute).padStart(2, "0");

const addCarData = (
  cmi,
  chassisNumber,
  carColor,
  carCC,
  plateType,
  plateNumber,
  carProvince,
  effectiveDate
) => {
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
  cy.contains("label", "ขนาดเครื่องยนต์").next(".MuiStack-root").type(carCC);
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
  if (cmi) {
    cy.get("#form-control-day_coverage_same").click();
  } else {
    cy.get("#form-control-day_coverage_insurance_plan").click();
  }
  cy.get(".MuiMenu-list")
    .get(
      `li[data-value="${
        effectiveDate.day ? effectiveDate.day.padStart(2, "0") : formattedDate
      }"]`
    )
    .click();
  //เดือน
  if (cmi) {
    cy.get("#form-control-month_coverage_same").click();
  } else {
    cy.get("#form-control-month_coverage_insurance_plan").click();
  }
  cy.get(".MuiMenu-list")
    .get(
      `li[data-value="${
        effectiveDate.month ? effectiveDate.month.padStart(2, "0") : date.getMonth() + 1
      }"]`
    )
    .click();
  //ปี
  if (cmi) {
    cy.get("#form-control-year_coverage_same").click();
  } else {
    cy.get("#form-control-year_coverage_insurance_plan").click();
  }
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
  ownerBirthday,
  ownerOccupation,
  benefitData,
  driver
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
    .find("#form-control-day_birth")
    .click();
  cy.get(".MuiMenu-list").get(`li[data-value="${ownerBirthday.day?ownerBirthday.day.padStart(2, "0"):formattedDate}"]`).click();
  cy.contains("div", "วัน/เดือน/ปี เกิด")
    .next(".MuiStack-root")
    .find("#form-control-month_birth")
    .click();
  cy.get(".MuiMenu-list")
    .get(`li[data-value="${ownerBirthday.month?ownerBirthday.month.padStart(2, "0"):date.getMonth() + 1}"]`)
    .click();
  cy.contains("div", "วัน/เดือน/ปี เกิด")
    .next(".MuiStack-root")
    .find("#form-control-year_birth")
    .click();
  cy.get(".MuiMenu-list").get(`li[data-value="${ownerBirthday.year?ownerBirthday.year.padStart(2, "0"):'2000'}"]`).click();
  //สุ่มบัตรประชาชน
  if (benefitData.type == "person") {
    cy.contains("label", /^หมายเลขบัตรประชาชน$/)
      .next(".MuiStack-root")
      .type(driver[0].idCard);
  } else {
    cy.contains("label", /^หมายเลขบัตรประชาชน$/)
      .next(".MuiStack-root")
      .type(genRandomIdCard());
  }
  cy.contains("label", /^ที่อยู่ตามบัตรประชาชน$/)
    .next(".MuiStack-root")
    .type("11/11");
  cy.contains("label", "รหัสไปรษณีย์")
    .next(".MuiFormControl-root")
    .type(`10310`);
  cy.contains("ห้วยขวาง").click();
  cy.contains("label", /^อาชีพ$/)
    .next(".MuiFormControl-root")
    .click();
  cy.get(".MuiMenu-list").contains(`${ownerOccupation}`).click();
};

const addDriverData = (driver) => {
  for (let i = 0; i < driver.length; i++) {
    cy.get(`#form-control-dirvers\\.${i}\\.prefix_id`)
      .find(".MuiInputBase-input")
      .click();
    cy.get(".MuiMenu-list").get(`li[data-value="${driver[i].title}"]`).click();
    cy.get(`#form-control-dirvers\\.${i}\\.first_name`)
      .find(".MuiInputBase-input")
      .type(driver[i].name);
    cy.get(`#form-control-dirvers\\.${i}\\.last_name`)
      .find(".MuiInputBase-input")
      .type(driver[i].lastName);
    cy.get(`#form-control-dirvers\\.${i}\\.day_birth`).click();
    cy.get(".MuiMenu-list").get(`li[data-value="${formattedDate}"]`).click();
    cy.get(`#form-control-dirvers\\.${i}\\.month_birth`).click();
    cy.get(".MuiMenu-list")
      .get(`li[data-value="${date.getMonth() + 1}"]`)
      .click();
    cy.get(`#form-control-dirvers\\.${i}\\.year_birth`).click();
    cy.get(".MuiMenu-list")
      .get(`li[data-value="${date.getFullYear() - driver[i].age}"]`)
      .click();
    cy.get(`#form-control-dirvers\\.${i}\\.occupation_code`).click();
    cy.get(".MuiMenu-list").contains(`${driver[i].occupation}`).click();
    // cy.get(`#form-control-dirvers\\.${i}\\.citizen_id`)
    //   .find(".MuiInputBase-input")
    //   .type(genRandomIdCard());
    // cy.get(`#form-control-dirvers\\.${i}\\.license_number`)
    //   .find(".MuiInputBase-input")
    //   .type(driver[i].licens);
  }
};

const addBenefitData = (benefitData) => {
  if (benefitData.type != "none") {
    if (benefitData.type == "finance") {
      cy.contains("button", "ระบุชื่อบริษัทไฟแนนซ์").click();
      cy.get(`#form-control-financial_name`)
        .find(".MuiInputBase-input")
        .type(benefitData.lists[0].name);
    } else if (benefitData.type == "person") {
      cy.contains("เป็นคนเดียวกับผู้เอาประกัน").click();
    }
  }
};

const step5 = async (
  cmi,
  chassisNumber,
  carColor,
  carCC,
  plateType,
  plateNumber,
  carProvince,
  ownerTitle,
  ownerName,
  ownerLastName,
  ownerBirthday,
  ownerOccupation,
  driver,
  benefitData,
  effectiveDate
) => {
  cy.contains(/^กรอกข้อมูลกรมธรรม์$/).click();
  cy.wait(1000);
  cy.contains("div", /^ข้อมูลรถที่เอาประกัน$/).click();
  addCarData(
    cmi,
    chassisNumber,
    carColor,
    carCC,
    plateType,
    plateNumber,
    carProvince,
    effectiveDate
  );
  addOwnerData(
    ownerTitle,
    ownerName,
    ownerLastName,
    ownerBirthday,
    ownerOccupation,
    benefitData,
    driver
  );
  if (driver.length) {
    addDriverData(driver);
  }
  addBenefitData(benefitData);
  cy.contains("บันทึก").click();
  cy.contains("ดำเนินการต่อ").click();
};
export default { step5 };
