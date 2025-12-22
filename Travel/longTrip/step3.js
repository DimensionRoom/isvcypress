const step3 = () => {
  const today = new Date();
  const currentDay = today.getDate(); // วันปัจจุบัน
  cy.contains("label", "วันเดินทางไป").next(".MuiFormControl-root").click(); //For show date picker
  cy.get(".MuiPickersDay-root")
    .contains(new RegExp(`^${currentDay}$`)) // หาวันปัจจุบัน
    .click(); // เลือกวัน
  cy.contains("คำนวณเบี้ยประกัน").click();
};
export default { step3 };
