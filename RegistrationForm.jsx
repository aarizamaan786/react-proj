// src/RegistrationForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  countryCode: "+91",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhaar: "",
};

export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  // Basic validators
  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "First name is required";
    }

    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "Last name is required";
    }

    if ("username" in fieldValues) {
      temp.username = fieldValues.username ? "" : "Username is required";
    }

    if ("email" in fieldValues) {
      if (!fieldValues.email) {
        temp.email = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        temp.email = emailRegex.test(fieldValues.email)
          ? ""
          : "Enter a valid email";
      }
    }

    if ("password" in fieldValues) {
      if (!fieldValues.password) {
        temp.password = "Password is required";
      } else if (fieldValues.password.length < 6) {
        temp.password = "Password must be at least 6 characters";
      } else {
        temp.password = "";
      }
    }

    if ("countryCode" in fieldValues) {
      temp.countryCode = fieldValues.countryCode ? "" : "Code required";
    }

    if ("phone" in fieldValues) {
      if (!fieldValues.phone) {
        temp.phone = "Phone number is required";
      } else {
        const phoneRegex = /^[0-9]{7,15}$/;
        temp.phone = phoneRegex.test(fieldValues.phone)
          ? ""
          : "Phone must be 7–15 digits";
      }
    }

    if ("country" in fieldValues) {
      temp.country = fieldValues.country ? "" : "Country is required";
    }

    if ("city" in fieldValues) {
      temp.city = fieldValues.city ? "" : "City is required";
    }

    if ("pan" in fieldValues) {
      if (!fieldValues.pan) {
        temp.pan = "PAN is required";
      } else {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        temp.pan = panRegex.test(fieldValues.pan)
          ? ""
          : "PAN must be 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)";
      }
    }

    if ("aadhaar" in fieldValues) {
      if (!fieldValues.aadhaar) {
        temp.aadhaar = "Aadhaar is required";
      } else {
        const aadhaarRegex = /^[0-9]{12}$/;
        temp.aadhaar = aadhaarRegex.test(fieldValues.aadhaar)
          ? ""
          : "Aadhaar must be 12 digits";
      }
    }

    setErrors(temp);
  };

  useEffect(() => {
    validate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    // form is valid if all fields have no errors and are non-empty
    const noErrors = Object.values(errors).every((e) => !e);
    const allFilled = Object.values(values).every((v) => v !== "");
    setIsFormValid(noErrors && allFilled);
  }, [errors, values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "pan" ? value.toUpperCase() : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate({ [name]: values[name] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    validate(values);

    if (isFormValid) {
      navigate("/summary", { state: { formData: values } });
    }
  };

  const getFieldClass = (fieldName) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return hasError ? "input-field input-error" : "input-field";
  };

  return (
    <div className="page-container">
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h1 className="form-title">React Registration Form</h1>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={getFieldClass("firstName")}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Rahul"
            />
            {touched.firstName && errors.firstName && (
              <p className="error-text">{errors.firstName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={getFieldClass("lastName")}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Sharma"
            />
            {touched.lastName && errors.lastName && (
              <p className="error-text">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">
            Username <span className="required">*</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={getFieldClass("username")}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Choose a username"
          />
          {touched.username && errors.username && (
            <p className="error-text">{errors.username}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={getFieldClass("email")}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
          />
          {touched.email && errors.email && (
            <p className="error-text">{errors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={getFieldClass("password")}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Minimum 6 characters"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.password && errors.password && (
            <p className="error-text">{errors.password}</p>
          )}
        </div>

        <div className="form-group">
          <label>
            Phone No + Country Code <span className="required">*</span>
          </label>
          <div className="phone-row">
            <select
              name="countryCode"
              className={getFieldClass("countryCode")}
              value={values.countryCode}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+971">+971 (UAE)</option>
            </select>
            <input
              name="phone"
              type="tel"
              className={getFieldClass("phone")}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Phone number"
            />
          </div>
          <div className="phone-errors">
            {touched.countryCode && errors.countryCode && (
              <p className="error-text">{errors.countryCode}</p>
            )}
            {touched.phone && errors.phone && (
              <p className="error-text">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="country">
              Country <span className="required">*</span>
            </label>
            <input
              id="country"
              name="country"
              type="text"
              className={getFieldClass("country")}
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. India"
            />
            {touched.country && errors.country && (
              <p className="error-text">{errors.country}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className={getFieldClass("city")}
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Mumbai"
            />
            {touched.city && errors.city && (
              <p className="error-text">{errors.city}</p>
            )}
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="pan">
              PAN <span className="required">*</span>
            </label>
            <input
              id="pan"
              name="pan"
              type="text"
              maxLength={10}
              className={getFieldClass("pan")}
              value={values.pan}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="ABCDE1234F"
            />
            {touched.pan && errors.pan && (
              <p className="error-text">{errors.pan}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="aadhaar">
              Aadhaar <span className="required">*</span>
            </label>
            <input
              id="aadhaar"
              name="aadhaar"
              type="text"
              maxLength={12}
              className={getFieldClass("aadhaar")}
              value={values.aadhaar}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="12 digit Aadhaar"
            />
            {touched.aadhaar && errors.aadhaar && (
              <p className="error-text">{errors.aadhaar}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid}
        >
          Submit
        </button>

        {!isFormValid && (
          <p className="hint-text">
            Fill all required fields correctly to enable submit.
          </p>
        )}
      </form>
    </div>
  );
}
