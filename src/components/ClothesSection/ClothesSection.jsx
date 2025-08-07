import "./ClothesSection.css";
import SideBar from "../SideBar/SideBar";
import ItemCard from "../ItemCard/ItemCard";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const clothingItemsByOwner = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p className="clothes-section__header">Your items</p>
        <button
          className="clothes-section__card-button"
          type="button"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__list">
        {clothingItemsByOwner.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onSelectedCard={onSelectedCard}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
