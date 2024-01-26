"use client"
import Image from "next/image"
import Link from "next/link"

import '@/styles/header.scss';

import Logo from '@/assets/eloquenta-logo.png';
import LogoWhite from '@/assets/eloquenta-logo-white.png';

import { useUserContext } from "@/contexts/UserContext";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";


const Header = ({locale}: any) => {
    const {user, logout} =  useUserContext();

    const router = useRouter();
    const pathname = usePathname();

    const [menu, setMenu] = useState(false);

    return (
        <header id="header">
            <Menu locale={locale} user={user} logout={logout} menu={menu} setMenu={setMenu} router={router} pathname={pathname} />
            <div className="container">
                <div className="content">
                    <Link href="/" className="logo">
                        <Image src={Logo} alt="logotype" />
                    </Link>
                    {user ? (
                        <>
                            <i className="hamburger" onClick={(e)=>{e.preventDefault(); setMenu(true)}} ></i>
                            <nav className="user">
                                <ChangeLanguage locale={locale} />
                                {/* <div className="notifications">
                                    <i></i>
                                </div> */}
                                <div className="user">
                                    <Link href={user.role == 'ROLE_TEACHER' ? '/profile' : '/profile/settings'} className="avatar">
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/users/avatar/${user.id}`} alt='preview' />
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
            console.log((newPath))
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

const Menu = ({locale: loc, user, logout, menu, setMenu, router, pathname}: any) => {
    const userT = useTranslations('profile.sidebar');
    

    const [isPending, startTransition] = useTransition();
    const changeLocale = (e: any) => {
        // e.preventDefault();
        if(!isPending){
            const lang = e.currentTarget.dataset.lang;
            if(loc != lang){
                console.log(lang)
                startTransition(() => {
                    var newPath = pathname.replace(loc, lang);
                    console.log(newPath)

                    router.push(newPath);
                })
            }
            setMenu(false);
        }
    }

    const close = () => {
        setMenu(false)
    }
    if(!menu)
        return;
    return (
        <div className="header-menu">
            <div className="content">
                <div className="top">
                    <Link href="/" className="logo">
                        <Image src={LogoWhite} alt="logotype" />
                    </Link>
                    <i className="close" onClick={close}></i>
                </div>
                {user ? (
                    <nav className="user">
                        <div className='usermenu'>
                            <div className="group">
                                <label>{userT('menu')}</label>
                                <div className="links">
                                    {user && user.role == 'ROLE_STUDENT' && (
                                        <Link href="/tutors?lang=en" className='link'>
                                            <i className='menu'></i>
                                            {userT('menu')}
                                        </Link>
                                    )}
                                    {user && user.role != 'ROLE_ADMIN' && (
                                        <Link href="/profile/lessons" className={`link ${pathname.includes('/profile/lessons') ? 'active' : ''}`}>
                                            <i className='lessons'></i>
                                            {userT('lessons')}
                                        </Link>
                                    )}
                                    {user && user.role == 'ROLE_ADMIN' && (
                                        <Link href="/admin" className='link'>
                                            <i className='menu'></i>
                                            {userT('admin')}
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {user && user.role == 'ROLE_TEACHER' && 
                                <div className="group">
                                    <label>{userT('account')}</label>
                                    <div className="links">
                                        <Link href="/profile" className={`link ${pathname == `/${loc}/profile` ? 'active' : ''}`}>
                                            <i className='profile'></i>
                                            {userT('profile')}
                                        </Link>
                                    </div>
                                </div>
                            }
                            <div className="group">
                                <label>{userT('settings')}</label>
                                <div className="links">
                                    <Link href="/profile/settings" className={`link ${pathname.includes('/profile/settings') ? 'active' : ''}`}>
                                        <i className='settings'></i>
                                        {userT('settings')}
                                    </Link>
                                    {/* <div className={`link`} onClick={logout}>
                                        <i className='logout'></i>
                                        Выйти
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="logout" onClick={logout}>
                            Выйти с аккаунта
                        </div>
                    </nav>
                ) : (
                    <nav>
                        <Link className="auth-btn sign-up" href={`/${loc}/signup`}>
                            Зарегистрироваться
                        </Link>
                        <Link className="auth-btn sign-in" href={`/${loc}/login`}>
                            Войти
                        </Link>
                        <div className="langs">
                            <div className={`option ${loc == 'ru' ? 'active' : ''}`} data-lang="ru" onClick={changeLocale}>RU</div>
                            <div className={`option ${loc == 'en' ? 'active' : ''}`} data-lang="en" onClick={changeLocale}>EN</div>
                        </div>
                    </nav>
                )}
            </div>
        </div>
    );
}