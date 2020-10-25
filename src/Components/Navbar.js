import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.svg'
import styled from 'styled-components'
import {ButtonContainer} from './Button'
export default class Navbar extends Component {
    render() {
        return (
            <NavWrap className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to='/'>
                    <img src={logo} alt ='store' className='navbar-brand'/>
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to ='/' className='nav-link'>products</Link>
                    </li>
                </ul>
                <Link to='/cart' className="ml-auto">
                    <ButtonContainer>
                        <span>
                        <i className="fas fa-cart-plus mr-2"/>my cart
                        </span>
                    </ButtonContainer>
                    {/* <button type="button" class="btn btn-outline-light"><i className="fas fa-cart-plus mr-2"/>my cart</button> */}
                </Link>
            </NavWrap>
        )
    }
}


const NavWrap = styled.nav`
background:var(--mainBlue);
.nav-link{
    color:var(--mainWhite);
    font-size:1.3rem;
    text-transform:capitalize
}
`
