import { useState, forwardRef, useImperativeHandle } from 'react';
import { ButtonSection } from './sections/ButtonSection';
import { IconsSection } from './sections/IconsSection';
import { ListGroupSection } from './sections/ListGroupSection';
import { TabsSection } from './sections/TabsSection';
import { DialogSection } from './sections/DialogSection';
import { ActivityIndicatorSection } from './sections/ActivityIndicatorSection';
import { CheckboxSection } from './sections/CheckboxSection';
import { ComboBoxSection } from './sections/ComboBoxSection';
import { IconButtonsSection } from './sections/IconButtonsSection';
import { HyperlinkSection } from './sections/HyperlinkSection';
import { AlertSection } from './sections/AlertSection';
import { BatterySection } from './sections/BatterySection';
import { ContextMenuSection } from './sections/ContextMenuSection';
import { ButtonGroupSection } from './sections/ButtonGroupSection';
import { InputSection } from './sections/InputSection';
import { NumberInputSection } from './sections/NumberInputSection';
import { SliderSection } from './sections/SliderSection';
import { ToggleSection } from './sections/ToggleSection';
import { MultiSelectSection } from './sections/MultiSelectSection';
import './UIComponents.css';

type SectionId = 'buttons' | 'activity' | 'checkbox' | 'combobox' | 'buttons-icon' |
  'hyperlink' | 'alert' | 'battery' | 'context-menu' | 'button-group' | 'input' |
  'number-input' | 'slider' | 'toggle' | 'multi-select' | 'icons' | 'tabs' |
  'list-group' | 'dialog';

interface Section {
  id: SectionId;
  label: string;
  component: React.ComponentType<any>;
}

export interface UIComponentsRef {
  setTab: (tabId: SectionId) => void;
}

export const UIComponents = forwardRef<UIComponentsRef>((props, ref) => {
  const [activeSection, setActiveSection] = useState<SectionId>('buttons');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const sections: Section[] = [
    { id: 'buttons', label: 'Button', component: ButtonSection },
    { id: 'activity', label: 'ActivityIndicator', component: ActivityIndicatorSection },
    { id: 'checkbox', label: 'Checkbox', component: CheckboxSection },
    { id: 'combobox', label: 'ComboBox', component: ComboBoxSection },
    { id: 'buttons-icon', label: 'Icon Buttons', component: IconButtonsSection },
    { id: 'hyperlink', label: 'Hyperlink', component: HyperlinkSection },
    { id: 'alert', label: 'Alert', component: AlertSection },
    { id: 'battery', label: 'Battery', component: BatterySection },
    { id: 'context-menu', label: 'ContextMenu', component: ContextMenuSection },
    { id: 'button-group', label: 'ButtonGroup', component: ButtonGroupSection },
    { id: 'input', label: 'Input', component: InputSection },
    { id: 'number-input', label: 'NumberInput', component: NumberInputSection },
    { id: 'slider', label: 'Slider', component: SliderSection },
    { id: 'toggle', label: 'Toggle', component: ToggleSection },
    { id: 'multi-select', label: 'MultiSelect', component: MultiSelectSection },
    { id: 'icons', label: 'Icons', component: IconsSection },
    { id: 'tabs', label: 'Tabs', component: TabsSection },
    { id: 'list-group', label: 'ListGroup', component: ListGroupSection },
    { id: 'dialog', label: 'Dialog', component: DialogSection },
  ];

  // Expose setTab method via ref
  useImperativeHandle(ref, () => ({
    setTab: (tabId: SectionId) => {
      // Validate tab exists
      if (sections.some(s => s.id === tabId)) {
        setActiveSection(tabId);
      }
    },
  }));

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <div className="ui-components-app">
      {/* Sidebar navigation */}
      <aside className="ui-nav-sidebar">
        {sections.map(section => (
          <button
            key={section.id}
            className={`ui-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </aside>

      {/* Content area */}
      <div className="ui-content">
        {ActiveComponent && activeSection === 'list-group' ? (
          <ListGroupSection theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        ) : (
          ActiveComponent && <ActiveComponent />
        )}
      </div>
    </div>
  );
});
