import "./ClothesSection.css";
import SideBar from "../SideBar/SideBar";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onSelectedCard, onCreateModal, clothingItems }) {
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

      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onSelectedCard={onSelectedCard}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
