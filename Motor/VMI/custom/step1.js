const step1 = (carBrand, carModel, carYear, carCC) => {
  cy.get("#onetrust-accept-btn-handler").should("be.visible").click();
  cy.contains(carBrand).click();
  cy.wait(1000);
  cy.contains(carModel).click();
  cy.contains("เลือกปีจดทะเบียนรถ").click();
  cy.get(`li[data-value="${carYear}"]`).click();
  cy.contains("เลือกซีซีรถยนต์").click();
  cy.get(
    `li[data-value="${
      carCC == ""
        ? "unknown"
        : carCC > 2000
        ? ">2000"
        : "<=2000"
    }"]`
  ).click();
  cy.contains("button","ดูแผนประกันที่ใช่").click();
};
export default { step1 };
