import React from 'react';
import travelLogo from '../../assets/travelLogo.jpg';
import { FaXTwitter } from 'react-icons/fa6';
import { PiYoutubeLogoFill } from 'react-icons/pi';
import { ImFacebook2 } from 'react-icons/im';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-error/60 text-primary-content p-10">
  <aside>
    <img className='h-20 w-20 rounded-full' src={travelLogo} alt="" />
    <p className="font-bold text-2xl ">
      TravelEase
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a className="text-[#1DA1F2]"><FaXTwitter size={28} /></a>
      <a className="text-[#FF0000]"><PiYoutubeLogoFill size={28} /></a>
<a className="text-[#1877F2]"><ImFacebook2 size={28} /></a>
    </div>
  </nav>
</footer>
    );
};

export default Footer;