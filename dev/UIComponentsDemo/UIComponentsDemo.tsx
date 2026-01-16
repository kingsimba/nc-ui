import { useState, useEffect } from 'react';
import { runningAppsStore } from '../../src/lib/runningAppsStore';
import { Tabs } from '../../src/components/Tabs';
import { useViewport } from '../../src/contexts/ViewportContext';
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
import { AppDialogSection } from './sections/AppDialogSection';
import { NavStackSection } from './sections/NavStackSection';
import { YamlTextAreaSection } from './sections/YamlTextAreaSection';
import { StylesSection } from './sections/StylesSection';
import { NotificationSection } from './sections/NotificationSection';
import './UIComponentsDemo.css';

type SectionId = 'styles' | 'buttons' | 'activity' | 'checkbox' | 'combobox' | 'buttons-icon' |
  'hyperlink' | 'alert' | 'battery' | 'context-menu' | 'button-group' | 'input' |
  'number-input' | 'slider' | 'toggle' | 'multi-select' | 'icons' | 'tabs' |
  'list-group' | 'dialog' | 'app-dialog' | 'nav-stack' | 'yaml-textarea' | 'notification';

interface Section {
  id: SectionId;
  label: string;
  component: React.ComponentType<any>;
}

export interface UIComponentsRef {
  setTab: (tabId: SectionId) => void;
}

export function UIComponentsDemo() {
  const [activeSection, setActiveSection] = useState<SectionId>('styles');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { isMobile } = useViewport();

  const sections: Section[] = [
    { id: 'styles', label: 'Styles', component: StylesSection },
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
    { id: 'app-dialog', label: 'AppDialog', component: AppDialogSection },
    { id: 'nav-stack', label: 'NavStack', component: NavStackSection },
    { id: 'yaml-textarea', label: 'YamlTextArea', component: YamlTextAreaSection },
    { id: 'notification', label: 'Notification', component: NotificationSection },
  ];


  // Register ref with runningAppsStore
  useEffect(() => {
    runningAppsStore.setAppRef('ui-components', {
      setTab: (tabId: SectionId) => {
        // Validate tab exists
        if (sections.some(s => s.id === tabId)) {
          setActiveSection(tabId);
        }
      },
    });
  }, []);

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;
  const textSections = ['nav-stack', 'yaml-textarea', 'styles', 'dialog', 'app-dialog', 'tabs', 'buttons', 'notification'];

  return (
    <div className={`ui-components-app ${!isMobile ? 'desktop' : ''}`}>
      {/* Tab navigation */}
      <Tabs
        tabs={sections.map(s => s.label)}
        active={sections.find(s => s.id === activeSection)?.label || ''}
        onChange={(label) => {
          const section = sections.find(s => s.label === label);
          if (section) setActiveSection(section.id);
        }}
        orientation={!isMobile ? 'verticalLeft' : 'horizontal'}
      />

      {/* Content area */}
      <div className="ui-content" style={{ backgroundColor: textSections.includes(activeSection) ? 'var(--nc-bg-text)' : undefined }}>
        {ActiveComponent && activeSection === 'list-group' ? (
          <ListGroupSection theme={theme} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        ) : (
          ActiveComponent && <ActiveComponent />
        )}
      </div>
    </div>
  );
}
