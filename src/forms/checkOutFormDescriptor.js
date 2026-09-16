import customerInfoDescriptor from './customerInfoDescriptor';
import moduleMaker from '../modules/moduleMaker';


export default {
  ...customerInfoDescriptor,
  ...moduleMaker.ShippingDescriptor

}