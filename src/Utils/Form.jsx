import useFormDescriptor from "../Utils/useFormDescriptor.jsx";

export default function Form({ descriptor, onSubmit, sendButtonLabel = "Send", className = "" }) {

  const [fields, formData] = useFormDescriptor(descriptor);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
      {fields}
      <button
        type="submit"
        className="mt-2 rounded-xl bg-retro-orange-bg text-retro-dark-text font-semibold py-2 hover:bg-retro-yellow-highlight transition-colors">
        {sendButtonLabel}
      </button>
    </form>
  );
}









