import type { ImgHTMLAttributes } from 'react';
import Logo from '@/../images/logo-dark.svg';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={Logo} alt="Logo" {...props} />;
}
