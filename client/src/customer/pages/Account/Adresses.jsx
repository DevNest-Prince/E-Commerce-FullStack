import { useAppSelector } from "../../../Redux Toolkit/Store";
import UserAddressCard from "./UserAddressCard";

const Addresses = () => {
  const { user } = useAppSelector((store) => store);

  return (
    <div className="space-y-3">
      {user?.user?.addresses && user.user.addresses.length > 0 ? (
        user.user.addresses.map((item) => (
          <UserAddressCard key={item._id} item={item} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No addresses found.</p>
      )}
    </div>
  );
};

export default Addresses;
