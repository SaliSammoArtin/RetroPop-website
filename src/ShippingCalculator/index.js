import ShippingService from "./ShippingService.js";

export default {
  Shipping: new ShippingService(),
  ShippingDescriptor: ShippingService.descriptor,
};