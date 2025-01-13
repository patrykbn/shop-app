const initialState = {
    cart: {
        products: [],
        itemsInCart: 0, // changed from array to number
        totalCost: 0, // changed from array to number
    },
    categories: {
      data: [],
      request: {
        pending: false,
        error: null,
        success: false,
      },
   },
   products: {
      data: [],
      request: {
        pending: false,
        error: null,
        success: false,
      },
   },
    orders: {
        data: [],
        request: {
          pending: false,
          error: null,
          success: false,
        },
    },
    clients: {
        data: [],
        request: {
          pending: false,
          error: null,
          success: false,
        },
    },
    productImages: {
        data: [],
        request: {
            pending: false,
            error: null,
            success: false,
        },
    },
};

export default initialState;