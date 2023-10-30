/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
import { getData } from "./db/db";
const foods = getData();

const botToken = "5918611696:AAFxqlcvrKJJWA1G5VsBYf_PQ0edM8uGK6Y";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userChatId, setUserChatId] = useState(null);

  useEffect(() => {
    if (window.Telegram) {
      const tele = window.Telegram.WebApp;
      tele.ready();
      tele.enableClosingConfirmation();

      if (tele.initDataUnsafe) {
        setUserChatId(tele.initDataUnsafe.user.id);

        console.log(userChatId);
      } else {
        console.error("Telegram initDataUnsafe is not available.");
      }
    } else {
      console.error("Telegram WebApp is not available.");
    }
  }, []);

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);

    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  // const onCheckout = () => {
  //   // Check if Telegram WebApp is available
  //   if (Telegram && Telegram.WebApp) {
  //     const tele = Telegram.WebApp;
  //     tele.MainButton.text = "Pay :)";
  //     tele.MainButton.show();
  //   }
  // };

  const onCheckout = () => {
    if (Telegram && Telegram.WebApp) {
      const tele = Telegram.WebApp;

      tele.MainButton.text = `Pay :) ${userChatId}`;
      tele.MainButton.show();

      // Define a function to format cart items as needed
      const formatCartItems = () => {
        return cartItems
          .map((item) => {
            return `${item.quantity} x ${item.name} - $${
              item.price * item.quantity
            }`;
          })
          .join("\n");
      };

      console.log(tele, "tele");

      tele.MainButton.onClick(() => {
        const formattedCartItems = formatCartItems();
        const message = "ha oxshadi ";

        console.log("Main Buttonga kirdi ");
        console.log(userChatId);

        function sendMessageToUser(message) {
          var data = {
            action: "sendMessage",
            payload: {
              chat_id: userChatId,
              text: message,
            },
          };

          window.Telegram.WebApp.sendData(JSON.stringify(data));
        }
        x;
        sendMessageToUser(message);
        console.log(sendMessageToUser);
      });
    } else {
      console.error("Telegram WebApp is not available.");
    }
  };

  return (
    <>
      <h1 className="heading">Order Food</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}

export default App;
