import React from 'react';
import { Check, Monitor, Send } from 'lucide-react';
import { daisyThemes, useThemeStore } from '../store/useThemeStore';

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const previewSwatches = {
  light: ['#570df8', '#f000b8', '#37cdbe', '#ffffff'],
  dark: ['#661ae6', '#d926a9', '#1fb2a5', '#191d24'],
  cupcake: ['#65c3c8', '#ef9fbc', '#eeaf3a', '#291334'],
  bumblebee: ['#e0a82e', '#f9d72f', '#181830', '#ffffff'],
  emerald: ['#66cc8a', '#377cfb', '#ea5234', '#ffffff'],
  corporate: ['#4b6bfb', '#7b92b2', '#181a2a', '#ffffff'],
  synthwave: ['#e779c1', '#58c7f3', '#f3cc30', '#2d1b69'],
  retro: ['#ef9995', '#a4cbb4', '#ebdc99', '#ece3ca'],
  cyberpunk: ['#ff7598', '#75d1f0', '#c07eec', '#ffee00'],
  valentine: ['#e96d7b', '#a991f7', '#88dbdd', '#f0d6e8'],
  halloween: ['#f28c18', '#6d3a9c', '#51a800', '#212121'],
  garden: ['#ecf4e7', '#5c7f67', '#fae5e5', '#e5ede0'],
  forest: ['#1eb854', '#1db88e', '#1fd65f', '#171212'],
  aqua: ['#09ecf3', '#966fb3', '#ffe999', '#345da7'],
  lofi: ['#0d0d0d', '#1a1a1a', '#2a2a2a', '#ffffff'],
  pastel: ['#d1c1d7', '#f6cbd1', '#b4e9d6', '#fce1ae'],
  fantasy: ['#6e0b75', '#007ebd', '#f8860d', '#ffffff'],
  wireframe: ['#b8b8b8', '#d6d6d6', '#ebebeb', '#ffffff'],
  black: ['#343232', '#333333', '#000000', '#ffffff'],
  luxury: ['#ffffff', '#152747', '#513448', '#09090b'],
  dracula: ['#ff79c6', '#bd93f9', '#8be9fd', '#282a36'],
  cmyk: ['#45aeee', '#e8488a', '#e1d562', '#1f2937'],
  autumn: ['#8c0327', '#d85251', '#f9c06a', '#f1f1f1'],
  business: ['#1c4e80', '#7c909a', '#ea6947', '#202020'],
  acid: ['#ff00ff', '#ffff00', '#00ffcc', '#ffffff'],
  lemonade: ['#519903', '#e9e92f', '#ff6b35', '#ffffff'],
  night: ['#38bdf8', '#818cf8', '#c084fc', '#0f172a'],
  coffee: ['#c79b67', '#7a4c1e', '#4b2e05', '#20161f'],
  winter: ['#047aff', '#463aa2', '#c148ac', '#e9f2ff'],
  dim: ['#9ca3af', '#d1d5db', '#60a5fa', '#252525'],
  nord: ['#5e81ac', '#81a1c1', '#88c0d0', '#eceff4'],
  sunset: ['#ff6f91', '#ff9671', '#ffc75f', '#2a1f3d'],
};

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-100 px-4 py-10 text-base-content">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Theme</h1>
          <p className="mt-2 text-sm opacity-70">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {daisyThemes.map((item) => {
            const isActive = theme === item;
            const colors = previewSwatches[item] || previewSwatches.night;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={`rounded-2xl border p-3 text-left transition-all ${
                  isActive
                    ? 'border-primary bg-primary/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_35%,transparent)]'
                    : 'border-base-300 bg-base-200 hover:border-primary/40 hover:bg-base-300'
                }`}
              >
                <div className="mb-3 flex rounded-xl border border-base-300 bg-base-100 p-1">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className="h-6 flex-1 rounded-md"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium capitalize">
                    {item}
                  </span>
                  {isActive && <Check size={16} className="text-primary" />}
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Preview</h2>
          <p className="mt-2 text-sm opacity-70">
            See how messages and surfaces look before you leave this page
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200">
          <div className="bg-base-200 p-4 sm:p-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-base-300 bg-base-100 shadow-2xl">
              <div className="border-b border-base-300 p-4">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content w-12 rounded-full">
                      <span>J</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-base-content">John Doe</p>
                    <p className="text-sm text-success">Online</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`chat ${message.isSent ? 'chat-end' : 'chat-start'}`}
                  >
                    <div className={`chat-bubble ${message.isSent ? 'chat-bubble-primary' : ''}`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-base-300 p-4">
                <div className="flex items-center gap-3">
                  <div className="input input-bordered flex-1">
                    <span className="opacity-60">This is a preview</span>
                  </div>
                  <button className="btn btn-primary btn-square" type="button">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-200 p-5 text-sm opacity-80">
          <div className="flex items-start gap-3">
            <Monitor size={18} className="mt-0.5 text-primary" />
            <p>
              Your selected theme is saved in local storage, so it stays the same when
              you refresh or come back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
