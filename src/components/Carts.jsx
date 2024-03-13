import './carts.css';
import { FaCartPlus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import data from './data';
import { useEffect, useState } from 'react';

const Carts = (props) => {

    const { cartItems, setCartItems } = props;

    const [phoneData, setPhoneData] = useState(data);
    const [total, setTotal] = useState();

    useEffect(() => {

        let totalPrice = 0;
        
        phoneData.map((item) => {
            totalPrice += item.price;
        })
    
        setTotal(totalPrice);
        console.log(totalPrice);
    }, [])

    // **********************************************************

    const increaseItem = (id) => {

        let data = [...phoneData];
        const newData = data.filter((item) => {
            if (item.id === id) {
                item.quantity += 1;
                setCartItems((prevItem) => prevItem + 1);
                setTotal((prev) => parseFloat((prev + item.price).toFixed(2)));
            }
            return item.quantity > 0;
        })
        // console.log(newData);
        setPhoneData(newData);
    }

    // **************************************************************


    const decreaseItem = (id) => {

        let data = [...phoneData];
        const newData = data.filter((item) => {
            if (item.id === id) {
                item.quantity -= 1;
                setCartItems((prevItem) => prevItem - 1)
                setTotal((prev) => parseFloat((prev - item.price).toFixed(2)));


            }
            return item.quantity > 0;
        })
        console.log(newData);
        setPhoneData(newData);
    }

    // ******************************************************************


    
    const removeItem = (id) => {
        let data = [...phoneData];
        const newData = data.filter((item) => {
            if (item.id === id) {
                setCartItems((prev) => prev - item.quantity)
                setTotal((prev) => parseFloat((prev - (item.price*item.quantity)).toFixed(2)));

            }
            return item.id !== id;
        })
        console.log(newData);
        setPhoneData(newData);
    }


    // ********************************************************************


    const removeAllItems = () => {
        setPhoneData([]);
        let total = document.querySelector('.total');
        // total.style.display = 'none';
        setCartItems(0)
        total.innerHTML = 'is currently empty';
        total.style.fontSize = '2rem';
        total.style.color = 'grey';
    }

    return (
        <div className='carts'>
            <nav className='navbar'>
                <p>GeekCart</p>
                <div className='navbar-content'>
                    <FaCartPlus className='nav-icon' />
                    <span>{cartItems}</span>
                </div>
            </nav>
            <div className='content'>
                <h1>YOUR BAG</h1>
                {
                    phoneData.map((item) => {
                        return (
                            <div className='cart'>
                                <img src={item.img}></img>
                                <div className='cart-content'>
                                    <h2>{item.name}</h2>
                                    <p>$ {item.price}</p>
                                    <button onClick={() => removeItem(item.id)}>remove</button>
                                </div>
                                <div className='cart-content2'>
                                    <FaChevronUp className='btn' onClick={() => increaseItem(item.id)} />
                                    <p>{item.quantity}</p>
                                    <FaChevronDown className='btn' onClick={() => decreaseItem(item.id)} />
                                </div>
                            </div>
                        )
                    })
                }

            </div>

            <hr></hr>

            <div className='total'>
                <div className='total-content'>
                    <p>Total</p>
                    <span>${total}</span>
                </div>
                <button onClick={removeAllItems}>Clear Cart</button>
            </div>
        </div>
    )
}

export default Carts;