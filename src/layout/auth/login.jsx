import React, { useState } from "react";
import button from "../../assets/icon/google.svg";
import background from "../../assets/images/bg.svg";
import logo from "../../assets/images/logo.svg";
import { auth, db, provider } from "../../firebase";
import { sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Loading from "../../components/loadingScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState("close");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setLoad("open");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          setLoad("close");
          toast.success("🎉Woohoo! You're in, Welcome Back", {
            position: "top-right",
            autoClose: 4000,
            onClose: () => {
              navigate(`/product`);
            },
          });
        } else {
          setLoad("close");
          toast.error("Please verify your email before signing in.", {
            position: "top-right",
            autoClose: 5000,
            onClose: () => {
              navigate(`/register`);
            },
          });
        }
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setLoad("close");
          toast.error("Email does not exist. Please create an account.", {
            position: "top-right",
            autoClose: 4000,
            onClose: () => {
              navigate(`/register`);
            },
          });
        } else if (err.code === "auth/network-request-failed") {
          setLoad("close");

          toast.error(
            "Network error. Please check your internet connection and try again.",
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
        } else if (err.code === "auth/invalid-email") {
          setLoad("close");

          toast.error(
            "Invalid email format. Please enter a valid email address.",
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
        } else if (err.code === "auth/wrong-password") {
          setLoad("close");

          toast.error("Invalid Password!!! Please Try Again.", {
            position: "top-right",
            autoClose: 4000,
          });
        } else {
          // Handle other error cases
          console.error("Authentication Error:", err);
          setLoad("close");
        }
      });
  }

  async function signin() {
    setLoad("open");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            phone: "",
            address: "",
            img: user.photoURL,
            date: "",
            orders: {},
            coupons: {},
          }).then(async () => {
            setLoad("close");
            toast.success("🎉Woohoo! You're in, Welcome.", {
              position: "top-right",
              autoClose: 4000,
              onClose: () => {
                navigate(`/product`);
              },
            });
          });
        } else {
          await updateDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            img: user.photoURL,
          }).then(async () => {
            setLoad("close");
            toast.success("🎉Woohoo! You're in, Welcome Back.", {
              position: "top-right",
              autoClose: 4000,
              onClose: () => {
                navigate(`/product`);
              },
            });
            const unsubscribe = toast.onChange(
              (numberOfToastDisplayed, containerId) => {
                // Do whatever you want
                // The containerId is useful when working with multiple containers
              }
            );

            unsubscribe();
          });
        }
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          setLoad("close");
          toast.warn("You Closed the Sign in Popup. Try Again");
        }
      });
  }

  const handleResetPassword = async (e) => {
    // e.preventDefault();
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email);
        toast.success("Password reset email sent. Please check your inbox.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.warn("Kindly Input your email to reset your password", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
    setEmail(undefined);
  };

  return (
    <section className="signup flex items-center justify-center w-[100vw] h-[100vh] ">
      {/* <div className="bg-white  w-[350px] rounded-xl flex-col my-3 items-center z-30 shadow-[-10px_7px_4px_0px_rgba(0,0,0,0.3)] flex absolute top-[0px] right-0">
        <div className=" p-3 rounded-full mt-3 bg-green-500">
          <img src={successImg} alt="" className="w-4" />
        </div>
        <h1 className=" font-bold text-lg mt-2 ">something</h1>
        <p className="text-base text-center my-3 w-max-[80%]">anotherthing</p>
        <div className="load h-2 w-full bg-gray-300 rounded-b-3xl flex justify-end">
          <div className="load h-2 rounded-b-3xl rounded-tl-3xl relative right-0 bg-green"></div>
        </div>
      </div> */}
      <div className="min-[500px]:flex flex-row-reverse  items-center max-h-[750px] max-w-[950px] min-[900px]:bg-[#EBEBEB] min-[900px]:rounded-[80px] ">
        <div className="w-[80vw] max-[500px]:w-[95vw] min-[600px]:w-[55vw] min-[750px]:w-[45vw] mx-auto flex flex-col items-center">
          <div className="flex items-center mb-5 mt-7">
            <img src={logo} alt="" className="w-14" />
            <h3 className=" text-center  text-3xl font-bold text-[#005628] max-[375px]:text-2xl  ">
              Sadok Organic Farms
            </h3>
          </div>
          <h3 className=" text-center  text-3xl font-semibold mt-5">Sign In</h3>
          <p className=" text-center text-[#8A92A6] my-3">
            Sign in to stay connected.
          </p>
          <form
            className="signupForm min-[350px]:w-[90%] justify-center items-center"
            autoComplete="on"
            onSubmit={handleSubmit}
          >
            <div className="min-[340px]:mb-2">
              <p className="text-[#8A92A6]">Email</p>
              <input
                className="w-[80vw] min-[1200px]:w-[95%] min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="email"
                id="email"
                required
                placeholder="yourmail@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="min-[340px]:mb-2">
              <p className="text-[#8A92A6]">Password</p>
              <input
                className="w-[80vw] min-[1200px]:w-[95%] min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="password"
                id="password"
                placeholder=""
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center flex-col">
              <button
                className="text-green-700 block w-full text-right mr-8 font-semibold"
                type="button"
                onClick={() => {
                  handleResetPassword();
                }}
              >
                Forgot Password
              </button>

              <button
                className="bg-green-700 text-white px-16 py-2 rounded-lg my-6 mx-auto w-fit hover:bg-green-800"
                type="submit"
                // onClick={() => {
                //   handleSubmit();
                // }}
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mb-16 flex items-center flex-col">
            <p className="">Or sign in with other accounts?</p>
            <button
              className="my-5 bg-white flex items-center shadow-xl rounded-2xl px-5 py-4"
              onClick={signin}
            >
              <img src={button} alt="" className="mr-2" />
              <p
                className="fobo
              "
              >
                Continue with Google
              </p>
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-700 font-bold ">
                Click here to sign up.
              </Link>
            </p>
          </div>
        </div>
        <div
          className="max-[900px]:hidden max-[750px]:w-[45vw] w-[50vw]  h-full flex items-end
            "
        >
          <img
            src={background}
            alt=""
            className="h-fit rounded-l-[10vh] min-[900px]:rounded-r-[5vh]"
          />
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
      {load === "open" ? (
        <div className="">
          <Loading />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
export default Login;
