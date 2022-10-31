//Redux
const collectionsEndpoint = 'collections';
const topsEndpoint = 'collections/tops';
const bottomsEndpoint = 'collections/bottoms';
const outerwearsEndpoint = 'collections/outerwears';
const accessoriesEndpoint = 'collections/accessories';
const newArrivalEndpoint = 'collections/new-arrivals';
const FETCHED_COLLECTIONS = 'FETCHED_COLLECTIONS';
const ADD_COLLECTIONS = 'FETCHED_COLLECTIONS';
const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT';
const SET_PAGE = 'SET_PAGE';
const SET_CART_COUNT = 'SET_CART_COUNT';
const SET_CART_STORE = 'SET_CART_STORE';
const SET_PRODUCT_CART_PRICE = 'SET_PRODUCT_CART_PRICE';
const SET_CART_TOTAL_PRICE = 'SET_CART_TOTAL_PRICE';
const SET_TOTAL = 'SET_TOTAL';
//Checkout & Payment
const SET_CUSTOMER = 'SET_CUSTOMER';
const SET_METHOD = 'SET_METHOD';
// AUTH
const SET_USER = 'SET_USER';

// Others

const searchInput = true;
const pendingBill = 'PENDING';
const deliveryBill = 'DELIVERY';
const successFulDeliveryConfirmation = 'SUCCESSFUL_DELIVERY_CONFIRMATION';
const failedDeliveryConfirmation = 'FAILED_DELIVERY_CONFIRMATION';
const cancelBill = 'CANCEL_BILL';
//ADMIN

const SET_DATA_DASHBOARD = 'SET_DATA_DASHBOARD';

export const SET_NAV_HEIGHT = 'SET_NAV_HEIGHT';
export {
    pendingBill,
    deliveryBill,
    successFulDeliveryConfirmation,
    failedDeliveryConfirmation,
    cancelBill,
    collectionsEndpoint,
    topsEndpoint,
    bottomsEndpoint,
    outerwearsEndpoint,
    accessoriesEndpoint,
    newArrivalEndpoint,
    FETCHED_COLLECTIONS,
    ADD_COLLECTIONS,
    SET_SEARCH_INPUT,
    SET_PAGE,
    SET_CART_COUNT,
    SET_CART_STORE,
    searchInput,
    SET_PRODUCT_CART_PRICE,
    SET_CART_TOTAL_PRICE,
    SET_USER,
    SET_CUSTOMER,
    SET_METHOD,
    SET_DATA_DASHBOARD,
    SET_TOTAL,
};
