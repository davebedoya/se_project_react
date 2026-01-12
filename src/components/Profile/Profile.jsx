import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}
