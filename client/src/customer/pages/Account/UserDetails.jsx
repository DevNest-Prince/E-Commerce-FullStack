import { Divider } from "@mui/material";
import ProfileFildCard from "../../../seller/pages/Account/ProfileFildCard";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const UserDetails = () => {
  const { user } = useAppSelector((store) => store);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        
        {/* Header */}
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">
            Personal Details
          </h1>
        </div>

        {/* Details Section */}
        <div className="space-y-5">
          <div>
            <ProfileFildCard keys="Name" value={user?.user?.fullName} />
            <Divider />

            <ProfileFildCard keys="Email" value={user?.user?.email} />
            <Divider />

            <ProfileFildCard keys="Mobile" value={user?.user?.mobile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
