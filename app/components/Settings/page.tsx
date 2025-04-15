'use client'
import React, { useState } from 'react';

interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: 'en' | 'es' | 'fr';
}

const DefaultSettingsComponent: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    notifications: true,
    language: 'en',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    const target = e.target as HTMLInputElement; // Type assertion for checkbox

    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? target.checked : target.value,
    }));
  };

  const handleReset = () => {
    setSettings({
      theme: 'light',
      notifications: true,
      language: 'en',
    });
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('Settings have been saved successfully!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Default Settings</h1>

      <form className="space-y-4">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
            Theme
          </label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label htmlFor="notifications" className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={settings.notifications}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
          </label>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default DefaultSettingsComponent;