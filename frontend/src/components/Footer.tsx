import '@/styles/footer.scss';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/eloquenta-logo-white.png';
// Social links
import Facebook from '@/assets/svg/socials/Facebook.svg';
import Twitter from '@/assets/svg/socials/Twitter.svg';
import Instagram from '@/assets/svg/socials/Instagram.svg';
import LinkedIn from '@/assets/svg/socials/LinkedIn.svg';
import YouTube from '@/assets/svg/socials/YouTube.svg';
import TikTok from '@/assets/svg/socials/TikTok.svg';
import Whatsapp from '@/assets/svg/socials/Whatsapp.svg';
import Telegram from '@/assets/svg/socials/Telegram.svg';

const links = [
    {name: 'Английский язык', link: '/'},
    {name: 'Русский язык', link: '/'},
    {name: 'Казахский язык', link: '/'},
    {name: 'Арабский язык', link: '/'},
    {name: 'Китайский язык', link: '/'},
    {name: 'Мандаринский язык', link: '/'},
    {name: 'Корейский язык', link: '/'},
    {name: 'Японский язык', link: '/'},
    {name: 'Французский язык', link: '/'},
    {name: 'Турецкий язык', link: '/'},
    {name: 'Немецкий язык', link: '/'},
    {name: 'Итальянский язык', link: '/'},
    {name: 'Испанский язык', link: '/'},
]

const social = [
    {icon: Facebook, link: ''},
    {icon: Twitter, link: ''},
    {icon: Instagram, link: ''},
    {icon: LinkedIn, link: ''},
    {icon: YouTube, link: ''},
    {icon: TikTok, link: ''},
    {icon: Whatsapp, link: ''},
    {icon: Telegram, link: ''},
]

const Footer = () => {
  return (
    <footer id='footer'>
        <div className="container">
            <div className="content">
                <div className="menu">
                    <Link href="/" className='logo'>
                        <Image src={Logo} loading='lazy' alt='logotype' />
                    </Link>
                    <div className="links">
                        {links.map((link, key)=>(
                            <Link href={link.link} key={key}>
                                {link.name}
                            </Link>   
                        ))}
                    </div>
                    <div className="social">
                        {social.map((social, key)=>(
                            <Link href={social.link} key={key}>
                                <Image src={social.icon} alt='social-link' />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="bottom">
                    <div className="copyright">
                        © Все права защищены Eloquenta
                    </div>
                    <div className="docs">
                        <Link href=''>
                            Политика конфиденциальности
                        </Link>
                        <Link href=''>
                            Публичная оферта
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer