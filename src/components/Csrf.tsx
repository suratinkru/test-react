import React from "react"; // เพิ่มบรรทัดนี้

interface Props {
  // define your props here
}

const Csrf: React.FC<Props> = () => {

  const [jwt, setJwt] = React.useState<string | null>(null);

    // jwt token login


    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: 'admin',
              password: 'password'
            })
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log(data);
        //   setLocalstorage('jwt', data.jwt);
        setJwt(data.token);
        localStorage.setItem('token', data.token);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }

    // jwt call api 

  const callApiWithJwt = async () => {
    try {

    const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/login', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


    
  return (
    <div>
        <h1>CSRF</h1>
        <button onClick={handleLogin}>Login</button>
        <button onClick={callApiWithJwt}>Call API with JWT</button>

        <h2>JWT {jwt}</h2>

    </div>
  )
}

export default Csrf