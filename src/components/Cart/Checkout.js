import classes from './Checkout.module.css';
import { useRef , useState } from 'react';

const isEmpty = (value) =>  value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputValidty, setFormInputValidty] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });


        const nameInputRef = useRef();
        const streetInputRef = useRef();
        const postalCodeInputRef = useRef();
        const cityInputRef = useRef();

       

  const confirmHandler = (event) => {
    event.preventDefault();
      const enteredName = nameInputRef.current.value;
      const enteredStreet = streetInputRef.current.value;
      const enteredPostalCode = postalCodeInputRef.current.value;
      const enteredCity = cityInputRef.current.value;

    
      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredStreetIsValid = !isEmpty(enteredStreet);
      const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
      const enteredCityIsValid = !isEmpty(enteredCity);

      setFormInputValidty({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
          city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid

    });


      const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

      if(!formIsValid) {
            return;
      }

      props.onConfirm({
          name: enteredName,
          street: enteredStreet,
          city: enteredCity,
          postalCode: enteredPostalCode,
      })
    
  };

    const nameControlClasses = `${classes.control} ${formInputValidty.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidty.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputValidty.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidty.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidty.name && <p>Please enter a Valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidty.street && <p>Please enter a Valid Street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidty.postalCode && <p>Please enter a Valid Postal Code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidty.city && <p>Please enter a Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;