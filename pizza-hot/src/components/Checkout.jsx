//Sepete Ekledikten sonra sepette sipariş vermek için oluşturulan ekran
import Modal from "./UI/Modal";
import { UIContext } from "../contexts/UIContext";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";
import {
  hasMinLength,
  isEmail,
  isNotEmpty,
  isPhone,
} from "../utils/validations";
import useInput from "../hooks/useInput";
import Input from "./Input";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const {
    value: nameValue,
    handleInputChange: handleNameInputChange,
    handleInputBlur: handleNameInputBlur,
    hasError: nameHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 3));

  const {
    value: emailValue,
    handleInputChange: handleEmailInputChange,
    handleInputBlur: handleEmailInputBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: phoneValue,
    handleInputChange: handlePhoneInputChange,
    handleInputBlur: handlePhoneInputBlur,
    hasError: phoneHasError,
  } = useInput("", (value) => isNotEmpty(value) && isPhone(value));

  const {
    value: addressValue,
    handleInputChange: handleAddressInputChange,
    handleInputBlur: handleAddressInputBlur,
    hasError: addressHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 3));

  const {
    value: cityValue,
    handleInputChange: handleCityInputChange,
    handleInputBlur: handleCityInputBlur,
    hasError: cityHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 3));

  const {
    value: districtValue,
    handleInputChange: handleDistrictInputChange,
    handleInputBlur: handleDistrictInputBlur,
    hasError: districtHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 3));

  const { uiProgress, hideCheckout } = useContext(UIContext);
  const { items, clearCart } = useContext(CartContext);

  const { data, isLoading, error, sendRequest } = useFetch(
    "http://localhost:3000/orders",
    config,
  );

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleClose = () => {
    hideCheckout();
    clearCart();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());

    if (nameHasError || emailHasError || phoneHasError || addressHasError || cityHasError ||districtHasError ) {
      return;
    }

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      }),
    );
  };

  if (data && !error) {
    return (
      <Modal open={uiProgress === "checkout"}>
        <h2>Sipariş Alındı...</h2>
        <button
          onClick={() => handleClose()}
          className="btn btn-sm btn-outline-danger me-2"
        >
          Kapat
        </button>
      </Modal>
    );
  }

  return (
    <Modal open={uiProgress === "checkout"}>
      <h2>Checkout</h2>
      <p className="text-danger">Sipariş Toplam : {cartTotal} ₺</p>

      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <Input
            labelText="Ad Soyad"
            id="name"
            error={nameHasError && "En az 3 harften oluşmalıdır."}
            type="text"
            name="name"
            value={nameValue}
            onChange={handleNameInputChange}
            onBlur={handleNameInputBlur}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <Input
                value={emailValue}
                labelText="Email"
                type="email"
                name="email"
                id="email"
                error={emailHasError && "Email formatında mailinizi giriniz"}
                onChange={handleEmailInputChange}
                onBlur={handleEmailInputBlur}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <Input
                value={phoneValue}
                labelText="Telefon"
                type="text"
                name="phone"
                id="phone"
                error={phoneHasError && "Geçerli telefon numarası giriniz"}
                placeholder="5XX XXX XX XX"
                onChange={handlePhoneInputChange}
                onBlur={handlePhoneInputBlur}
                maxLength="10"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Adres
          </label>
          <textarea
            name="address"
            id="adress"
            className="form-control"
            onChange={handleAddressInputChange}
            onBlur={handleAddressInputBlur}
          ></textarea>
          {addressHasError && (
            <div className="invalid-feedback d-block">
              {/* Enter valid email. */}
              {addressValue == "" && "Adres giriniz"}
              {addressValue.length > 0 &&
                addressValue.length <= 3 &&
                "En az 3 harften oluşmalıdır"}
            </div>
          )}
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <Input
                labelText="Şehir"
                value={cityValue}
                type="text"
                name="city"
                id="city"
                error={cityHasError && "Şehir Giriniz"}
                minLength="3"
                onChange={handleCityInputChange}
                onBlur={handleCityInputBlur}
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <Input
                labelText="Mahalle"
                value={districtValue}
                type="text"
                name="district"
                id="district"
                error={districtHasError && "Mahalle Giriniz"}
                onChange={handleDistrictInputChange}
                onBlur={handleDistrictInputBlur}
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="alert alert-warning">Yükleniyor...</div>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={hideCheckout}
            >
              Kapat
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-outline-success me-2"
            >
              Kaydet
            </button>
          </>
        )}
      </form>
    </Modal>
  );
}
