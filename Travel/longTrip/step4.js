const toggleAddon = (addOn) => {
  if (addOn == 1) {
    cy.contains("div", "คุ้มครองชีวิตและทรัพย์สิน") // หา label คุ้มครองชีวิตและทรัพย์สิน
      .get(".MuiSwitch-root")
      .eq(0)
      .find('input[type="checkbox"]')
      .should("not.be.checked")
      .click();
  }
  if (addOn == 2) {
    cy.contains("div", "คุ้มครองความไม่สะดวกในการเดินทาง") // หา label คุ้มครองความไม่สะดวกในการเดินทาง
      .get(".MuiSwitch-root")
      .eq(1)
      .find('input[type="checkbox"]')
      .should("not.be.checked")
      .click();
  }
};

const step4 = (selectedPackage, selectedAddOn) => {
  if (selectedPackage === 1) {
    cy.get(".MuiBox-root").contains("Package S").click();
    if (selectedAddOn === 1) {
      toggleAddon(1);
    }
    if (selectedAddOn === 2) {
      toggleAddon(2);
    }
    if (selectedAddOn === 3) {
      toggleAddon(1);
      toggleAddon(2);
    }
    cy.wait(1000);
    cy.contains("ถูกใจแผนนี้").click();
  }
};
export default { step4 };
