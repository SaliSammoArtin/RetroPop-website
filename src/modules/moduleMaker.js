// tex import UserHandlerModule from './UserHandler/UserHandlerModule';

export default {

  Shipping: new ShippingService(),
  ShippingDescriptor: ShippingService.descriptor,
  CampaignModule: new CampaignModule(),
  CampaignModuleDescriptor: CampaignModule.descriptor,
  Inventory: new Inventory(),
  InventoryDescriptor: Inventory.descriptor,
  // UserHandler: new UserHandlerModule(),
  // UserHandlerDescriptor: UserHandlerModule.descriptor,

  /* more modules and descriptors can be added here */
};