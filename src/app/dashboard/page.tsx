"use client"
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  email: string;
}


const Dashboard:React.FC = () => {
  const [email, setEmail] = useState<string | null>();

  useEffect(() => {
    const token = Cookies.get("token");

    if(token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setEmail(decoded.email);
      }catch(error) {
        console.log(error)
      }
    }

  },[])
  return (
    <div className="p-7 text-2xl font-semibold flex-1 h-screen">
      
    </div>
  )
}

export default Dashboard