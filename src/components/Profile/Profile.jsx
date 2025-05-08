import "./Profile.css";
import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  currentUser,
  onCardLike,
  handleLogOut,
  openEditModal,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleLogOut={handleLogOut} openEditModal={openEditModal} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onSelectedCard={onSelectedCard}
          clothingItems={clothingItems}
          onCreateModal={onCreateModal}
          currentUser={currentUser}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
