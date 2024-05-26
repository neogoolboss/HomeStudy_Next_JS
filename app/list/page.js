import Image from "next/image"

export default function List() {

    let 상품 = ['Tomatoes', 'Pasta', 'Coconut','apple']
    // let Array = [2,3,4]
    // let test = Array.map((a) => {
    //             return 10
    //         })
    //         console.log(test);

    return (

        <div>
            <h4 className="title">상품 목록</h4>
            {
                상품.map((a, i) => {
                    return (
                        <div className="food" key={i}>
                            <img src={`/food${i}.png`} className="food-img"/>
                            <h4>{상품[i]} $40</h4>
                        </div>
                    )
                })
            }
        </div>

    )
}