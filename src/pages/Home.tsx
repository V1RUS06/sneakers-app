import React, {FC} from 'react';
import {CardSneakers} from '../components/Card/CardSneakers';

const Home: FC<any> = ({
  sneakers,
  searchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  onClearSearchInput,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredSneakers = sneakers.filter((elem: any) =>
      elem.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [...Array(8)] : filteredSneakers).map(
      (item: any, index: any) => (
        <CardSneakers
          key={index}
          onAddToCart={obj => onAddToCart(obj)}
          onAddToFavorite={obj => onAddToFavorite(obj)}
          loading={isLoading}
          {...item}
        />
      ),
    );
  };

  return (
    <div className="content p-40 ">
      <div className="d-flex justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              className="removeBtn cu-p clear"
              src="/img/btn-remove.svg"
              alt="Clear"
              onClick={onClearSearchInput}
            />
          )}
          <input
            type="text"
            placeholder="Поиск..."
            onChange={onChangeSearchInput}
            value={searchValue}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap mt-25">{renderItems()}</div>
    </div>
  );
};

export default Home;
