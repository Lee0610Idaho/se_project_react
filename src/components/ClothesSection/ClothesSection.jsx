import "./ClothesSection.css";
import SideBar from "../SideBar/SideBar";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onSelectedCard,
  onCreateModal,
  clothingItems,
  currentUser,
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p className="clothes-section__header">Your items</p>
        <button
          className="clothes-section__card-button"
          type="text"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      {clothingItems.length && currentUser && currentUser._id ? (
        <ul className="clothes-section__list">
          {clothingItems.map((item) =>
            item.owner === currentUser._id ? (
              <ItemCard
                key={item._id}
                item={item}
                onSelectedCard={onSelectedCard}
                onCardLike={onCardLike}
              />
            ) : null
          )}
        </ul>
      ) : (
        <div>There are no items yet! Add new ones now.</div>
      )}
    </div>
  );
}

export default ClothesSection;
