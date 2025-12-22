const step1 = () => {
  cy.get("#onetrust-accept-btn-handler").should("be.visible").click();
  cy.contains("ทริปสั้นๆ").click();
  cy.contains("ถัดไป").click();
  cy.wait(1000);
};
export default { step1 };
