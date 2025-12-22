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
export default { genRandomIdCard };
