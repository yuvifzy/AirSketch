import LeftPanel from './components/layout/LeftPanel';
import RightPanel from './components/layout/RightPanel';
import BottomBar from './components/layout/BottomBar';
import CityCanvas from './components/canvas/CityCanvas';

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#0a0f1e]">
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <CityCanvas />
        <RightPanel />
      </div>
      <BottomBar />
    </div>
  );
}