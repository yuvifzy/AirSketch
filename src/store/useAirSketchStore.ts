import { create } from 'zustand';

// Types
export type DroneStatus = 'queued' | 'routing' | 'active' | 'conflict';

export interface Waypoint {
    id: string;
    x: number;
    y: number;
}

export interface DroneRoute {
    droneId: string;
    waypoints: Waypoint[];
    score: { efficiency: number; safety: number; energy: number; composite: number } | null;
}

export interface Drone {
    id: string;
    label: string;
    color: string;
    origin: string;
    destination: string;
    status: DroneStatus;
    route: DroneRoute | null;
}

export type AppMode = 'draw' | 'simulate' | 'compare';

export interface Conflict {
    id: string;
    droneIdA: string;
    droneIdB: string;
    x: number;
    y: number;
}

interface AirSketchStore {
    drones: Drone[];
    selectedDroneId: string | null;
    mode: AppMode;
    conflicts: Conflict[];
    simulationSpeed: number;
    isSimulating: boolean;
    selectDrone: (id: string) => void;
    setMode: (mode: AppMode) => void;
    addWaypoint: (droneId: string, waypoint: Waypoint) => void;
    clearRoute: (droneId: string) => void;
    setScore: (droneId: string, score: DroneRoute['score']) => void;
    setSimulating: (val: boolean) => void;
    setSpeed: (val: number) => void;
    setConflicts: (conflicts: Conflict[]) => void;
}

const initialDrones: Drone[] = [
    { id: 'DR-01', label: 'DR-01', color: '#00D4FF', origin: 'Koramangala', destination: 'Whitefield', status: 'routing', route: { droneId: 'DR-01', waypoints: [{ id: 'wp-01-1', x: 2, y: 2 }, { id: 'wp-01-2', x: 5, y: 4 }, { id: 'wp-01-3', x: 8, y: 6 }, { id: 'wp-01-4', x: 11, y: 8 }, { id: 'wp-01-5', x: 14, y: 10 }], score: { efficiency: 68, safety: 81, energy: 72, composite: 74 } } },
    { id: 'DR-02', label: 'DR-02', color: '#4ADE80', origin: 'Indiranagar', destination: 'Electronic City', status: 'queued', route: { droneId: 'DR-02', waypoints: [{ id: 'wp-02-1', x: 3, y: 5 }, { id: 'wp-02-2', x: 6, y: 8 }, { id: 'wp-02-3', x: 9, y: 11 }, { id: 'wp-02-4', x: 12, y: 14 }], score: null } },
    { id: 'DR-03', label: 'DR-03', color: '#F59E0B', origin: 'HSR Layout', destination: 'Hebbal', status: 'active', route: { droneId: 'DR-03', waypoints: [{ id: 'wp-03-1', x: 1, y: 7 }, { id: 'wp-03-2', x: 4, y: 9 }, { id: 'wp-03-3', x: 7, y: 11 }, { id: 'wp-03-4', x: 10, y: 13 }, { id: 'wp-03-5', x: 13, y: 15 }], score: null } },
    { id: 'DR-04', label: 'DR-04', color: '#A78BFA', origin: 'Jayanagar', destination: 'Yelahanka', status: 'queued', route: { droneId: 'DR-04', waypoints: [{ id: 'wp-04-1', x: 5, y: 3 }, { id: 'wp-04-2', x: 8, y: 5 }, { id: 'wp-04-3', x: 11, y: 7 }, { id: 'wp-04-4', x: 14, y: 9 }], score: null } },
    { id: 'DR-05', label: 'DR-05', color: '#F472B6', origin: 'BTM Layout', destination: 'Marathahalli', status: 'conflict', route: { droneId: 'DR-05', waypoints: [{ id: 'wp-05-1', x: 6, y: 10 }, { id: 'wp-05-2', x: 9, y: 12 }, { id: 'wp-05-3', x: 12, y: 14 }, { id: 'wp-05-4', x: 15, y: 16 }], score: null } },
    { id: 'DR-06', label: 'DR-06', color: '#FB923C', origin: 'Banashankari', destination: 'KR Puram', status: 'queued', route: { droneId: 'DR-06', waypoints: [{ id: 'wp-06-1', x: 2, y: 15 }, { id: 'wp-06-2', x: 5, y: 14 }, { id: 'wp-06-3', x: 8, y: 12 }, { id: 'wp-06-4', x: 11, y: 10 }, { id: 'wp-06-5', x: 14, y: 8 }], score: null } },
];

export const useAirSketchStore = create<AirSketchStore>((set) => ({
    drones: initialDrones,
    selectedDroneId: null,
    mode: 'draw' as AppMode,
    conflicts: [],
    simulationSpeed: 1,
    isSimulating: false,

    selectDrone: (id: string) => set({ selectedDroneId: id }),
    setMode: (mode: AppMode) => set({ mode }),

    addWaypoint: (droneId: string, waypoint: Waypoint) =>
        set((state) => ({
            drones: state.drones.map((drone) => {
                if (drone.id === droneId) {
                    if (drone.route === null) {
                        return { ...drone, route: { droneId, waypoints: [waypoint], score: null } };
                    }
                    return { ...drone, route: { ...drone.route, waypoints: [...drone.route.waypoints, waypoint] } };
                }
                return drone;
            }),
        })),

    clearRoute: (droneId: string) =>
        set((state) => ({
            drones: state.drones.map((drone) => (drone.id === droneId ? { ...drone, route: null } : drone)),
        })),

    setScore: (droneId: string, score: DroneRoute['score']) =>
        set((state) => ({
            drones: state.drones.map((drone) => {
                if (drone.id === droneId && drone.route) {
                    return { ...drone, route: { ...drone.route, score } };
                }
                return drone;
            }),
        })),

    setSimulating: (val: boolean) => set({ isSimulating: val }),
    setSpeed: (val: number) => set({ simulationSpeed: val }),
    setConflicts: (conflicts: Conflict[]) => set({ conflicts }),
}));
