'use client'

import Image from "next/image"
import {useState} from "react"

export default function List() {

    let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
    // let Array = [2,3,4]
    // let test = Array.map((a) => {
    //             return 10
    //         })
    //         console.log(test);
    // let 수량 = 0;
    let [수량, 수량변경] = useState([0, 0, 0])

    return (

        <div>
            <h4 className="title">상품 목록</h4>

            {/* <span>{수량[0]}</span>
            <button onClick={() => {
                let copy = [...수량]
                copy[0]++
                수량변경(copy);
                }}>+</button> */}
            {/** state 변경함수 사용 시 새 state == 기존 state일 경우 변경 X */}
            {/* <span>{수량[1]}</span>
            <button>+</button>
            <span>{수량[2]}</span>
            <button>+</button> */}

            {
                상품.map((a, i) => {
                    return (
                        <div className="food" key={i}>
                            <img src={`/food${i}.png`} className="food-img"/>
                            <h4>{상품[i]} $40</h4>
                            {/* <button onClick={() => {
                                수량변경(수량-1);
                            }}>-</button> */}
                            <button onClick={() => {
                                let minusCopy = [...수량]
                                minusCopy[i]--
                                수량변경(minusCopy)
                            }}> - </button>
                            <span > {수량[i]} </span>
                            {/* <button onMouseOver={() => {
                                console.log('눌림');
                            }}> + </button> */}
                            {/* <button onClick={() => {
                                수량변경(수량+1);
                            }}> + </button> */}
                            <button onClick={() =>
                                {
                                 let copy = [...수량]
                                 copy[i]++
                                 수량변경(copy)   
                                }}> + </button>
                        </div>
                    )
                })
            }
        </div>

    )
}