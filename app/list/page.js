export default function List() {

    let 상품 = ['Tomatoes', 'Pasta', 'Coconut']
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
                        <div className="food">
                            <h4>{상품[i]} $40</h4>
                        </div>
                    )
                })
            }
        </div>

    )
}