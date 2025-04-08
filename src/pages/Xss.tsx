
import DOMPurify from 'dompurify';

function Xss() {
  const textRead = `
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.8;
    
      margin: 0;
      padding: 2rem;
    }
    .container {
      background: #fff;
      padding: 2rem;
      max-width: 800px;
      margin: auto;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #d43f3a;
      font-size: 2rem;
    }
    ul {
      margin-top: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
  </style>
  <h1>XSS (Cross-Site Scripting) คืออะไร?</h1>
    <p>
      XSS หรือ <strong>Cross-Site Scripting</strong> คือหนึ่งในช่องโหว่ด้านความปลอดภัยของเว็บแอปพลิเคชัน 
      ที่เกิดจากการที่ผู้ไม่หวังดีสามารถ “ฉีด” (inject) สคริปต์ (ส่วนใหญ่จะเป็น JavaScript) เข้าไปในหน้าเว็บ 
      แล้วสคริปต์นั้นถูกเบราว์เซอร์ของผู้ใช้งานรันโดยไม่ตั้งใจ
    </p>
    <p>สิ่งที่แฮกเกอร์สามารถทำได้จาก XSS เช่น:</p>
    <ul>
      <li>ขโมยข้อมูลผู้ใช้ เช่น <em>คุกกี้, token, session ID</em></li>
      <li>หลอกให้ผู้ใช้คลิกหรือพิมพ์ข้อมูลหลอก</li>
      <li>Redirect ผู้ใช้ไปยังเว็บไซต์อันตราย</li>
      <li>ทำให้เกิดการโจมตีแบบ <strong>Phishing</strong> หรือ <strong>Malware</strong></li>
    </ul>`;
  const userInput = '<script>alert("Hacked!");</script>';
  const userInput2 = '<img src="invalid.jpg" onerror="alert(\'Hacked!\')">';
  // const userInput3 = '<div onmouseover="alert(\'XSS Attack!\')">Hover Me!</div>';
  //   const sanitizedHTML = DOMPurify.sanitize(userInput2);//ฟังก์ชันจากไลบรารี DOMPurify ที่จะ "กรอง" และลบโค้ดอันตราย (เช่น <script>, onerror=, onclick= ฯลฯ)

  return (
    <>
       <div dangerouslySetInnerHTML={{__html: textRead}}></div>
      {/* <div dangerouslySetInnerHTML={{ __html: userInput }} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: userInput2 }} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: userInput3 }} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} /> */}
    </>
  );
}

export default Xss;
