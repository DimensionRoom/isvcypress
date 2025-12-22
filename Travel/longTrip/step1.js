const step1 = () => {
  cy.get("#onetrust-accept-btn-handler").should("be.visible").click();
  cy.contains("ทริปยาวๆ").click();
  cy.contains("ถัดไป").click();
  cy.wait(1000);
};
export default { step1 };
