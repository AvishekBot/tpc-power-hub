import { Zap, Battery, Sun, Cpu, CircuitBoard, Plug, Wrench, Shield, Server, Cable, Activity, BatteryCharging } from 'lucide-react';

export const categories = [
  { name: 'Servo Stabilizers', slug: 'servo-stabilizers', icon: Shield },
  { name: 'UPS Systems', slug: 'ups-systems', icon: Battery },
  { name: 'Transformers', slug: 'transformers', icon: Zap },
  { name: 'VFD Drives', slug: 'vfd-drives', icon: Cpu },
  { name: 'Rectifiers', slug: 'rectifiers', icon: CircuitBoard },
  { name: 'Home Inverters', slug: 'home-inverters', icon: Plug },
  { name: 'Battery Chargers', slug: 'battery-chargers', icon: BatteryCharging },
  { name: 'Solar Solutions', slug: 'solar-solutions', icon: Sun },
  { name: 'Welding Machines', slug: 'welding-machines', icon: Wrench },
  { name: 'Batteries', slug: 'batteries', icon: Activity },
  { name: 'Panel Boards', slug: 'panel-boards', icon: Server },
  { name: 'Relay Stabilizers', slug: 'relay-stabilizers', icon: Cable },
];
