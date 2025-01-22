const GroupAvatar = ({ members }) => {
  const displayedMembers = members.slice(0, 2); // Display up to two members

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      {displayedMembers.map((member, index) => (
        <img
          key={member._id}
          src={member.profilePic || "/avatar.png"}
          alt={member.userName}
          className={`absolute size-6 object-cover rounded-full ${
            index === 0 ? "top-0 left-0" : "bottom-0 right-0"
          }`}
          style={{
            border: "2px solid white", // Add a border for better separation
          }}
        />
      ))}
      {members.length > 2 && (
        <span className="absolute size-6 flex items-center justify-center rounded-full bg-zinc-300 text-sm text-black font-medium bottom-0 right-0">
          +{members.length - 2}
        </span>
      )}
    </div>
  );
};

export default GroupAvatar;
