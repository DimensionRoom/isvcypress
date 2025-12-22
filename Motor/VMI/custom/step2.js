import { genRandomIdCard } from "../common";

const date = new Date();

const addAcc = (carAcc) => {
  cy.contains("div", "ติดอุปกรณ์เพิ่มเติมมาใช่ไหมคะ?")
    .get(".MuiSwitch-root")
    .eq(0)
    .find('input[type="checkbox"]')
    .should("not.be.checked")
    .click();
  // for (let i = 0; i < carAcc.acc.length; i++) {
  //   if (carAcc.acc[i] == "ac1") {
  //     cy.contains("สเกิร์ตรอบคัน").click();
  //   }
  //   if (carAcc.acc[i] == "ac2") {
  //     cy.contains("ปลายท่อ").click();
  //   }
  //   if (carAcc.acc[i] == "ac3") {
  //     cy.contains("ล้อแม็ก/ยาง").click();
  //   }
  // }
  for (let i = 0; i < carAcc.acc.length; i++) {
    cy.contains(carAcc.acc[i]).click();
  }
  cy.contains(carAcc.value).click();
  cy.contains("ยืนยัน").click();
};

const addDriver = (driver) => {
  for (let i = 0; i < driver.length; i++) {
    cy.wait(1000);
    cy.contains(".MuiBox-root", "เพิ่มผู้ขับขี่").click();
    if(driver[i].idCard != ''){
      cy.get(`input[name="carDriver\\.${i}\\.id_card"]`).type(driver[i].idCard);
    } else{
      cy.get(`input[name="carDriver\\.${i}\\.id_card"]`).type(genRandomIdCard());
    }
    cy.get(`input[name="carDriver\\.${i}\\.driver_license"]`).type(
      driver[i].licens
    );
    if(driver[i].consent){
      cy.get(`input[name="carDriver\\.${i}\\.consent_driving_behavior_checkbox"]`).check();
    }
    cy.contains("เช็กส่วนลดของคุณ").click();
    // cy.contains("เลือกปีเกิด (พ.ศ.)").click();
    // cy.get(".MuiMenu-list")
    //   .get(`li[data-value="${date.getFullYear() - driver[i].age}"]`)
    //   .click();
  }
};

const addCarCamera = (policyClass) => {
  cy.contains("div", "คุณมีกล้องหน้ารถไหมคะ?")
    .get(".MuiSwitch-root")
    .eq(policyClass === "ประกันชั้น 3" ? 0 : 1)
    .find('input[type="checkbox"]')
    .should("not.be.checked")
    .click();
};

const addCMI = (policyClass) => {
  cy.contains("div", "ซื้อ พ.ร.บ. ที่นี่ถูกกว่านะคะ")
    .get(".MuiSwitch-root")
    .eq(policyClass === "ประกันชั้น 3" ? 1 : 2)
    .find('input[type="checkbox"]')
    .should("not.be.checked")
    .click();
};

const step2 = async (
  policyClass,
  garageType,
  carAcc,
  driver,
  carCamera,
  cmi
) => {
  if (policyClass !== "ประกันชั้น 1") {
    cy.get("#basic-button").click();
    if (policyClass === "ประกันชั้น 3") {
      cy.get(".MuiMenu-list")
        .find(".MuiMenuItem-root")
        .filter(`:contains(${policyClass})`)
        .eq(1)
        .click({ force: true });
    } else {
      cy.get(".MuiMenu-list")
        .find(".MuiMenuItem-root")
        .filter(`:contains(${policyClass})`)
        .click({ force: true });
    }
    cy.contains("ยืนยัน").click();
  }
  if (garageType === "ซ่อมศูนย์") {
    cy.contains("ซ่อมศูนย์").click();
  }
  if (carAcc.acc.length&&carAcc.acc[0] != '' && policyClass !== "ประกันชั้น 3") {
    console.log(carAcc.acc,'carcc')
    addAcc(carAcc);
  }
  if (driver.length) {
    addDriver(driver);
  }
  if (carCamera) {
    addCarCamera(policyClass);
  }
  if (cmi) {
    addCMI(policyClass);
  }
  cy.contains("โอเค ไปต่อ!").click();
};
export default { step2 };
