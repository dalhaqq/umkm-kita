"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function Home() {
  const [umkm, setUmkm] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://opensheet.elk.sh/1qni0IjhGNKLtkZYGpoFGWRQG3Jy_Dp7x3DZMBpIXFXk/Sheet1')
      .then((res) => res.json())
      .then((res) => {
        setUmkm(res)
        setLoading(false)
        console.log(res)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="card-container">
        {umkm.map(item => (
          <div className="column card" key={item.slug}>
            <img src={item.gambar1} style={{width: '100%', objectFit: 'cover'}} />
            <div className="card-body">
              <a href={item.slug}>
                <h4><b>{item.nama}</b></h4>
              </a>
              <p>{item.text1}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
