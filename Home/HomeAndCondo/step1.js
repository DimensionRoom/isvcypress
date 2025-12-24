const step1 = (homeType,homeProvince) => {
  cy.get("#onetrust-accept-btn-handler").should("be.visible").click();
  cy.contains('กรุณาเลือกจังหวัด').click();
  cy.contains(homeProvince).click()
  cy.contains('button',homeType).click();
  cy.wait(1000);
};
export default { step1 };
