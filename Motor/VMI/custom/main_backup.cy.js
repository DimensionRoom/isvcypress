import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";
import { step5 } from "./step5";
import {driverStarLists} from "../common";
import {occupationLists} from "../common";

const env = "uat";
const date = new Date();

const carBrand = "Honda";
const carModel = "Accord";
const carYear = "2023";
const policyClass = "ประกันชั้น 3";
// 1 = ประกันชั้น 1
// 2+ = ประกันชั้น 2+
// 3+ = ประกันชั้น 3+
// 3 = ประกันชั้น 3
const garageType = "ซ่อมอู่";
// กรณีเลือกซ่อมศูนย์ carYear ต้องไม่เกิน 5 ปีจากปีปัจจุบัน
const carAcc = { acc: [], value: "10,000" };
// const carAcc = { acc: ["ac1", "ac2", "ac3"], value: "10,000" };
// const driver = [];
const driverList = [
  // { idCard: '1102001659595', age: 20,title:'นาย',name:'คนขับหนึ่ง',lastName:'สกุลหนึ่ง',licens:'12345678',occupation:'รับจ้าง / พนักงานบริษัท',consent:true },
  { idCard: '', star:1, age: 30,title:'นาย',name:'คนขับหนึ่ง',lastName:'สกุลหนึ่ง',licens:'12345678',occupation: occupationLists[0].occupation_name,consent:true },
  { idCard: '', star:1, age: 30,title:'นาง',name:'คนขับสอง',lastName:'สกุลสอง',licens:'87654321',occupation: occupationLists[0].occupation_name,consent:true },
  { idCard: '', star:1, age: 30,title:'นาย',name:'คนขับสาม',lastName:'สกุลสาม',licens:'55555555',occupation: occupationLists[0].occupation_name,consent:true },
  { idCard: '', star:1, age: 30,title:'นาง',name:'คนขับสี่',lastName:'สกุลสี่',licens:'22222222',occupation: occupationLists[0].occupation_name,consent:true },
  { idCard: '', star:1, age: 30,title:'นาย',name:'คนขับห้า',lastName:'สกุลห้า',licens:'11111111',occupation: occupationLists[0].occupation_name,consent:true }
];
const driver = (starList, driverList) => {
  const starMap = {};
  for (const item of starList) {
      if (!starMap[item.star]) {
          starMap[item.star] = [];
      }
      starMap[item.star].push(item.idCard);
  }

  const starCounters = {}; 

  const mergedDrivers = driverList.map((driverItem) => {
      const currentStar = driverItem.star;

      if (starCounters[currentStar] === undefined) {
          starCounters[currentStar] = 0;
      }
      const currentIndex = starCounters[currentStar];
      starCounters[currentStar] += 1;

      let newIdCard = driverItem.idCard;

      if (starMap[currentStar] && starMap[currentStar][currentIndex]) {
          newIdCard = starMap[currentStar][currentIndex];
      }

      return {
        ...driverItem,
        idCard: newIdCard
      };
  });

  return mergedDrivers;
};

const benefitData = { type: "none", lists: [{name:'testfnn'}] };
// ผุ้รับผลประโยชน์กำหนดจาก lists 
const carCamera = false;
// กล้องติดหน้ารถ
const cmi = true;
// true = ซื้อควบ
// false = ซื้อเดี่ยว
const ownerTitle = "นาย";
const ownerName = "รยยี่สิบแปด";
const ownerLastName = "ห้า";
const ownerEmail = "demo.isv4@gmail.com";
const ownerPhone = "0801110624";
const ownerOccupation = occupationLists[0].occupation_name;
// รับจ้าง / พนักงานบริษัท,รับราชการ,ธุรกิจส่วนตัว/เจ้าของกิจการทั่วไป,อาชีพอิสระ,etc...
const promoCode = {use:"",code:"",set:"5"};
// use = codeหรือset ถ้าเลือกแบบไหนจะเอาค่าในนั้นไปใช้ code คือกรอกใหม่ set คือเอาของที่มีอยู่มาใช้ (เป็น %)
const chassisNumber = "";
const carColor = "ขาว";
const carCC = "2000";
// DDL เลือกซีซีรถยนต์ จะถูกกำหนดตามค่าที่ระบุจากตรงนี้
const plateType = 1;
// 1 = ป้ายขาว
// 2 = ป้ายแดง
const plateNumberManual = "18ธค05";
const platePrefix = "";
// ตัวอักษรป้ายทะเบียน
const carProvince = "กรุงเทพ";
// จังหวัดป้ายทะเบียน
const effectiveDate = { day: "", month: "", year: "" };
// ถ้าไม่กรอก effectiveDate จะเอา default วันเดือนปีปัจจุบัน

const setENV = () => {
  cy.viewport(1980, 1080);
  cy.visit(
    env == "uat"
      ? "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/car-insurance#car-brand"
      : env == "dev"
      ? ""
      : env == "pd"
      ? ""
      : ""
  );
};

const run = async () => {
  setENV();
  cy.config("requestTimeout", 10000);
  step1(carBrand, carModel, carYear, carCC);
  cy.wait(1000);
  step2(policyClass, garageType, carAcc, driver(driverStarLists,driverList), carCamera, cmi);
  step3(ownerName, ownerLastName, ownerEmail, ownerPhone, promoCode);
  step4();
  step5(
    cmi,
    chassisNumber,
    carColor,
    carCC,
    plateType,
    plateNumberManual,
    platePrefix,
    carProvince,
    ownerTitle,
    ownerName,
    ownerLastName,
    ownerOccupation,
    driver(driverStarLists,driverList),
    benefitData,
    effectiveDate
  );
};

describe("template spec", () => {
  it("passes", () => {
    run();
  });
});
