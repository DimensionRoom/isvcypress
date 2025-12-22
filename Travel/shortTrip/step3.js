const step3 = () => {
  const today = new Date();
  const currentDay = today.getDate(); // วันปัจจุบัน
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // วันสุดท้ายของเดือน

  // เลือกวันเดินทางไป (วันปัจจุบัน)
  cy.contains("label", "วันเดินทางไป")
    .next(".MuiFormControl-root")
    .click();
  cy.get(".MuiPickersDay-root")
    .contains(new RegExp(`^${currentDay}$`)) // ใช้ RegExp เพื่อให้แน่ใจว่าเลือกเฉพาะวันที่ตรงเป๊ะ
    .click();
    cy.wait(500);
    cy.get(".MuiPickersDay-root")
    .contains(new RegExp(`^${endOfMonth}$`))
    .click();

  // กดปุ่มคำนวณเบี้ยประกัน
  cy.contains("คำนวณเบี้ยประกัน").click();
};

export default { step3 };
