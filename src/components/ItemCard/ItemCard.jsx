import "./ItemCard.css";
import liked_button from "../../assets/liked_button.svg";
import disliked_button from "../../assets/disliked_button.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onSelectedCard, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onSelectedCard(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = !currentUser._id
    ? "card__like-hidden"
    : "card__like-visible";

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        <img
          src={isLiked ? liked_button : disliked_button}
          alt={isLiked ? "Liked" : "No likes"}
          className={itemLikeButtonClassName}
          onClick={handleLike}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
