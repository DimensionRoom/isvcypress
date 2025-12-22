const step2 = () => {
  cy.get(".MuiAutocomplete-root")
    .type(`THE UNITED STATE`);
  cy.contains("THE UNITED STATE OF AMERICA, สหรัฐอเมริกา").click();
  cy.contains("ถัดไป").click();
};
export default { step2 };
