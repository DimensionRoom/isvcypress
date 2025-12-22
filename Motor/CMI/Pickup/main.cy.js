import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";

const env = "uat";
const date = new Date();

const carType = 2;
//1 = เก๋ง / กระบะ 4 ประตู / รถตู้ไม่เกิน 7 ที่นั่ง
//2 = กระบะ 2 ประตู
//3 = รถตู้
const carBrand = "Isuzu";
const carModel = "D-Max";
const carYear = "2023";
const chassisPrefix = "";
const carColor = "ขาว";
const carCC = "2000";
const carWeight = "2500";
const carSeat = "7";
const plateType = 1;
//1 = ป้ายขาว
//2 = ป้ายแดง
const platePrefix = "";
const carProvince = "กรุงเทพ";
//ข้อมูลบุคคล
const ownerTitle = "นาย";
const ownerName = "พรบห้า";
const ownerLastName = "กระบะ";
const ownerEmail = "demo.isv4@gmail.com";
const ownerPhone = "0801110624";
const ownerOccupation ="รับจ้าง / พนักงานบริษัท";
const effectiveDate = { day: "31", month: "", year: "" };

const renew = () => {
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

const run = async () => {
  renew();
  cy.config("requestTimeout", 10000);
  step1(carType);
  step2();
  step3(
    carType,
    carBrand,
    carModel,
    carYear,
    chassisPrefix,
    carColor,
    carCC,
    carWeight,
    carSeat,
    plateType,
    platePrefix,
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
};

describe("template spec", () => {
  it("passes", () => {
    run();
  });
});
