import useFormDescriptor from "../Utils/useFormDescriptor.jsx";

export default function Form({ descriptor, onSubmit, sendButtonLabel = "Send" }) {

  const [fields, formData] = useFormDescriptor(descriptor);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }



  return (
    <form onSubmit={handleSubmit}>
      {fields}
      <button type="submit">{sendButtonLabel}</button>
    </form>
  );
}









