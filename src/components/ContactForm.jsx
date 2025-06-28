import React, { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio.';
    if (!form.email.trim()) errs.email = 'El email es obligatorio.';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      errs.email = 'El email no es válido.';
    if (!form.message.trim()) errs.message = 'El mensaje es obligatorio.';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSent(true);
    setForm(initialState);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 rounded-2xl p-8 shadow-lg max-w-lg mx-auto flex flex-col gap-5"
      noValidate
    >
      <h2 className="text-2xl font-bold mb-2 text-white">Contacto</h2>
      <div>
        <label className="block text-neutral-300 mb-1" htmlFor="name">Nombre</label>
        <input
          className={`w-full px-4 py-2 rounded bg-neutral-900 text-neutral-100 border ${errors.name ? 'border-red-500' : 'border-neutral-700'} focus:outline-none`}
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-neutral-300 mb-1" htmlFor="email">Email</label>
        <input
          className={`w-full px-4 py-2 rounded bg-neutral-900 text-neutral-100 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} focus:outline-none`}
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-neutral-300 mb-1" htmlFor="message">Mensaje</label>
        <textarea
          className={`w-full px-4 py-2 rounded bg-neutral-900 text-neutral-100 border ${errors.message ? 'border-red-500' : 'border-neutral-700'} focus:outline-none`}
          name="message"
          id="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="mt-2 px-6 py-2 rounded-full bg-primary text-white font-semibold shadow transition duration-200 hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
      >
        Enviar
      </button>
      {sent && (
        <div className="text-green-400 text-center mt-2">
          ¡Mensaje enviado correctamente!
        </div>
      )}
    </form>
  );
}