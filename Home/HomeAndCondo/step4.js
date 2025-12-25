const step4 = async () => {
  cy.contains(/^ยืนยันการทำประกันภัย$/).click();
  cy.get('input[name="consent-marketing-0"').eq(1).check();
  cy.get('input[name="consent-marketing-0"').eq(3).check(); // dev เขียนผิดไม่ควรใช้ชื่อเดียวกัน
  cy.contains(/^ดำเนินการต่อ$/).click();
  cy.contains("button", "ชำระเงิน").click();
  cy.get("#tel-cardNumber").type("5555555555554444");
  cy.get("#expyear").type("1030");
  cy.get("#tel-cvv").type("123");
  cy.contains("button","Continue payment").click();
  cy.on("uncaught:exception", (e) => {
    if (
      e.message.includes(
        "Cannot read properties of null (reading 'postMessage')"
      )
    ) {
      return false;
    }
  });
  cy.get('input[name="challengeDataEntry"]').type("123456");
  cy.contains("button", "Submit").click();
  cy.contains("Return to Merchant").click();
  cy.contains("Back to merchant").click();
};
export default { step4 };
