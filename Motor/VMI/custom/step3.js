const step3 = async (ownerName, ownerLastName, ownerEmail, ownerPhone, promoCode) => {
  cy.get('input[name="FirstName"').type(
    ownerName ? `${ownerName}` : `ทดสอบชื่อ`
  );
  cy.get('input[name="LastName"').type(
    ownerLastName ? `${ownerLastName}` : `ทดสอบนามสกุล`
  );
  cy.get('input[name="Email"').type(
    ownerEmail ? `${ownerEmail}` : `testvmi@yopmail.com`
  );
  cy.get('input[name="ConfirmEmail"').type(
    ownerEmail ? `${ownerEmail}` : `testvmi@yopmail.com`
  );
  cy.get('input[name="Mobile"').type(
    ownerPhone ? `${ownerPhone}` : `0801110624`
  );
  cy.contains("button", "ดูสรุปแผนประกัน").click();
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
