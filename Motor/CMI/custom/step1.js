const step1 = (carType) => {
  cy.get("#onetrust-accept-btn-handler").should("be.visible").click();
  switch (carType) {
    case 1:
      cy.contains("เก๋ง / กระบะ 4 ประตู / รถตู้ไม่เกิน 7 ที่นั่ง").click();
      break;
    case 2:
      cy.contains("กระบะ 2 ประตู").click();
      break;
    case 3:
      cy.contains(/^รถตู้$/).click();
      break;
  }
  cy.wait(1000);
};
export default { step1 };
