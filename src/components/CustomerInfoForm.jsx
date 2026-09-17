import Form from "../Utils/Form.jsx";
import customerInfoDescriptor from "../forms/customerInfoDescriptor.js";

export default function CustomerInfoForm({
  onSubmit,
  sendButtonLabel = "Continue",
}) {
  return (
    <div className="bg-retro-green-text rounded-2xl border-4 border-retro-yellow-highlight p-6">
      <h2 className="text-2xl font-black tracking-wide text-retro-orange-bg mb-4">
        Your details
      </h2>
      <Form
        descriptor={customerInfoDescriptor}
        onSubmit={onSubmit}
        sendButtonLabel={sendButtonLabel}
      />
    </div>
  );
}
