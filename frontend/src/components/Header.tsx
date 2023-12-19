"use client"
import Image from "next/image"
import Link from "next/link"

import '@/styles/header.scss';

import Logo from '@/assets/eloquenta-logo.png';
import { useUserContext } from "@/contexts/UserContext";


const Header = () => {
    const {user} =  useUserContext();
    return (
        <header id="header">
            <div className="container">
                <div className="content">
                    <Link href="/" className="logo">
                        <Image src={Logo} alt="logotype" />
                    </Link>
                    {user ? (
                        <nav className="user">
                            <div className="notifications">
                                <i></i>
                            </div>
                            <div className="user">
                                <Link href="/profile" className="avatar">

                                </Link>
                                <div className="dropdown">
                                    <i></i>
                                </div>
                            </div>
                        </nav>
                    ) : (
                        <>
                            <i className="hamburger"></i>
                            <nav>
                                <div className="lang">
                                    <div className="current">
                                        RU
                                        <i></i>
                                    </div>
                                </div>
                                <div className="auth-btns">
                                    <Link className="auth-btn sign-up" href="/signup">
                                        Зарегистрироваться
                                    </Link>
                                    <Link className="auth-btn sign-in" href="/login">
                                        Войти
                                    </Link>
                                </div>
                            </nav>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header