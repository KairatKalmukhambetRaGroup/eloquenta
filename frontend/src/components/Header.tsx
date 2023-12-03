import Image from "next/image"
import Link from "next/link"

import '@/styles/header.scss';

import Logo from '@/assets/svg/eloquenta-logo.svg';


const Header = () => {
    return (
        <header id="header">
            <div className="container">
                <div className="content">
                    <Link href="/">
                        <Image src={Logo} alt="logotype" />
                    </Link>
                    <nav>
                        <div className="lang">
                            <div className="current">
                                RU
                                <i></i>
                            </div>
                        </div>
                        <div className="auth-btns">
                            <div className="auth-btn sign-up">
                                Зарегистрироваться
                            </div>
                            <div className="auth-btn sign-in">
                                Войти
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header