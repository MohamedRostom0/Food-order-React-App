import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const validateNonEmptyString = (value) => value.trim().length > 0;
  const validate5Chars = (value) => value.trim().length === 5;

  const {
    value: enteredName,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(validateNonEmptyString);

  const {
    value: enteredStreet,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(validateNonEmptyString);

  const {
    value: enteredPostal,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostalInput,
  } = useInput(validate5Chars);

  // Input classenames
  const nameClasses = !nameHasError
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const streetClasses = !streetHasError
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const postalClasses = !postalHasError
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  // form submit handler
  const confirmHandler = (event) => {
    event.preventDefault();

    if (nameHasError || streetHasError || postalHasError) {
      return;
    }

    resetNameInput();
    resetStreetInput();
    resetPostalInput();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <span>Name field cannot be empty</span>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <span>Street field cannot be empty</span>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && <span>Postal code field must be 5 characters</span>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
