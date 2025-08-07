import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  openEditProfileModal,
  handleLogOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          openEditProfileModal={openEditProfileModal}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onSelectedCard={onSelectedCard}
          clothingItems={clothingItems}
          onCreateModal={onCreateModal}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
