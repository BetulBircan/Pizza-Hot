export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const index = state.items.findIndex((item) => item.id === action.item.id);

      const updatedCartItems = [...state.items];

      //index > -1 : eğer index -1 den büyükse, yani item zaten cartta var demektir. O zaman quantity arttırılacak. Yoksa yeni item eklenecek.
      if (index > -1) {
        const existingItem = state.items[index];

        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        updatedCartItems[index] = updatedItem;
      } else {
        updatedCartItems.push({ ...action.item, quantity: 1 });
      }

      return {
        ...state,
        items: updatedCartItems,
      };
    }

    case "REMOVE_ITEM": {
      const index = state.items.findIndex((item) => item.id == action.id);

      const existingItem = state.items[index];
      const updateItems = [...state.items];

      if(existingItem.quantity === 1) {
        updateItems.splice(existingItem, 1)
      } else {
        const updatedItem = {...existingItem, quantity : existingItem.quantity - 1}
        updateItems[index] = updatedItem;
      }
      return {...state, items : updateItems}
    }

    case "UPDATE_ITEM":
      return {};
    case "CLEAR_CART":
      return {};

    default:
      return state;
  }
}
