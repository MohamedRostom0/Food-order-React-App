import classes from "./Checkout.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";

const Checkout = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be less than 20 characters")
        .required("Your name is required"),

      mobile: Yup.string().required("You have to enter your mobile number"),

      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      props.onConfirm(values);

      formik.resetForm();
    },
  });

  // Input classenames
  const nameClasses =
    formik.errors.name && formik.touched.name
      ? `${classes.control} ${classes.invalid}`
      : `${classes.control}`;

  const mobileClasses =
    formik.errors.mobile && formik.touched.mobile
      ? `${classes.control} ${classes.invalid}`
      : `${classes.control}`;

  const addressClasses =
    formik.errors.address && formik.touched.address
      ? `${classes.control} ${classes.invalid}`
      : `${classes.control}`;

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <span>{formik.errors.name}</span>
        )}
      </div>
      <div className={mobileClasses}>
        <label htmlFor="mobile">Mobile number</label>
        <input
          type="tel"
          id="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.mobile && formik.touched.mobile && (
          <span>{formik.errors.mobile}</span>
        )}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.address && formik.touched.address && (
          <span>{formik.errors.address}</span>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
