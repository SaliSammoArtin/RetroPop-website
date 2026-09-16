import { useState } from "react";

export default function useFormDescriptor(descriptor) {

  const initialData = {
  };
  for (const key in descriptor) {
    initialData[key] = descriptor[key].initialValue ?? '';
  }

  const [formData, setFormData] = useState(initialData);

  function handleChange(key, value) {
    setFormData(prev => ({ ...prev, [key]: value }));

  }

  const fields = Object.entries(descriptor).map(([key, field]) => (
    <div key={key}>
      <label htmlFor={key}>{field.label}</label>
      <input
        id={key}
        type={field.type || 'text'}
        value={formData[key]}
        required={field.required}
        onChange={e => handleChange(key, e.target.value)}
      />
    </div>
  ));

  return [fields, formData]
}