import Form from "./Form";
import customerInfoDescriptor from "../forms/customerInfoDescriptor.js";

export default function CustomerInfoForm({ onSubmit, sendButtonLabel = "Continue" }) {

  return (
    <Form
      descriptor={customerInfoDescriptor}
      onSubmit={onSubmit}
      sendButtonLabel={sendButtonLabel}
    />
  );
}