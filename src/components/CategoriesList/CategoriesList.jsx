import React from 'react';
import './CategoriesList.css';

const categories = [
  { name: "фантаст...", id: "1" },
  { name: "боевик", id: "2" },
  { name: "триллер", id: "3" },
  { name: "комедия", id: "4" },
  { name: "криминал", id: "5" },
  { name: "мультфи...", id: "6" },
  { name: "фэнтези", id: "7" },
  { name: "семейный", id: "8" },
  { name: "приключ...", id: "9" },
  { name: "драма", id: "10" },
  { name: "мелодра...", id: "11" },
  { name: "детектив", id: "12" },
  { name: "военный", id: "13" },
  { name: "история", id: "14" },
  { name: "биограф...", id: "15" },
  { name: "вестерн", id: "16" },
  { name: "спорт", id: "17" },
  { name: "мюзикл", id: "18" },
  { name: "ужасы", id: "19" },
  { name: "музыка", id: "20" },
  { name: "докумен...", id: "21" },
  { name: "индийский", id: "22" },
  { name: "коротком...", id: "23" },
  { name: "аниме", id: "24" },
  { name: "сериалы", id: "25" },
  { name: "телешоу", id: "26" },
  { name: "tajik", id: "27" }
];

const CategoriesList = ({ isVisible }) => {
  return (
    <div>
      {isVisible && (
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <span>{category.name}</span> <span>({category.id})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
