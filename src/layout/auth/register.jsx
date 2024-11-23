import button from "../../assets/icon/google.svg";
import background from "../../assets/images/bg.svg";
import emailPhoto from "../../assets/icon/email.svg";
import logo from "../../assets/images/logo.svg";
import { auth, provider, db } from "../../firebase";
import {
  sendEmailVerification,
  signInWithPopup,
  updateEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loading from "../../components/loadingScreen";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

//creating new doc 
/*
coupon object
orders object

*/



const Register = (prop) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [load, setLoad] = useState(false);
  const [emailReset, setEmailReset] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seconds, setSeconds] = useState(90);
  const [isActive, setIsActive] = useState(false);

  const startTimer = () => {
    setIsActive(true);
    setSeconds(90);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsActive(false);
            // You can perform any actions when the timer reaches 0 here
          }
          return prevSeconds === 0 ? 0 : prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  var fieldStyle = {
    // border: "2px solid red",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Fields cannot be empty.", {
        position: "top-right",
        autoClose: 4000,
      });
      // fieldStyle = { border: "2px solid yellow" };
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 4000,
      });
    } else {
      setLoad(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(user.user)
            .then(() => {
              toast.success(
                "Verification email sent. Please check your email inbox.",
                {
                  position: "top-right",
                  autoClose: 4000,
                }
              );
              startTimer();
            })
            .then(() => {
              setDoc(doc(db, "users", user.user.uid), {
                name: name,
                email: email,
                phone: "",
                address: "",
                img: "",
                date: "",
                orders: {},
                coupons: {},
              })
                .then(async () => {
                  console.log("i close loading");
                  setLoad(false);
                })
                .catch(() => {
                  // Handle any errors during user registration
                });
            });
          // Check for the user's role (engineer or customer) and redirect to their respective dashboard
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setLoad(false);

            toast.error(
              "The provided email address is already in use. Try Signing in",
              {
                position: "top-right",
                autoClose: 4000,
                onClose: () => {
                  navigate(`/`);
                },
              }
            );
          } else {
            // Handle other types of errors
          }
        });
    }
  }

  async function signin() {
    setLoad(true);
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
            setLoad(false);
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
            setLoad(false);

            toast.success("🎉Woohoo! You're in, Welcome Back.", {
              position: "top-right",
              autoClose: 4000,
              onClose: () => {
                navigate(`/product`);
              },
            });
          });
        }
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          setLoad(false);
          toast.warn("You Closed the Sign in Popup. Try Again");
        }
      });
  }

  useEffect(() => {
    if (user && !user.emailVerified) {
      setEmailVerified(false);
      let duration = 600; // 10 minutes in seconds
      const intervalId = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          setEmailVerified(true);

          toast.success("Congratulations!, Your Email has been verified.", {
            onClose: () => {
              navigate(`/product`);
            },
          });
          clearInterval(intervalId);
        } else {
          duration -= 10;
          if (duration <= 0) {
            setEmailVerified(false);
            clearInterval(intervalId);
          }
        }
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [user, emailVerified, navigate]);

  function resendEmailVerify() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success(
          "Verification email sent. Please check your email inbox.",
          {
            position: "top-right",
            autoClose: 4000,
          }
        );
        startTimer();
      })
      .catch((err) => {
        if (err.code === "auth/too-many-requests") {
          toast.error(
            "Too many requests. Please wait a moment and try again later.",
            {
              position: "top-right",
              autoClose: 4000,
            }
          );
        }
      });
  }

  function resetEmail() {
    if (email === undefined || email === "") {
      toast.error("Please enter your email address.", {
        position: "top-right",
        autoClose: 4000,
      });
    } else {
      updateEmail(auth.currentUser, email)
        .then(() => {
          toast.success("Email Successfully reset.", {
            position: "top-right",
            autoClose: 4000,
          });
          setEmailReset(false);
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 4000,
          });
          console.log(error);
          // An error occurred
          // ...
        });
    }
  }

  return (
    <section className="signup flex min-[450px]:items-center justify-center w-[100vw] h-[100vh] ">
      <div className="min-[500px]:flex min-[700px]:mr-5 items-center max-h-[780px] max-w-[1000px] min-[900px]:bg-[#EBEBEB] min-[900px]:rounded-[80px] ">
        <div className="w-[80vw] max-[500px]:w-[95vw] min-[600px]:w-[55vw] min-[750px]:w-[45vw] min-w-[380px] mx-auto flex flex-col items-center">
          <div className="flex items-center mb-5 mt-7 max-[450px]:flex-col">
            <img src={logo} alt="" className="w-14 max-[450px]:mb-3" />
            <h3 className=" text-center  text-3xl font-bold text-[#005628] max-[375px]:text-2xl  ">
              Sadok Organic Farms
            </h3>
          </div>
          <h3 className=" text-center  text-3xl font-semibold mt-5">Sign Up</h3>
          <h5 className=" text-center text-[#8A92A6] my-3">
            Create your account now.
          </h5>
          <form
            className="signupForm min-[350px]:grid grid-cols-2 min-[350px]:gap-x-4 min-[350px]:w-[90%] justify-center items-center"
            autoComplete="on"
            onSubmit={handleSubmit}
          >
            <div className="min-[340px]:mb-2 col-span-2">
              <p className="text-[#8A92A6]">Full Name</p>
              <input
                className="w-[80vw] max-w-[300px min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="text"
                id="name"
                placeholder=""
                value={name}
                // style={{ border: "2px solid red" }}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="min-[340px]:mb-2">
              <p className="text-[#8A92A6]">Phone Number</p>
              <input
                className="w-[80vw] max-w-[300px] min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="text"
                id="phone"
                placeholder=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="min-[340px]:mb-2">
              <p className="text-[#8A92A6]">Email</p>
              <input
                className="w-[80vw] max-w-[300px] min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="email"
                id="email"
                placeholder=""
                style={fieldStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="min-[340px]:mb-2">
              <p className="text-[#8A92A6]">Password</p>
              <input
                className="w-[80vw] max-w-[300px] min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="password"
                id="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="min-[340px]:mb-2">
              <p className="text-[#8A92A6]">Confirm password</p>
              <input
                className="w-[80vw] max-w-[300px] min-[350px]:w-full  border border-gray-400 rounded-lg mt-3 mb-4 py-2 px-2 "
                type="password"
                id="password"
                placeholder=""
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="h-fit col-span-2 bg-green-700 text-white px-16 py-2 rounded-lg mt-6 mx-auto w-fit hover:bg-green-800"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="my-10 flex items-center flex-col">
            <p className="">Or sign in with other accounts?</p>
            <button
              className="my-5 bg-white flex items-center shadow-xl rounded-2xl px-5 py-4"
              onClick={signin}
            >
              <img src={button} alt="" className="mr-2" />
              <p>Continue with Google</p>
            </button>
            <p className="text-center">
              Have an account?{" "}
              <Link to="/" className="text-green-700  font-bold">
                Click here to sign in.
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
      {load ? (
        <div className="">
          <Loading />
        </div>
      ) : (
        ""
      )}
      {emailVerified ? (
        ""
      ) : (
        <div className="flex flex-col fixed w-[102vw]  h-[102vh] bg-[rgba(0,0,0,0.7)] top-[0px] left-[0px] z-[40]  items-center justify-center">
          <div className="bg-white  w-[80vw] max-w-[460px] rounded-2xl flex items-center flex-col px-9 py-8 max-[450px]:px-4 ">
            <img src={emailPhoto} alt="" className="" />
            <p className="text-slate-900 text-[26px] font-bold mt-2 max-[450px]:mt-3 max-[450px]:text-2xl">
              {emailReset ? "Reset your Email" : "Verify your Email"}
            </p>
            <p className="mt-4 mb-6 text-center text-slate-400 text-lg max-[450px]:text-base leading-relaxed ">
              {emailReset
                ? "Reset your email account, Enter the new email address you want to registered with us"
                : " Thank you for signing up to Sadok organic, kindly check your email for verification link so you can access our website"}
            </p>
            <div className="w-full flex flex-col items-end">
              {emailReset ? (
                <div className="min-[340px]:mb-4 w-full">
                  <p className="text-[#8A92A6]">Email</p>
                  <input
                    className="  min-[350px]:w-full  border border-green-800 rounded-lg mt-3 mb-4 py-2 px-2 "
                    type="email"
                    id="email"
                    placeholder="youremail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : (
                <>
                  {" "}
                  <p className="text-right max-[450px]:leading-6 pb-3 max-[450px]:pb-4 max-[450px]:text-sm">
                    Invalid email address?{" "}
                    <button
                      className="text-blue-700"
                      onClick={() => {
                        setEmailReset(true);
                        setEmail("");
                      }}
                    >
                      Click here
                    </button>{" "}
                  </p>{" "}
                  <p className="text-left pb-4 max-[450px]:pb-5 max-[450px]:text-sm">
                    Didn’t receive an email?{" "}
                  </p>
                </>
              )}

              <button
                className="w-full bg-[#017336] text-white py-3 max-[450px]:py-2 rounded-2xl  text-xl max-[450px]:text-lg font-semibold hover:bg-green-800"
                disabled={isActive}
                onClick={() => {
                  emailReset ? resetEmail() : resendEmailVerify();
                }}
              >
                {isActive
                  ? `Retry In ${seconds}s`
                  : emailReset
                  ? "Reset Email"
                  : "Resend Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Register;
