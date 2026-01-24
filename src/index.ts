// Export all UI components from here
export { Alert } from './components/Alert';
export { Battery } from './components/Battery';
export { Button } from './components/Button';
export { ButtonGroup } from './components/ButtonGroup';
export { ActivityIndicator } from './components/ActivityIndicator';
export { Checkbox } from './components/Checkbox';
export { ComboBox } from './components/ComboBox';
export {
  RefreshButton,
  CloseButton,
  EditButton,
  TrashButton,
  Hyperlink,
} from './components/CommonButtons';
export { ContextMenu } from './components/ContextMenu';
export { Dialog, DialogClose, useDialog } from './components/Dialog';
export { Input } from './components/Input';
export { ListGroup, ListGroupItem } from './components/ListGroup';
export { MultiSelect } from './components/MultiSelect';
export { MonthRangePicker } from './components/MonthRangePicker';
export { NumberInput } from './components/NumberInput';
export { Slider } from './components/Slider';
export { Tabs, TabPanel, TabPanels } from './components/Tabs';
export { Toggle } from './components/Toggle';
export { Notification } from './components/Notification';
export { NotificationContainer } from './components/NotificationContainer';
export { notificationManager } from './lib/notificationManager';

// Export types
export type { AlertProps, AlertType } from './components/Alert';
export type { BatteryProps, BatteryStatus } from './components/Battery';
export type {
  ButtonGroupProps,
  ButtonGroupSize,
} from './components/ButtonGroup';
export type { DialogProps, DialogFooterType } from './components/Dialog';
export type { InputProps } from './components/Input';
export type {
  ListGroupProps,
  ListGroupItemProps,
} from './components/ListGroup';
export type { MultiSelectProps } from './components/MultiSelect';
export type { MonthRangePickerProps } from './components/MonthRangePicker';
export type { NumberInputProps } from './components/NumberInput';
export type { SliderProps } from './components/Slider';
export type { TabsProps, TabPanelProps, TabPanelsProps } from './components/Tabs';
export type { ToggleProps } from './components/Toggle';
export type { Notification as NotificationType } from './stores/notificationStore';

// Export types
export type { CheckboxProps, CheckboxSize } from './components/Checkbox';
export type { ComboBoxProps, ComboBoxOption } from './components/ComboBox';
export type {
  ContextMenuProps,
  ContextMenuOption,
} from './components/ContextMenu';

// App-specific i18n factory for isolated instances
export { createAppI18nFactory } from './lib/appI18nFactory';
export type { AppI18nResources } from './lib/appI18nFactory';

// App framework
export { appRegistry } from './lib/appRegistry';
export type { AppDefinition } from './lib/appRegistry';
export { runningAppsStore } from './lib/runningAppsStore';
export type { RunningApp, LaunchAppOptions } from './lib/runningAppsStore';
export { AppContext, useApp } from './components/app/AppContext';
export type { AppContextValue } from './components/app/AppContext';
export { AppContainer } from './components/app/AppContainer';
export { AppPanel } from './components/app/AppPanel';
export type { AppPanelProps } from './components/app/AppPanel';
export { AppTaskbar } from './components/app/AppTaskbar';
export type { AppTaskbarProps } from './components/app/AppTaskbar';
export { AppTitleBar } from './components/app/AppTitleBar';
export { AppDialog } from './components/app/AppDialog';
export type { AppDialogProps } from './components/app/AppDialog';
export {
  NavStackProvider,
  NavStackContainer,
  useNavStack,
  useNavView,
} from './components/NavStack';
export type {
  NavView,
  NavStackContextValue,
  NavViewContextValue,
} from './components/NavStack';

// App framework utilities
export { appStateStore } from './stores/appStateStore';
export { ViewportProvider, useViewport } from './contexts/ViewportContext';
export type { ViewportContextValue } from './contexts/ViewportContext';

// Utilities
export { cn } from './lib/utils';
