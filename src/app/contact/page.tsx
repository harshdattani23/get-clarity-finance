import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          For any inquiries, please reach out to us at <a href="mailto:support@getclarity.finance" className="text-blue-600 hover:underline">support@getclarity.finance</a>.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
