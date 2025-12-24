import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";
import { occupationLists } from "../common";

const env = "uat";
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbxEzbHt1sX2oiFXANYIq-JUvIMaV5fgA_CEHjyb7lk9Rcub5rWyrwzwlHCsJPb8dIYi/exec";

const setENV = () => {
  cy.viewport(1980, 1080);
  cy.visit(
    env == "uat"
      ? "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/compulsory"
      : env == "dev"
      ? "https://insurverse-dev-1-environment-insure.insurverse.co.th/shopping/compulsory"
      : env == "pd"
      ? ""
      : ""
  );
};

const carTypeToInt = (carType) => {
  switch (carType) {
    case "รถเก๋ง":
      return 1;
    case "รถกระบะ":
      return 2;
    case "รถตู้":
      return 3;
  }
};

describe("Insurance Flow with Google Sheets", () => {
  it("ดึงข้อมูลจาก Google Sheet และรันกระบวนการซื้อประกัน", () => {
    // ดึงข้อมูลจาก API
    cy.request(scriptUrl).then((response) => {
      const row = response.body[0]; // ใช้ข้อมูลแถวแรกจาก Sheet

      const carType = carTypeToInt(row.carType) || 1;
      //1 = เก๋ง / กระบะ 4 ประตู / รถตู้ไม่เกิน 7 ที่นั่ง
      //2 = กระบะ 2 ประตู
      //3 = รถตู้
      const carBrand = row.carBrand || "Honda";
      const carModel = row.carModel || "Accord";
      const carYear = String(row.carYear) || "2023";
      const chassisNumber = row.chassisNumber || "";
      const carColor = row.carColor || "ขาว";
      const carCC = String(row.carCC) || "2000";
      const carWeight = String(row.carWeight) || "2500";
      const carSeat = String(row.carSeat) || "7";
      const plateType = Number(row.plateType === "ป้ายขาว" ? 1 : 2 || 1);
      //1 = ป้ายขาว
      //2 = ป้ายแดง
      const plateNumber = "";
      const carProvince = "กรุงเทพ";
      //ข้อมูลบุคคล
      const ownerTitle = row.ownerTitle || "นาย";
      const ownerName = row.ownerName || "ทดสอบ";
      const ownerLastName = row.ownerLastName || "พรบ";
      const ownerEmail = row.ownerEmail || "demo.isv4@gmail.com";
      const ownerPhone = row.ownerPhone || "0801110624";
      const ownerOccupation = row.ownerOccupation || occupationLists[0].occupation_name;
      const effectiveDate = { 
        day: row.effDay || "", 
        month: row.effMonth || "", 
        year: row.effYear || "" 
      };

      setENV();
      cy.config("requestTimeout", 10000);
      step1(carType);
      step2();
      step3(
        carType,
        carBrand,
        carModel,
        carYear,
        chassisNumber,
        carColor,
        carCC,
        carWeight,
        carSeat,
        plateType,
        plateNumber,
        carProvince,
        ownerTitle,
        ownerName,
        ownerLastName,
        ownerEmail,
        ownerPhone,
        ownerOccupation,
        effectiveDate
      );
      step4();
    });
  });
});
