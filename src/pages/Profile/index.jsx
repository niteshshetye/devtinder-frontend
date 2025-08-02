import { useSelector } from "react-redux";
import UserCard from "../../components/UserCard";
import UserProfileForm from "../../components/profile/UserProfileForm";

const ProfilePage = () => {
  const userProfileResponse = useSelector((state) => state.user);
  const {
    firstName = "",
    lastName = "",
    emailId = "",
    age = "",
    bio = "",
    photoUrl = "",
  } = userProfileResponse || {};

  return (
    <div className="w-full flex justify-center items-center gap-14">
      <UserProfileForm
        firstName={firstName}
        lastName={lastName}
        emailId={emailId}
        age={age}
        bio={bio}
        photoUrl={photoUrl}
      />
      <UserCard
        firstName={firstName}
        lastName={lastName}
        age={age}
        bio={bio}
        photoUrl={photoUrl}
      />
    </div>
  );
};

export default ProfilePage;
