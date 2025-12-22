function genRandomIdCard() {
  // return '5007080005087'
  let id = [];
  let tmp_digit = [];
  let last_digit = 0;

  for (let i = 0, operand = 13; i < 12; i++, operand--) {
    if (i === 0) {
      // หลักแรกต้องเป็นเลข 1-8
      tmp_digit[i] = id[i] = Math.floor(Math.random() * 9) + 1;
    } else if (i === 3) {
      // หลักที่ 4 ต้องเป็นเลข 6-9
      tmp_digit[i] = id[i] = Math.floor(Math.random() * 4) + 6;
    } else {
      // หลักอื่นๆต้องเป็นเลข 0-9
      tmp_digit[i] = id[i] = Math.floor(Math.random() * 10);
    }
    tmp_digit[i] = tmp_digit[i] * operand;
    last_digit += tmp_digit[i];
  }

  // สูตรคำนวณหลักสุดท้าย สำหรับตรวจสอบความถูกต้อง
  last_digit = last_digit % 11;
  last_digit = 11 - last_digit;
  last_digit = last_digit % 10;
  id[12] = last_digit;

  return parseInt(id.join(""));
}

const driverStarLists = [
  { idCard: "1453123621159", star: 1 },
  { idCard: "3212648141360", star: 1 },
  { idCard: "6941860509186", star: 1 },
  { idCard: "2247325067121", star: 1 },
  { idCard: "6551849008609", star: 1 },
  { idCard: "2654737329917", star: 2 },
  { idCard: "3579635288069", star: 2 },
  { idCard: "5929192402189", star: 2 },
  { idCard: "2583891790301", star: 2 },
  { idCard: "5952046594510", star: 2 },
  { idCard: "6019106534006", star: 3 },
  { idCard: "7868545128517", star: 3 },
  { idCard: "8109332799029", star: 3 },
  { idCard: "8434286799796", star: 3 },
  { idCard: "2189959278803", star: 3 },
  { idCard: "1758193552514", star: 4 },
  { idCard: "7469196127621", star: 4 },
  { idCard: "3142514151787", star: 4 },
  { idCard: "4634611722713", star: 4 },
  { idCard: "2059246823644", star: 4 },
  { idCard: "8230207396934", star: 5 },
  { idCard: "1426571828761", star: 5 },
  { idCard: "2965164136889", star: 5 },
  { idCard: "1543231292313", star: 5 },
  { idCard: "8800119705336", star: 5 },
];

const occupationLists = [
  {
    occupation_code: "occ_001",
    occupation_name: "รับจ้าง / พนักงานบริษัท",
  },
  {
    occupation_code: "occ_002",
    occupation_name: "รับราชการ",
  },
  {
    occupation_code: "occ_003",
    occupation_name: "ธุรกิจส่วนตัว/เจ้าของกิจการทั่วไป",
  },
  {
    occupation_code: "occ_004",
    occupation_name: "เจ้าของกิจการอัญมณี-ทองคำ",
  },
  {
    occupation_code: "occ_005",
    occupation_name: "เจ้าของกิจการค้าของเก่า",
  },
  {
    occupation_code: "occ_006",
    occupation_name: "เจ้าของกิจการแลกเปลี่ยนเงินตรา",
  },
  {
    occupation_code: "occ_007",
    occupation_name: "เจ้าของกิจการการเงินที่ไม่ใช่สถาบันการเงิน",
  },
  {
    occupation_code: "occ_008",
    occupation_name: "เจ้าของกิจการคาสิโน/บ่อนการพนัน",
  },
  {
    occupation_code: "occ_009",
    occupation_name: "เจ้าของกิจการสถานบริการ",
  },
  {
    occupation_code: "occ_010",
    occupation_name: "เจ้าของกิจการค้าอาวุธยุทธภัณฑ์",
  },
  {
    occupation_code: "occ_011",
    occupation_name: "เจ้าของกิจการนายหน้าจัดหางาน",
  },
  {
    occupation_code: "occ_012",
    occupation_name: "เจ้าของกิจการนำเที่ยว บริษัททัวร์",
  },
  {
    occupation_code: "occ_013",
    occupation_name: "ไม่ได้ประกอบอาชีพ",
  },
  {
    occupation_code: "occ_014",
    occupation_name: "อาชีพอิสระ",
  },
];
export default { genRandomIdCard, driverStarLists, occupationLists };
