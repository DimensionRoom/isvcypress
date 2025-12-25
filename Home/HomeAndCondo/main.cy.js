import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";

const env = "uat";
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbwEXDlXRoPE-MKcCKb9SPgtelx7TAALSEmMhklK_zolBfMUcmi28MHBmNhaZfCuGznE/exec";

const setENV = () => {
  cy.viewport(1980, 1080);
  cy.visit(
    env == "uat"
      ? "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/home"
      : env == "dev"
      ? ""
      : env == "pd"
      ? ""
      : ""
  );
};

describe("Insurance Flow with Google Sheets", () => {
  it("ดึงข้อมูลจาก Google Sheet และรันกระบวนการซื้อประกัน", () => {
    // ดึงข้อมูลจาก API
    cy.request(scriptUrl).then((response) => {
      const row = response.body[0]; // ใช้ข้อมูลแถวแรกจาก Sheet
      const homeType = row.homeType || "บ้าน";
      const homeProvince = row.homeProvince || "กรุงเทพ";
      const homeFurniture =
        String(row.homeFurniture).toUpperCase() === "TRUE" ? true : false;
      const homeAddOns = row.homeAddOns.split(",").map((item) => item.trim());
      //ข้อมูลบุคคล
      const ownerTitle = row.ownerTitle || "นาย";
      const ownerName = row.ownerName || "ทดสอบ";
      const ownerLastName = row.ownerLastName || "บ้าน";
      const ownerEmail = row.ownerEmail || "demo.isv4@gmail.com";
      const ownerPhone = row.ownerPhone || "0801110624";
      //ข้อมูลสถานที่
      const ownerStatus =
        String(row.owner).toUpperCase() === "YES" ? true : false;
      const effectiveDate = {
        day: row.effDay || "",
        month: row.effMonth || "",
        year: row.effYear || "",
      };
      const promoCode = {
        use: row.promoCodeUse || "",
        code: row.promoCodeCode || "",
        set: String(row.promoCodeSet || "5"),
      };

      setENV();
      cy.config("requestTimeout", 10000);
      step1(homeType, homeProvince);
      step2(homeType, homeFurniture, homeAddOns);
      step3(
        ownerTitle,
        ownerName,
        ownerLastName,
        ownerEmail,
        ownerPhone,
        ownerStatus,
        effectiveDate,
        promoCode
      );
      step4();
    });
  });
});
