import { step1 } from "./step1";
import { step2 } from "./step2";
import { step3 } from "./step3";
import { step4 } from "./step4";
import { step5 } from "./step5";
import { driverStarLists } from "../common";
import { occupationLists } from "../common";

const env = "uat";
const scriptUrl = "https://script.google.com/macros/s/AKfycbwHQRJ8Z-ApAYH_2OxSYK3bUJn08vbezO-zxlQnosKF4760diaFh3mGF4J5f5l-1SHOGQ/exec";

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

const setENV = () => {
    cy.viewport(1980, 1080);
    cy.visit(
        env == "uat"
        ? "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/car-insurance#car-brand"
        : env == "dev"
        ? "https://nextjs-webapp-pi.vercel.app/shopping/car-insurance#car-year"
        : env == "pd"
        ? ""
        : ""
    );
};

describe("Insurance Flow with Google Sheets", () => {
    it("ดึงข้อมูลจาก Google Sheet และรันกระบวนการซื้อประกัน", () => {
        // ดึงข้อมูลจาก API
        cy.request(scriptUrl).then((response) => {
          console.log('response',response)
            const row = response.body[12]; // ใช้ข้อมูลแถวแรกของbodyจาก Sheet

            const carBrand = row.carBrand || "Honda";
            const carModel = row.carModel || "Accord";
            const carYear = String(row.carYear) || "2023";
            const carCC = String(row.carCC) || "2000";
            const policyClass = row.policyClass || "ประกันชั้น 3";
            const garageType = row.garageType || "ซ่อมอู่";
            
            const carCamera = String(row.carCamera).toUpperCase() === 'TRUE' ? true : false;
            const cmi = String(row.cmi).toUpperCase() === 'TRUE' ? true : false;
            // true = ซื้อควบ
            // false = ซื้อเดี่ยว
            const carAcc = { acc: row.carAcc.split(",").map(item => item.trim()), value: String(row.carAccValue || "10,000") };
            // const carAcc = { acc: ["สเกิร์ตรอบคัน","ปลายท่อ","ล้อแม็ก/ยาง"], value: "10,000" };
           
            // ข้อมูลคนขับ
            const driverList = [
                { idCard: '', star: 1, age: 30, birthDay:21, birthMonth:11, title: 'นาย', name: 'คนขับหนึ่ง', lastName: 'สกุลหนึ่ง', licens: '12345678', occupation: occupationLists[0].occupation_name, consent: true },
                { idCard: '', star: 1, age: 30, birthDay:22, birthMonth:11, title: 'นาง', name: 'คนขับสอง', lastName: 'สกุลสอง', licens: '87654321', occupation: occupationLists[1].occupation_name, consent: true },
                { idCard: '', star: 1, age: 30, birthDay:23, birthMonth:11, title: 'นาย', name: 'คนขับสาม', lastName: 'สกุลสาม', licens: '55555555', occupation: occupationLists[2].occupation_name, consent: true },
                { idCard: '', star: 1, age: 30, birthDay:24, birthMonth:11, title: 'นาง', name: 'คนขับสี่', lastName: 'สกุลสี่', licens: '22222222', occupation: occupationLists[3].occupation_name, consent: true },
                { idCard: '', star: 1, age: 30, birthDay:25, birthMonth:11, title: 'นาย', name: 'คนขับห้า', lastName: 'สกุลห้า', licens: '11111111', occupation: occupationLists[4].occupation_name, consent: true }
            ];

            const ownerTitle = row.ownerTitle || "นาย";
            const ownerName = row.ownerName || "ทดสอบ";
            const ownerLastName = row.ownerLastName || "คนขับห้า";
            const ownerBirthday = { 
              day: row.ownDay || "", 
              month: row.ownMonth || "", 
              year: row.ownYear || "" 
          };
            const ownerEmail = row.ownerEmail || "demo.isv4@gmail.com";
            const ownerPhone = row.ownerPhone || "0801110624";
            const ownerOccupation = row.ownerOccupation || occupationLists[0].occupation_name;
            // รับจ้าง / พนักงานบริษัท,รับราชการ,ธุรกิจส่วนตัว/เจ้าของกิจการทั่วไป,อาชีพอิสระ,etc...
            const promoCode = { 
                use: row.promoCodeUse || "", 
                code: row.promoCodeCode || "", 
                set: String(row.promoCodeSet || "5") 
            };
            // use = codeหรือset ถ้าเลือกแบบไหนจะเอาค่าในนั้นไปใช้ code คือกรอกใหม่ set คือเอาของที่มีอยู่มาใช้ (เป็น %)

            const chassisNumber = row.chassisNumber || "";
            const carColor = row.carColor || "ขาว";
            const plateType = Number(row.plateType === 'ป้ายขาว'? 1:2 || 1);
            const plateNumber = row.plateNumber || "";
            // const platePrefix = row.platePrefix || "";
            const carProvince = row.carProvince || "กรุงเทพ";
            const benefitData = { type: row.benefitType || "none", lists: [{ name: row.benefitName || 'testfnn' }] };
            const effectiveDate = { 
                day: row.effDay || "", 
                month: row.effMonth || "", 
                year: row.effYear || "" 
            };

            setENV();
            cy.config("requestTimeout", 10000);
            
            step1(carBrand, carModel, carYear, carCC);
            cy.wait(1000);
            
            step2(policyClass, garageType, carAcc, driver(driverStarLists, driverList), carCamera, cmi);
            step3(ownerName, ownerLastName, ownerEmail, ownerPhone, promoCode);
            step4();
            step5(
                cmi,
                chassisNumber,
                carColor,
                carCC,
                plateType,
                plateNumber,
                carProvince,
                ownerTitle,
                ownerName,
                ownerLastName,
                ownerBirthday,
                ownerOccupation,
                driver(driverStarLists, driverList),
                benefitData,
                effectiveDate
            );
        });
    });
});
