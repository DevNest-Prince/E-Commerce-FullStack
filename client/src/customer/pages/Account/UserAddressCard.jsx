const UserAddressCard = ({ item }) => {
  return (
    <div className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
      <div className="space-y-3">

        {/* Name */}
        <h1 className="font-semibold text-gray-900 capitalize">
          {item.name}
        </h1>

        {/* Address */}
        <p className="text-gray-700 leading-relaxed">
          {item.address}, {item.locality}, {item.city}, {item.state} - {item.pinCode}
        </p>

        {/* Mobile */}
        <p className="text-gray-800">
          <strong>Mobile:</strong> {item.mobile}
        </p>
      </div>
    </div>
  );
};

export default UserAddressCard;
