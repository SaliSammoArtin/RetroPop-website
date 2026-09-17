import { useState } from "react";

export default function useFormDescriptor(descriptor) {
  const initialData = {};
  for (const key in descriptor) {
    initialData[key] = descriptor[key].initialValue ?? "";
  }

  const [formData, setFormData] = useState(initialData);

  function handleChange(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const fields = Object.entries(descriptor).map(([key, field]) => (
    <div key={key} className="flex flex-col gap-1">
      <label
        htmlFor={key}
        className="capitalize font-black tracking-wide text-retro-cream-bg">
        {field.label}
      </label>
      <input
        id={key}
        type={field.type || "text"}
        value={formData[key]}
        required={field.required}
        onChange={(e) => handleChange(key, e.target.value)}
        className="rounded-xl bg-retro-cream-bg text-retro-dark-text border-2 border-retro-yellow-highlight px-4 py-2 outline-none focus:border-retro-orange-bg transition-colors"
      />
    </div>
  ));

  return [fields, formData];
}
