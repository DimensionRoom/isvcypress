const addMember = (member) => {
  for (let index = 0; index < member - 1; index++) {
    cy.contains("เพิ่มผู้ร่วมเดินทาง").click();
  }
};

const changeNumberToRoman = (number) => {
  const romanNumberArr = [
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
    "viii",
    "ix",
    "x",
    "xi",
    "xii",
    "xiii",
    "xiv",
    "xv",
  ];
  return romanNumberArr[number];
};

const addMemberData = (
  member,
  telephone,
  uniqueEmail,
  sameEmail,
  emailPrefix,
  namePrefix
) => {
  const date = new Date();
  for (let index = 0; index < member; index++) {
    cy.contains(`คนที่ ${index + 1}`).click();
    cy.contains("label", "คำนำหน้าชื่อ").next(".MuiFormControl-root").click();
    cy.contains("Mr.").click();
    cy.contains("label", "ชื่อ (EN)")
      .next(".MuiStack-root")
      .type(namePrefix?`${namePrefix} ${changeNumberToRoman(index)}`:`Anonymous ${changeNumberToRoman(index)}`);
    cy.contains("label", "นามสกุล (EN)")
      .next(".MuiStack-root")
      .type(`isvtatest`);
    if (sameEmail === 0) {
      if (index === 0) {
        cy.contains("label", "อีเมล").next(".MuiStack-root").type(uniqueEmail);
        cy.contains("label", "ยืนยันอีเมล")
          .next(".MuiStack-root")
          .type(uniqueEmail);
      } else {
        cy.contains("label", "ใช้อีเมลอื่น")
          .find("input[type=checkbox]")
          .check();
        cy.get('input[name="owner_email"]').type(
          `${emailPrefix ? emailPrefix : "autoisvta"}${index + 1}@yopmail.com`
        );
      }
    } else if (sameEmail === 1) {
      if (index === 0) {
        cy.contains("label", "อีเมล").next(".MuiStack-root").type(uniqueEmail);
        cy.contains("label", "ยืนยันอีเมล")
          .next(".MuiStack-root")
          .type(uniqueEmail);
      } else {
        cy.contains("label", "ใช้อีเมลคนที่ 1")
          .find("input[type=checkbox]")
          .check();
      }
    } else if (sameEmail === 2) {
      if (index === 0) {
        cy.contains("label", "อีเมล").next(".MuiStack-root").type(uniqueEmail);
        cy.contains("label", "ยืนยันอีเมล")
          .next(".MuiStack-root")
          .type(uniqueEmail);
      } else if (index < member / 2) {
        cy.contains("label", "ใช้อีเมลคนที่ 1")
          .find("input[type=checkbox]")
          .check();
      } else if (index > member / 2) {
        cy.contains("label", "ใช้อีเมลอื่น")
          .find("input[type=checkbox]")
          .check();
        cy.get('input[name="owner_email"]').type(
          `${emailPrefix ? emailPrefix : "autoisvta"}${index + 1}@yopmail.com`
        );
      }
    }
    if (index === 0) {
      cy.contains("label", "เบอร์โทร").next(".MuiStack-root").type(telephone);
    } else {
      cy.contains("label", "ใช้เบอร์โทรคนที่ 1")
        .find("input[type=checkbox]")
        .check();
    }
    cy.contains("label", "วัน/เดือน/ปี เกิด (ค.ศ.)")
      .next(".MuiStack-root")
      .click();
      console.log('รหัส',date.getDate())
    cy.get(".MuiPickersDay-root").contains(date.getDate()).click(); // ใช้เป็นรหัสใช้เปิดไฟล์ xxxx2010
    cy.contains("เลขบัตรประชาชน / เลขหนังสือเดินทาง")
      .get(".MuiTypography-root")
      .contains("เลขหนังสือเดินทาง")
      .click();
    cy.get('input[name="owner_card_id"]').type(`passport${index + 1}`);
    if (index === 0) {
      cy.contains("label", "ที่อยู่ (EN)")
        .next(".MuiStack-root")
        .type(`home${index + 1}`);
      cy.contains("label", "รหัสไปรษณีย์")
        .next(".MuiFormControl-root")
        .type(`73120`);
      cy.contains("Wat Khae").click();
      cy.contains("label", "เหตุผลในการเดินทาง")
        .next(".MuiFormControl-root")
        .click();
      cy.contains("ท่องเที่ยว").click();
    } else {
      cy.contains("label", "ใช้ที่อยู่คนที่ 1")
        .find("input[type=checkbox]")
        .check();
    }
    cy.contains("บันทึกข้อมูลผู้เดินทาง").click();
  }
};

const step5 = async (
  member,
  telephone,
  uniqueEmail,
  sameEmail,
  emailPrefix,
  namePrefix
) => {
  addMember(member);
  addMemberData(
    member,
    telephone,
    uniqueEmail,
    sameEmail,
    emailPrefix,
    namePrefix
  );
  cy.contains("ดำเนินการต่อ").click();
};
export default { step5 };
