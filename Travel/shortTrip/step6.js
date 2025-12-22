const step6 = async (discount, discountCode) => {
  if (discount == 1) {
    cy.get('input[placeholder="ใส่โค้ด"]').eq(0).type(discountCode);
    cy.contains("ใช้โค้ด").click();
    // cy.contains("เลือกวิธีการชำระเงิน").click();
    cy.contains("ยืนยันการทำประกันภัย").click();

  } else {
    // cy.contains("เลือกวิธีการชำระเงิน").click();
    cy.contains("ยืนยันการทำประกันภัย").click();
  }
};
export default { step6 };
