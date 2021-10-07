import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Card from '../components/Card/Card'
import { MainContext } from '../context'
import ContentLoader from "react-content-loader"
import style from './Orders.module.scss'

function Orders() {

    const [order, setOrder] = useState([])
    const allPrice = order.reduce((currentValue, nextValue) => currentValue += nextValue.price, 0)

    React.useEffect(() => {
        (async () => {
        const { data } = await axios.get('https://614d9f3ce3cf1f001712d229.mockapi.io/orders')
        // console.log(data.map(item => item.items).flat())
        setOrder(data.reduce((prev, obj)=> [...prev, ...obj.items], []));
        })()
    }, [])
  

    const myStyle = {
        fontSize: '1.4vw',
        fontWeight: '600',
        color: 'rgb'
    }

    const flex = {
        display: 'flex',
        flexWrap: 'wrap'

    }
    return (
        <div className='content'>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "40px",
                    justifyContent: "space-between",
                }}
            >
                <h1>Мои покупки</h1>
                <p>Потраченная сумма: {allPrice}</p>
            </div>
            <div style ={flex}>
          {
              order.map((item, index) => (
                <div className={style.card}>
                    <h5 style={myStyle}>{index + 1}</h5>
                <img width={133} height={112} src={item.imgURL} alt="Music" />
                <h5>
                  {item.title}
                </h5>
            </div>
              ))
          }
              </div>
        </div>
    )
}

export default Orders

