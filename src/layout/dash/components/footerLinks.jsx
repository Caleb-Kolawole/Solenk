import React from "react";
import whatsapp from "../../../assets/icon/whatsapp.svg";
import facebook from "../../../assets/icon/facebook.svg";
import instagram from "../../../assets/icon/instagram.svg";
import email from "../../../assets/icon/footer-email.svg";
import phone from "../../../assets/icon/call.svg";
import location from "../../../assets/icon/location.svg";
import { Link } from "react-router-dom";

function FooterLinks() {
  return (
    <footer className="bg-[#2E2F33] py-14 min-[1100px]:px-14">
      <section className="min-[700px]:grid grid-cols-2 min-[1100px]:flex justify-between min-[700px]:max-w-[650px]  min-[1100px]:max-w-[1400px] min-[650px]:mx-auto">
        <div className="flex flex-col max-[700px]:items-center max-[700px]:my-7">
          <p className="text-xl min-[400px]:text-2xl text-[#10C542] font-bold mb-5">
            Sadok Organic Farms
          </p>
          <p className="text-[#B8B9BA] max-[600px]:w-[75vw] max-w-[225px] min-[500px]:max-w-[240px] max-[700px]:text-center text-base min-[500px]:text-lg mb-10 ">
            Discover the Taste of True Organic Delights with Sadok Farms
          </p>
          <a
            rel="noopener noreferrer"
            href="https://taskflow.solutions"
            target="_blank"
            className="text-[#00AC30] font-bold min-[500px]:text-lg"
          >
            <span className="text-white">Designed by</span> Taskflow Solutions
          </a>
        </div>
        <div className="flex flex-col max-[1100px]:items-center ">
          <p className="text-[#10C542] font-bold text-lg mb-3">Quick links</p>
          <Link to={"/"} rel="noreferrer" className="py-2 text-[#B8B9BA]">
            Login
          </Link>
          <Link
            to={"/product"}
            rel="noreferrer"
            className="py-2 text-[#B8B9BA]"
          >
            Product
          </Link>
          <Link to={"/career"} rel="noreferrer" className="py-2 text-[#B8B9BA]">
            Career
          </Link>
          <a href="https://sadokorganic.farm/#about"
              target="_blank"
              rel="noopener noreferrer" className="py-2 text-[#B8B9BA]">
            About us
          </a>
        </div>
        <div className="flex max-[700px]:flex-col  max-[600px]:items-center mt-5 col-span-2 min-[700px]:mt-16 min-[700px]:justify-between min-[1100px]:mt-0">
          <address className="flex flex-col max-[700px]:items-center max-[700px]:mt-4 max-[700px]:mx-5 min-[700px]:max-w-[300px] min-[1300px]:max-w-[400px]  ">
            <p className="text-[#10C542] font-bold text-lg mb-5 not-italic">
              Get in Touch
            </p>
            <a
              href="https://maps.app.goo.gl/mbustDy813SagoW6A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B8B9BA] flex items-center max-[700px]:flex-col not-italic leading-6 max-[700px]:text-center"
            >
              <img
                src={location}
                alt=""
                className="min-[700px]:mr-4 max-[700px]:mb-3"
              />{" "}
              Iyabus plazza , addo road Ajah, Lagos, Nigeria
            </a>
            <a
              href="mailto:sadokorganicfarm@gmail.com"
              rel="noopener noreferrer"
              className="text-[#B8B9BA] flex  my-5 items-center max-[700px]:flex-col not-italic leading-6 max-[700px]:text-center"
            >
              <img
                src={email}
                alt=""
                className="min-[700px]:mr-4 max-[700px]:mb-3"
              />
              sadokorganicfarm@gmail.com
            </a>
            <a
              href="tel:+23408178695313"
              rel="noopener noreferrer"
              className="text-[#B8B9BA] flex items-center max-[700px]:flex-col not-italic leading-6 max-[700px]:text-center"
            >
              <img
                src={phone}
                alt={"phone icon"}
                className="min-[700px]:mr-4 max-[700px]:mb-3"
              />
              +234 817 869 5313
            </a>
          </address>
          <div className="max-[700px]:mt-5 flex max-[700px]:items-center flex-col min-[700px]:ml-10 min-[1200px]:ml-16">
            <div className=" flex w-[130px] justify-between  my-6 min-[600px]:mt-0  ">
              <a href="https://wa.me/08178695313" className="">
                <img src={whatsapp} alt="whatsapp icon" className="" />
              </a>
              <a
                href="https://www.facebook.com/sadokfarm.org2u"
                className=""
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src={facebook} alt="" className="" />
              </a>
              <a
                href="https://www.instagram.com/sadok.org2u/?igshid=MzRlODBiNWFlZA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {" "}
                <img src={instagram} alt="" className="" />
              </a>
            </div>
            <p className="text-[#B8B9BA] text-center">
              Follow our social media.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default FooterLinks;
