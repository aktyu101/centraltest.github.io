import React, { useState } from 'react';
import Button, { ButtonProps } from '../components/Button';
import Icon, { IconName } from '../components/Icon';
import Tabs from '../components/Tabs';

const ICONS: IconName[] = [
  'Add', 'Edit', 'Delete', 'Check', 'Print', 'Message', 'Settings', 'Download',
  'Record', 'Image', 'Pdf', 'Attach', 'Zip', 'View', 'Search', 'Reset', 'Calendar',
  'Info', 'BedSore', 'Desire', 'Create', 'Cognition', 'Fall'
];

export const ComponentPlayground: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<'Button' | 'Tabs' | 'Icon'>('Button');

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Component Playground</h1>
      
      <div className="mb-8 bg-white shadow-sm border border-gray-200 rounded-t-xl overflow-hidden">
        <Tabs 
          options={['Button', 'Tabs', 'Icon']} 
          value={activeComponent} 
          onChange={(v) => setActiveComponent(v as any)} 
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {activeComponent === 'Button' && <ButtonPlayground />}
        {activeComponent === 'Tabs' && <TabsPlayground />}
        {activeComponent === 'Icon' && <IconPlayground />}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Button Playground
// -------------------------------------------------------------
const TYPES: ButtonProps['type'][] = ['Primary', 'Sub', 'Orange', 'Danger', 'Ghost', 'File'];
const SIZES: ButtonProps['size'][] = ['Small', 'Medium', '36', 'Large'];
const STATES = ['Default', 'Disabled'] as const;

const ButtonPlayground: React.FC = () => {
  const [type, setType] = useState<ButtonProps['type']>('Primary');
  const [size, setSize] = useState<ButtonProps['size']>('Medium');
  const [btnState, setBtnState] = useState<typeof STATES[number]>('Default');
  const [icon, setIcon] = useState<IconName | 'None'>('None');
  const isDisabled = btnState === 'Disabled';

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${type === t ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
          <div className="flex flex-wrap gap-2">
            {SIZES.map(s => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${size === s ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
          <div className="flex flex-wrap gap-2">
            {STATES.map(st => (
              <button key={st} onClick={() => setBtnState(st)} className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${btnState === st ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>{st}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Optional)</label>
          <select value={icon} onChange={(e) => setIcon(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500">
            <option value="None">None</option>
            {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>
      <div className="flex-1 border-l border-gray-200 pl-8 flex flex-col justify-center items-center bg-gray-50/50 rounded-r-xl relative">
        <p className="text-sm text-gray-500 mb-8 font-medium absolute top-4 left-4">Preview</p>
        <div className="p-8 border border-dashed border-gray-300 rounded-xl bg-white flex items-center justify-center min-w-[200px] min-h-[120px] mb-8 mt-12">
          <Button type={type} size={size} disabled={isDisabled} icon={icon !== 'None' ? <Icon name={icon as IconName} /> : undefined} onClick={() => alert('Clicked!')}>
            {type} Button
          </Button>
        </div>
        <div className="w-full bg-gray-800 rounded-xl p-4 shadow-sm overflow-x-auto text-sm text-gray-300 font-mono">
          <pre><code>{`<Button\n  type="${type}"\n  size="${size}"${isDisabled ? '\n  disabled' : ''}${icon !== 'None' ? `\n  icon={<Icon name="${icon}" />}` : ''}\n>\n  ${type} Button\n</Button>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Tabs Playground
// -------------------------------------------------------------
const TabsPlayground: React.FC = () => {
  const [tabOptions, setTabOptions] = useState<string>('Tab A, Tab B, Tab C');
  const [activeTab, setActiveTab] = useState<string>('Tab A');
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [tabType, setTabType] = useState<'No Background' | 'Background'>('No Background');
  
  const optionsList = tabOptions.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Options (comma separated)</label>
          <input 
            type="text" 
            value={tabOptions}
            onChange={(e) => {
              setTabOptions(e.target.value);
              const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
              if (list.length > 0 && !list.includes(activeTab)) setActiveTab(list[0]);
            }}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
          <div className="flex flex-wrap gap-2">
            {(['No Background', 'Background'] as const).map(t => (
              <button 
                key={t} 
                onClick={() => setTabType(t)} 
                className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${tabType === t ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'bg-white border-gray-300 hover:bg-gray-50'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-gray-300"/>
            <span className="text-sm font-semibold text-gray-700">Full Width (flex-1)</span>
          </label>
        </div>
      </div>
      <div className="flex-1 border-l border-gray-200 pl-8 flex flex-col justify-center items-center bg-gray-50/50 rounded-r-xl relative">
        <p className="text-sm text-gray-500 mb-8 font-medium absolute top-4 left-4">Preview</p>
        <div className="w-full border border-dashed border-gray-300 rounded-xl bg-white flex items-center justify-center p-8 mb-8 mt-12">
          {optionsList.length > 0 ? (
             <div className="w-full max-w-md">
               <Tabs options={optionsList} value={activeTab} onChange={setActiveTab} fullWidth={fullWidth} type={tabType} />
               <div className="p-4 text-sm text-gray-500 text-center mt-4">Selected: <strong>{activeTab}</strong></div>
             </div>
          ) : <p className="text-sm text-gray-400">Please add options</p>}
        </div>
        <div className="w-full bg-gray-800 rounded-xl p-4 shadow-sm overflow-x-auto text-sm text-gray-300 font-mono">
          <pre><code>{`<Tabs \n  options={['${optionsList.join("', '")}']}\n  value="${activeTab}"\n  onChange={setActiveTab}${fullWidth ? '\n  fullWidth' : ''}${tabType === 'Background' ? "\n  type=\"Background\"" : ''}\n/>`}</code></pre>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Icon Playground
// -------------------------------------------------------------
const IconPlayground: React.FC = () => {
  const [size, setSize] = useState<number>(24);
  const [colorClass, setColorClass] = useState<string>('text-gray-800');

  const colorOptions = [
    { label: 'Gray 800', value: 'text-gray-800' },
    { label: 'Blue 500', value: 'text-blue-500' },
    { label: 'Red 500', value: 'text-red-500' },
    { label: 'Green 500', value: 'text-green-500' },
    { label: 'Orange (Navy)', value: 'text-[var(--color-orange-500)]' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Size: {size}px</label>
          <input type="range" min="12" max="64" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Test Color</label>
          <div className="flex flex-wrap gap-2">
             {colorOptions.map(c => (
                <button key={c.value} onClick={() => setColorClass(c.value)} className={`w-6 h-6 rounded-full border shadow-sm ${c.value} bg-current`}></button>
             ))}
             <span className="text-sm ml-2 self-center text-gray-500">(using currentColor)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {ICONS.map(i => (
          <div key={i} className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 cursor-pointer transition-colors group">
            <div className={`mb-3 ${colorClass} transition-colors`}>
              <Icon name={i} size={size} />
            </div>
            <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentPlayground;
