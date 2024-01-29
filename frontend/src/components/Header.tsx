"use client"
import Image from "next/image"
import Link from "next/link"

import '@/styles/header.scss';

import Logo from '@/assets/eloquenta-logo.png';

import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HeaderMenu from "./HeaderMenu";


const Header = ({locale}: any) => {
    const {user, logout} =  useUserContext();

    const router = useRouter();
    const pathname = usePathname();

    const [menu, setMenu] = useState(false);

    return (
        <header id="header">
            <HeaderMenu locale={locale} user={user} logout={logout} menu={menu} setMenu={setMenu} router={router} pathname={pathname} />
            <div className="container">
                <div className="content">
                    <Link href="/" className="logo">
                        <Image src={Logo} alt="logotype" />
                    </Link>
                    {user ? (
                        <>
                            <i className="hamburger" onClick={(e)=>{e.preventDefault(); setMenu(true)}} ></i>
                            <nav className="user">
                                <ChangeLanguage locale={locale} router={router} pathname={pathname} />
                                {/* <div className="notifications">
                                    <i></i>
                                </div> */}
                                <div className="user">
                                    <Link href={user.role == 'ROLE_TEACHER' ? '/profile' : '/profile/settings'} className="avatar" suppressHydrationWarning>
                                        <Image src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${user.id}`} width={40} height={40} alt='preview' loading="lazy" suppressHydrationWarning />
                                    </Link>
                                    <div className="dropdown">
                                        <i></i>
                                    </div>
                                </div>
                            </nav>
                        </>
                    ) : (
                        <>
                            <i className="hamburger" onClick={(e)=>{e.preventDefault(); setMenu(true)}} ></i>
                            <nav>
                                <ChangeLanguage locale={locale}  router={router} pathname={pathname} />
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

const ChangeLanguage = ({locale, router, pathname}: any) => {
    const [showDropdown, setShowDropdown] = useState(false);
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