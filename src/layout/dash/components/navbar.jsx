import { useAuth } from "../../../contexts/AuthContext";

function Navbar(prop) {
  const { userProfile, user } = useAuth();

  var fullName = "example name";

  if (userProfile === undefined || userProfile === null) {
    fullName = "john doe";
  } else if (userProfile.name === undefined || userProfile.name === null) {
    fullName = "john doe";
  } else {
    fullName = userProfile.name;
  }
  const fullNameArray = fullName.split(" ");
  const firstName = fullNameArray[0];
  const lastName = fullNameArray.slice(1).join(" ");

  return (
    <div className="bg-white min-[600px]:border-gray-400 border-b flex items-center justify-between px-10 py-1  max-[400px]:pl-2 max-[1100px]:px-5 sticky top-0 z-10 w-full h-[101px] max-[1200px]:h-20 max-[600px]:bg-[#243119]">
      <div className=" flex flex-col   max-[600px]:hidden">
        <p className="font-bold text-[#464255] text-2xl max-[1200px]:text-xl max-[1000px]:text-lg">
          {prop.name}
        </p>
        <p className=" font-medium text-[#A3A3A3] mt-2.5 text-base max-w-[600px] max-[1200px]:text-sm max-[1000px]:max-w-[450px] ">
          {prop.description}
        </p>
      </div>
      <div className="flex items-center max-[1000px]:hidden  border-l border-gray-500 pl-5">
        {user && (
          <>
            <div className="max-[750px]:hidden flex items-center">
              <img
                src={userProfile && userProfile.img}
                className="w-12 rounded-full"
                alt=""
              />

              <div className="flex flex-col  pl-3.5">
                <p className="text-lg font-semibold  flex items-center">
                  Hello,
                  <span className="ml-2">{firstName}</span>
                  <span className="max-[1300px]:hidden ml-2">{lastName}</span>
                </p>
                <p className=" text-lg text-[#908989] ">{prop.role}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Navbar;
