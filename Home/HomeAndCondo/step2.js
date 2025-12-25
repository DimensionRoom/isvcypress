const addOnsToIndex = (addOns) =>{
  switch (addOns){
    case"ภัยธรรมชาติ":
    return 0;
    case"โจรกรรม":
    return 1;
    case"ความเสียหายต่อบุคคลภายนอก":
    return 2;
  }
}

const addFurniture = () => {
  cy.contains("div", "ความคุ้มครองบิ้วอินและเฟอร์นิเจอร์")
    .get(".MuiSwitch-root")
    .eq(0)
    .find('input[type="checkbox"]')
    .should("not.be.checked")
    .click();
};

const addAddOns = (homeAddOns) =>{
  cy.contains("button","ความคุ้มครองเสริม").click();
  for (let i = 0; i < homeAddOns.length; i++) {
    cy.contains(homeAddOns[i]).click();
    cy.contains("div", homeAddOns[i])
    .get(".MuiSwitch-root")
    .eq(addOnsToIndex(homeAddOns[i]))
    .find('input[type="checkbox"]')
    .should("not.be.checked")
    .click();
  }
}

const step2 = (homeType,homeFurniture,homeAddOns) => {
  if (homeType == 'บ้าน' && homeFurniture) {
    addFurniture();
  }
  if (homeAddOns.length) {
    addAddOns(homeAddOns);
  }
  cy.contains("ถูกใจแผนนี้").click();
};
export default { step2 };
