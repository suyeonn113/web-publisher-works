import CarryOnBaggagePanel from './panels/CarryOnBaggagePanel';
import CheckedBaggagePanel from './panels/CheckedBaggagePanel';
import ExcessBaggagePanel from './panels/ExcessBaggagePanel';
import LostBaggagePanel from './panels/LostBaggagePanel';
import RestrictedBaggagePanel from './panels/RestrictedBaggagePanel';

const PANELS = {
  'carry-on': CarryOnBaggagePanel,
  checked: CheckedBaggagePanel,
  excess: ExcessBaggagePanel,
  lost: LostBaggagePanel,
  restricted: RestrictedBaggagePanel,
};

export default function BaggageTabPanel({ activeTab }) {
  const ActivePanel = PANELS[activeTab];
  return <ActivePanel />;
}
