"use client"
import Image from "next/image"
import Link from "next/link"

import '@/styles/header.scss';

import Logo from '@/assets/eloquenta-logo.png';
import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";


const Header = ({locale}: any) => {
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
                            <ChangeLanguage locale={locale} />
                            <div className="notifications">
                                <i></i>
                            </div>
                            <div className="user">
                                <Link href={user.role == 'ROLE_TEACHER' ? '/profile' : '/profile/settings'} className="avatar">
                                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${user.id}`} alt='preview' />
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
                                <ChangeLanguage locale={locale} />
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

const ChangeLanguage = ({locale}: any) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const openDropdown = (e: any) => {
        e.preventDefault();
        setShowDropdown(true)
    }
    const changeLocale = (e: any) => {
        e.preventDefault();
        const lang = e.currentTarget.dataset.lang;
        if(locale != lang){
            var newPath = pathname.replace(locale, lang);
            router.push(newPath)
        }
        setShowDropdown(false);
    }
    return (
        <div className="lang">
            <div className="current"  onClick={openDropdown}>
                {locale}
                <i></i>
            </div>
            <div className={`dropdown ${showDropdown ? 'active' : ''}`}>
                <div className="option" data-lang="ru" onClick={changeLocale}>RU</div>
                <div className="option" data-lang="en" onClick={changeLocale}>EN</div>
            </div>
        </div>
    );
}