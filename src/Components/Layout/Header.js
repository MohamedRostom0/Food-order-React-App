import classes from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="A table full of food"></img>
      </div>
    </>
  );
};

export default Header;
