import { Link } from "react-router-dom";
import logo from "../../../assets/icon/logo-light.svg";
import menuOpen from "../../../assets/icon/menu-open-light.svg";
import menuClosed from "../../../assets/icon/menu-close-light.svg";
import products from "../../../assets/icon/package.svg";
import overview from "../../../assets/icon/dash.svg";
import customer from "../../../assets/icon/customer.svg";
import analytics from "../../../assets/icon/analytics.svg";
import campaign from "../../../assets/icon/campaign.svg";
import employee from "../../../assets/icon/employee.svg";
import sign_out from "../../../assets/icon/leave.svg";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

function SideBar(prop) {
  const [toggle, setToggle] = useState("open");
  const [screenWidth] = useState(window.innerWidth);
  const { userProfile, user } = useAuth();

  function handleSignOut() {
    signOut(auth).then(() => {
      alert("You have been signed out");
    });
  }
  const style = {
    maxHeight: "",
  };

  console.log(screenWidth);

  if (prop.user === "admin") {
    style.maxHeight = " 550px ";
  } else {
    style.maxHeight = " 350px ";
  }
  if (toggle === "close") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }



  return (
    <div
      className={
        toggle === "open"
        // ? "shadow-[7px_7px_4px_0px_rgba(0,0,0,0.3)] sticky top-0 z-10"
        // : "  max-[1000px]:fixed max-[1000px]:w-[102vw]  max-[1000px]:h-[102vh]  top-[0px] left-[0px] max-[1000px]:z-[20] "
      }
    >
      <div
        className={
          toggle === "open"
            ? "shadow-[7px_7px_4px_0px_rgba(0,0,0,0.3)] sticky top-0 z-10"
            : "z-[0]  max-[1000px]:fixed max-[1000px]:w-[102vw] min-[600px]:hidden max-[1000px]:h-[102vh] max-[1000px]:bg-[rgba(0,0,0,0.7)] top-[0px] left-[0px] max-[1000px]:z-[20 "
        }
        onClick={() => {
          setToggle("open");
        }}
      ></div>
      <div
        className={
          toggle === "open"
            ? "sticky top-0 side-nav w-[20%] h-[100vh] w-max- bg-[#243119] max-w-[300px] min-w-[280px] max-[1200px]:w-[80px] max-[1200px]:min-w-[60px] max-[600px]:w-[40vw] max-[600px]:min-w-[300px] max-[600px]:z-20 max-[600px]:top-0  max-[600px]:left-0 max-[600px]:fixed max-[600px]: transition-all duration-[2s]  max-[600px]:h-fit  "
            : "sticky top-0 side-nav w-[20%] h-[100vh] w-max- bg-[#243119] max-w-[300px] min-w-[280px] max-[1200px]:w-[80px] max-[1200px]:min-w-[60px] max-[600px]:w-[40vw] max-[600px]:min-w-[300px] max-[600px]:z-20 max-[600px]:top-0  max-[600px]:left-0 max-[600px]:fixed max-[600px]: transition-all duration-[2s]  "
        }
      >
        <div className="logo flex justify-between max-[600px]:px-4 max-[600px]:shadow-xl border-gray-400 border-b max-[600px]:w-[100vw]  ">
          <div className="flex justify-start h-[100px] items-center max-[1200px]:h-20 min-[600px]:w-full">
            <img
              src={logo}
              alt=""
              className="w-12 min-[1200px]:mr-1 max-[600px]:ml-0 max-[600px]:mr-3 max-[1200px]:mx-auto"
            />
            <p className="text-[white] text-lg font-extrabold max-[1200px]:hidden max-[600px]:block max-[600px]:text-2xl max-[400px]:text-xl ">
              Sadok Organic Farms
            </p>
          </div>
          <div className="hidden max-[600px]:flex  mr-1 min-[1250px]:mr-2">
            <img
              src={menuOpen}
              alt=""
              className="hidden max-[850px]:block"
              onClick={() => {
                setToggle("close");
              }}
              style={
                toggle === "open" ? { display: "block" } : { display: "none" }
              }
            />

            <img
              src={menuClosed}
              alt=""
              className="hidden cursor-pointer"
              onClick={() => {
                setToggle("open");
              }}
              style={
                toggle === "close" ? { display: "block" } : { display: "none" }
              }
            />
          </div>
        </div>
        <div
          className={
            toggle === "open"
              ? "area h-[85%] flex flex-col  justify-between max-[600px]:hidden "
              : "area h-[85%] flex flex-col  justify-between "
          }
        >
          <div
            class="area-two navbar w-[90%] h-[65vh]  mt-6 flex flex-col justify-between mx-auto max-h-[550px]"
            style={
              prop.user === "admin"
                ? { maxHeight: " 550px " }
                : { maxHeight: " 350px " }
            }
          >
            {/* <div class="side-nav-items w-[85%] h-[80%] max-h-[550px]"> */}
            <p className=" font-extrabold text-xl text-[white] py-5 max-[1200px]:text-center  max-[600px]:text-left">
              MENU
            </p>
            <ul class="flex flex-col justify-between h-[90%]">
              <li class=" ">
                <Link
                  to={"/dashboard"}
                  rel="noreferrer"
                  className="flex items-center px-5 py-4 rounded-xl font-bold text-lg text-white hover:bg-[#FFFFFF40] max-[1200px]:justify-center max-[600px]:justify-start"
                  style={
                    prop.page === "overview"
                      ? { backgroundColor: "#FFFFFF40", color: "white" }
                      : {}
                  }
                >
                  <img src={overview} alt="" className="" />
                  <p
                    className="max-[1200px]:hidden max-[600px]:block transition-opacity opacity-100 duration-1000 ml-4"
                    style={
                      prop.page === "overview" ? { fontWeight: "bold" } : {}
                    }
                  >
                    Dashboards{" "}
                  </p>
                </Link>
              </li>
              {prop.user === "admin" ? (
                <>
                  <li>
                    <Link
                      to={"/cataloge"}
                      rel="noreferrer"
                      className="flex items-center px-5 py-4 rounded-xl font-bold text-lg text-white hover:bg-[#FFFFFF40] max-[1200px]:justify-center max-[600px]:justify-start"
                      style={
                        prop.page === "products"
                          ? { backgroundColor: "#FFFFFF40", color: "white" }
                          : {}
                      }
                    >
                      <img src={products} alt="" className="" />
                      <p
                        className="ml-4 max-[1200px]:hidden max-[600px]:block"
                        style={
                          prop.page === "products" ? { fontWeight: "bold" } : {}
                        }
                      >
                        Products
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/customers"}
                      rel="noreferrer"
                      className="flex items-center px-5 py-4 rounded-xl font-bold text-lg text-white hover:bg-[#FFFFFF40] max-[1200px]:justify-center max-[600px]:justify-start"
                      style={
                        prop.page === "customers"
                          ? { backgroundColor: "#FFFFFF40", color: "white" }
                          : { display: "flex" }
                      }
                    >
                      <img src={customer} alt="" className="" />
                      <p
                        className="max-[1200px]:hidden max-[600px]:block transition-opacity opacity-100 duration-1000 ml-4"
                        style={
                          prop.page === "customers"
                            ? { fontWeight: "bold" }
                            : {}
                        }
                      >
                        Customers
                      </p>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/campaign"}
                      rel="noreferrer"
                      className="flex items-center px-5 py-4 rounded-xl font-bold text-lg text-white hover:bg-[#FFFFFF40] max-[1200px]:justify-center max-[600px]:justify-start"
                      style={
                        prop.page === "campaign"
                          ? { backgroundColor: "#FFFFFF40", color: "white" }
                          : { display: "flex" }
                      }
                    >
                      <img src={campaign} alt="" className="" />
                      <p
                        className="max-[1200px]:hidden max-[600px]:block transition-opacity opacity-100 duration-1000 ml-4"
                        style={
                          prop.page === "campaign" ? { fontWeight: "bold" } : {}
                        }
                      >
                        {" "}
                        Campaign
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/employee"}
                      rel="noreferrer"
                      className="flex items-center px-5 py-4 rounded-xl font-bold text-lg text-white hover:bg-[#FFFFFF40] max-[1200px]:justify-center max-[600px]:justify-start"
                      style={
                        prop.page === "employee"
                          ? { backgroundColor: "#FFFFFF40", color: "white" }
                          : { display: "flex" }
                      }
                    >
                      <img src={employee} alt="" className="" />
                      <p
                        className="max-[1200px]:hidden max-[600px]:block transition-opacity opacity-100 duration-1000 ml-4"
                        style={
                          prop.page === "employee" ? { fontWeight: "bold" } : {}
                        }
                      >
                        {" "}
                        Employees
                      </p>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* <li>
                    <Link
                      to={"/tasks"}
                      rel="noreferrer"
                      className="flex items-center p-5 rounded-xl font-bold text-lg text-[#64748B]  hover:bg-[#ECFFF6]"
                      style={
                        prop.page === "tasks"
                          ? { backgroundColor: "#ECFFF6", color: "0D9254" }
                          : { display: "flex" }
                      }
                    >
                      <img src={productsActive} alt="" className="mr-4" />
                      <p className="max-[1200px]:hidden max-[600px]:block">
                        Tasks
                      </p>
                    </Link>
                  </li> */}
                </>
              )}

              <li>
                <Link
                  to={"/analytics"}
                  rel="noreferrer"
                  className="flex items-center px-5 py-4 rounded-xl font-bold text-lg text-white hover:bg-[#FFFFFF40] max-[1200px]:justify-center max-[600px]:justify-start"
                  style={
                    prop.page === "analytics"
                      ? { backgroundColor: "#FFFFFF40", color: "white" }
                      : { display: "flex" }
                  }
                >
                  <img src={analytics} alt="" className="" />
                  <p
                    className="max-[1200px]:hidden max-[600px]:block transition-opacity opacity-100 duration-1000 delay-1000 ml-4"
                    style={
                      prop.page === "analytics" ? { fontWeight: "bold" } : {}
                    }
                  >
                    Analytics
                  </p>
                </Link>
              </li>

              {/* <li>
                <Link
                  to={"/settings"}
                  rel="noreferrer"
                  className="flex items-center p-5 rounded-xl font-bold text-lg text-[#64748B] hover:bg-[#ECFFF6]"
                  style={
                    prop.page === "settings"
                      ? { backgroundColor: "#ECFFF6", color: "0D9254" }
                      : { display: "flex" }
                  }
                >
                  <img src={products} alt="" className="mr-4" />
                  <p className="max-[1200px]:hidden max-[600px]:block">
                    {prop.user === "admin" ? "Control Panel" : "Settings"}
                  </p>
                </Link>
              </li> */}
            </ul>
            {/* </div> */}
          </div>
          <div className="  relative bottom-0">
            <button
              onClick={handleSignOut}
              className="flex items-center pl-5 py-5 hover:bg-red-200 w-full"
            >
              <img src={sign_out} alt="" className="mr-3" />
              <p className="max-[1200px]:hidden max-[600px]:block text-white">
                Log Out
              </p>
            </button>
          </div>
          <div className="flex items-center  min-[1000px]:border-l border-gray-500 max-[600px]:pl-5 min-[600px]:mx-auto max-[600px]:bg-white min-[1000px]:hidden">
            {user && (
              <>
                <div className=" flex items-center">
                  <img
                    src={userProfile && userProfile.img}
                    className="w-12 rounded-full"
                    alt=""
                  />

                  <div className="flex flex-col  pl-3.5 min-[600px]:hidden">
                    <p className="text-lg font-semibold text-black flex items-center">
                      {userProfile && userProfile.name}
                    </p>
                    <p className=" text-lg text-black ">Administrator</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
