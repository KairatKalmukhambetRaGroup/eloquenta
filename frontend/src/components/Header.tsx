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
                            <Link className="auth-btn sign-up" href="/signup">
                                Зарегистрироваться
                            </Link>
                            <Link className="auth-btn sign-in" href="/login">
                                Войти
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header