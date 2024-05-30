import {age, name} from './data.js'

export default function Cart() {

    let 장바구니 = ['Tomatoes', 'Pasta']
    let 카드 = ['현대', '신한']

    return (

        <div>
            <h4 className="title">Cart</h4>
            <CartItem 상품={장바구니[0]}/>
            <CartItem 상품={장바구니[1]}/>
            <Banner 카드 = {카드[0]}/>
            <Banner 카드 = {카드[1]}/>
        </div>

    )
}

function Banner(props) {
    return <h5>{props.카드}카드 결제 행사중</h5>
}

// 컴포넌트 형식
function CartItem(props) {
    return (
        <div className="cart-item">
            <p>{props.상품}</p>
            <p>$40</p>
            <p>1개</p>
        </div>
    )
}