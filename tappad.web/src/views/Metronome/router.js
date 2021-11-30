const Metronome = () => import('./index');

const metronomeRoutes =  {
    name: 'metronome',
    path: '/metronome',
    component: Metronome,
};

export default metronomeRoutes;