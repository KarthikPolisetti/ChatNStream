import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, CalendarHeart, HomeIcon, LogOutIcon, MessageSquareHeart, Search, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import useNotificationCount from "../hooks/useNotificationCount";
const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();
  const notificationCount = useNotificationCount();


  

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
      


          

          <div className="flex items-center gap-3 sm:gap-2 ml-auto">

              <Link to={"/"}>
              <button className="btn btn-ghost btn-circle">
                <HomeIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>


            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                {notificationCount > 0 && (
          <span className="badge badge-primary absolute top-2  text-xs">
            {notificationCount}
          </span>
        )}
              </button>
            </Link>

          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-11 rounded-full">
              <Link to={"/profile"}>
               <button className="btn btn-ghost btn-circle">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
              </button>
              </Link>

            </div>
          </div>

          {/*SearchBar*/}
          <Link to={"/scheduled-messages"}>
           <button className="btn btn-ghost btn-circle">
              <CalendarHeart className='size-5 text-base-content opacity-70' />
          </button>
          </Link>


          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;