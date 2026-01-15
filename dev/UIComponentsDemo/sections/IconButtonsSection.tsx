import { useState } from 'react';
import { RefreshButton, CloseButton, EditButton, TrashButton } from '../../../src';

export function IconButtonsSection() {
  const [refreshing, setRefreshing] = useState(false);

  const simulateRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <section className="dev-section">
      <h2>Icon Buttons</h2>
      <div className="dev-row">
        <div className="dev-item">
          <RefreshButton onClick={simulateRefresh} loading={refreshing} />
          <span>Refresh</span>
        </div>
        <div className="dev-item">
          <CloseButton onClick={() => alert('Close clicked')} />
          <span>Close</span>
        </div>
        <div className="dev-item">
          <EditButton onClick={() => alert('Edit clicked')} />
          <span>Edit</span>
        </div>
        <div className="dev-item">
          <TrashButton onClick={() => alert('Delete clicked')} />
          <span>Trash</span>
        </div>
      </div>
      <h3>Sizes</h3>
      <div className="dev-row">
        <RefreshButton onClick={() => {}} size="small" />
        <RefreshButton onClick={() => {}} size="default" />
        <RefreshButton onClick={() => {}} size="large" />
      </div>
    </section>
  );
}
