import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useTransition } from "react";

import LogoWhite from '@/assets/eloquenta-logo-white.png';
import { useRouter } from "next/navigation";


const HeaderMenu = ({locale: loc, user, logout, menu, setMenu, router, pathname}: any) => {
    const userT = useTranslations('profile.sidebar');    

    const [isPending, startTransition] = useTransition();
    const changeLocale = (e: any) => {
        // e.preventDefault();
        if(!isPending){
            const lang = e.currentTarget.dataset.lang;
            if(loc != lang){
                startTransition(() => {
                    var newPath = pathname.replace(loc, lang);
                    console.log(newPath)

                    router.push(newPath);
                })
            }
            setMenu(false);
        }
    }

    useEffect(() => {
        close();
        // router.events.on('routeChangeComplete', close);

        // return () => {
        //     router.events.off('routeChangeComplete', close);
        // };
    }, [pathname]);

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

export default HeaderMenu;