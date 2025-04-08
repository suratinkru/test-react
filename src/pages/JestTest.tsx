import React from 'react'

function JestTest() {

    const textRead = `
    <!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>สอน Code Coverage Metrics</title>
  <style>
    body {
      font-family: 'Sarabun', sans-serif;
      background: #f9f9f9;
      padding: 2rem;
      line-height: 1.7;
      color: #333;
    }
    h1, h2 {
      color: #2c3e50;
    }
    code, pre {
      background-color: #eef;
      padding: 0.5rem;
      border-radius: 5px;
      display: block;
      overflow-x: auto;
      margin: 1rem 0;
      white-space: pre-wrap;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 0.75rem;
      text-align: center;
    }
    th {
      background-color: #3498db;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .highlight {
      background: #dff0d8;
      padding: 0.5rem;
      border-left: 5px solid #5cb85c;
      margin: 1rem 0;
    }
  </style>
</head>
<body>

  <h1>Code Coverage Metrics คืออะไร?</h1>
  <p>
    ค่าพวกนี้คือ <strong>Code Coverage Metrics</strong> ซึ่งใช้วัดว่า การทดสอบ (Test) ของเราครอบคลุมโค้ดมากแค่ไหน โดยปกติจะได้จากการรันคำสั่งเช่น:
  </p>

  <code>jest --coverage</code>
  <code>vitest --coverage</code>

  <p>แล้วจะได้ตารางประมาณนี้:</p>

  <pre>
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|--------------------
MyFile.ts   |  80%    |   50%    |  75%    |  80%    |  12, 14, 22
  </pre>

  <h2>🧾 คำอธิบายแต่ละคอลัมน์</h2>
  <table>
    <thead>
      <tr>
        <th>คอลัมน์</th>
        <th>ความหมาย</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>% Stmts (Statements)</td>
        <td>เปอร์เซ็นต์ของ "คำสั่งในโค้ด" ที่ถูกเรียกใช้โดยการทดสอบ</td>
      </tr>
      <tr>
        <td>% Branch (Branches)</td>
        <td>เปอร์เซ็นต์ของ "เงื่อนไข (if, switch, ternary)" ที่ทดสอบครอบคลุมทั้ง true/false</td>
      </tr>
      <tr>
        <td>% Funcs (Functions)</td>
        <td>เปอร์เซ็นต์ของฟังก์ชันที่ถูกเรียกใช้งานระหว่างการทดสอบ</td>
      </tr>
      <tr>
        <td>% Lines (Lines)</td>
        <td>เปอร์เซ็นต์ของบรรทัดโค้ดที่ถูกรันระหว่างการทดสอบ</td>
      </tr>
      <tr>
        <td>Uncovered Line #s</td>
        <td>หมายเลขบรรทัดที่ไม่ได้ถูกครอบคลุมในการทดสอบ</td>
      </tr>
    </tbody>
  </table>

  <h2>🔍 ตัวอย่างเพื่อความเข้าใจ</h2>
  <pre>
function sum(a: number, b: number): number {
  return a + b;         // line 2
}

function subtract(a: number, b: number): number {
  return a - b;         // line 6
}

function choose(flag: boolean) {
  if (flag) {           // line 10
    return sum(1, 2);   // line 11
  } else {
    return subtract(5, 3); // line 13
  }
}
  </pre>

  <p>แต่มี test แค่แบบนี้:</p>
  <pre>
test('test sum', () => {
  expect(sum(2, 3)).toBe(5);
});
  </pre>

  <p>ผลลัพธ์ coverage จะประมาณนี้:</p>
  <ul>
    <li><strong>% Stmts:</strong> 2/5 = 40%</li>
    <li><strong>% Funcs:</strong> 1/3 = 33.3%</li>
    <li><strong>% Branch:</strong> 0% (ยังไม่ได้ทดสอบ if)</li>
    <li><strong>% Lines:</strong> 2/6 = 33.3%</li>
    <li><strong>Uncovered Line #s:</strong> 6, 10, 11, 13</li>
  </ul>

  <h2>✅ เป้าหมายของ Coverage ที่ดี</h2>
  <div class="highlight">
    โดยทั่วไป เป้าหมาย coverage ที่แนะนำคือ:
    <ul>
      <li>Statements ≥ 80%</li>
      <li>Branches ≥ 70–80%</li>
      <li>Functions ≥ 80%</li>
      <li>Lines ≥ 80%</li>
    </ul>
    แต่ไม่จำเป็นต้อง 100% เสมอ โดยเฉพาะโค้ดฝั่ง UI — เน้นครอบคลุมโค้ดสำคัญเป็นหลัก
  </div>


  <h1>📌 ทำไมต้องเขียน Unit Test?</h1>

  <div class="card">
    <h2>✅ 1. ตรวจสอบความถูกต้องของโค้ดแบบอัตโนมัติ</h2>
    <p>ช่วยให้เรารู้ว่าโค้ดทำงานถูกต้องหรือไม่ โดยไม่ต้องทดสอบด้วยมือทุกครั้ง</p>
    <pre><code>function sum(a: number, b: number): number {
  return a + b;
}

test('sum(2, 3) should be 5', () => {
  expect(sum(2, 3)).toBe(5);
});</code></pre>
  </div>

  <div class="card">
    <h2>🛡 2. ลดโอกาสเกิด Bug เวลามีการเปลี่ยนแปลง</h2>
    <p>ถ้ามีคนแก้โค้ดผิดพลาด Test จะเตือนทันที</p>
    <pre><code>// โค้ดผิดที่แก้แบบไม่รู้ตัว
return a - b; // ❌</code></pre>
    <div class="highlight">
      ✅ Unit test จะแจ้งเตือนทันทีว่า "sum(2, 3) !== 5"
    </div>
  </div>

  <div class="card">
    <h2>🚦 3. ทำให้กล้า Refactor มากขึ้น</h2>
    <p>เพราะมี test คอยป้องกัน เราจึงมั่นใจว่าเปลี่ยนโค้ดแล้วไม่พัง</p>
  </div>

  <div class="card">
    <h2>📈 4. ช่วยในการพัฒนาแบบ TDD (Test-Driven Development)</h2>
    <p>เขียน test ก่อน แล้วค่อยเขียนโค้ดให้ผ่าน test</p>
  </div>

  <div class="card">
    <h2>👥 5. ช่วยให้ทีมใหม่เข้าใจโค้ดเร็วขึ้น</h2>
    <p>ดูจาก test ก็จะเข้าใจว่าฟังก์ชันนี้ใช้ยังไงและคาดหวังอะไร</p>
  </div>

  <div class="card">
    <h2>📊 6. วัดความครอบคลุมของโค้ด (Code Coverage)</h2>
    <p>ใช้ดูว่า test ของเราครอบคลุมโค้ดได้มากแค่ไหน เช่น</p>
    <pre><code>% Stmts: 80%
% Funcs: 75%
% Branch: 50%
Uncovered Lines: 10, 12</code></pre>
  </div>

  <div class="card highlight">
    <strong>❌ ถ้าไม่มี Unit Test:</strong>
    <ul>
      <li>เจอบั๊กบ่อย หาได้ยาก</li>
      <li>เปลี่ยนโค้ดทีไร พังที</li>
      <li>ทำงานเป็นทีมยาก</li>
      <li>ระบบโตขึ้น ความเสี่ยงก็โตตาม</li>
    </ul>
  </div>

  <div class="card" style="background-color:#e3f2fd; border-left: 5px solid #2196f3;">
    <strong>✨ สรุป:</strong> Unit Test = ปราการด่านแรกในการป้องกันบั๊ก!  
    <br>ควรเขียนทุกครั้ง โดยเฉพาะกับฟังก์ชันสำคัญ
  </div>

</body>
</html>
`
  return (
    <div>
      <h1>Jest Test</h1>
      <p>Code Coverage Metrics</p>
      <div dangerouslySetInnerHTML={{ __html: textRead }} />


    </div>
  )
}

export default JestTest