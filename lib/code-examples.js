const DEMO_PURPOSES = `\n\n\n\n\n\n\n\n\n\n\n\n\n\n
/**
 * DEMO PURPOSES
 */
function _getLog() {
  let log = document.getElementById('log');
  if (!log) {
    log = document.body.appendChild(document.createElement('div'));
    log.id = 'log';
    log.addEventListener('dblclick', () => clearLog(), true)
  }

  return log;
}

function clearLog() {
  _getLog().innerHTML = '';
}

function log(info) {
  const log = _getLog();
  log.appendChild(document.createTextNode(info));
  log.appendChild(document.createElement('br'));
}`;



export default {
  /**
   * INTRO
   */
  'intro': {
    name: 'Intro',
    timeWindow: 0,
    code: 
`clearLog(); // Auxiliar, para la presentación

function prueba() { 
  log('Hola mundo') // Auxiliar, para la presentación
}

prueba.call();

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
const { of } = Rx;
of();` + DEMO_PURPOSES,
  },





  /**
   * CREACION COLD
   */
  'creacion-cold': {
    name: 'Creación :: Cold',
    timeWindow: 0,
    code: 
`const { Observable } = Rx; // "Tree-shakeable"

// Forma más básica de creación de observables
var cold = Observable.create((observer) => {
  observer.next('Hola mundo');
  // observer.next(Math.floor(Math.random() * 100));
});

cold.subscribe(a => log(a)); // n...

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
const { of } = Rx;
of();` + DEMO_PURPOSES,
  },







  /**
   * CREACION HOT
   */
  'creacion-hot': {
    name: 'Creación :: Hot',
    timeWindow: 0,
    code: 
`const { Observable } = Rx;
const { share, shareReplay } = RxOperators;

var cold = Observable.create(
  (observer) => {
    log('GENERO RANDOM');
    observer.next(Math.floor(Math.random() * 100))
  }
);

var hot = cold.pipe(share()); // shareReplay(1)

hot.subscribe(a => log(a));
hot.subscribe(a => log(a));
hot.subscribe(a => log(a));

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
const { of } = Rx;
of();` + DEMO_PURPOSES,
  },





  /**
   * CREACION OF
   */
  'creacion-of': {
    name: 'Creación :: Of',
    timeWindow: 0,
    code: 
`const { Observable, of } = Rx;

const observable = of( 'Hola mundo' );
// const observable = of( 'Hola mundo', Math.floor(Math.random() * 100) );

observable.subscribe(a => log(a));
observable.subscribe(a => log(a));
observable.subscribe(a => log(a));

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
of();` + DEMO_PURPOSES,
  },





  /**
   * CREACION FROM
   */
  'creacion-from': {
    name: 'Creación :: FromEvent',
    timeWindow: 0,
    code: 
`const { Observable, fromEvent } = Rx;

const observable = fromEvent(document, 'click'); // Evento

observable.subscribe(a => log('Click!'));

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
const { of } = Rx;
of();` + DEMO_PURPOSES,
  },





  /**
   * CREACION MARBLES
   */
  'creacion-marbles': {
    name: 'Creación :: Marbles',
    timeWindow: 30000,
    code: 
`const { fromEvent } = Rx;

fromEvent(document, 'click'); // Evento

` + DEMO_PURPOSES,
  },

  /**
   * CREACION INTERVAL
   */
  'creacion-interval': {
    name: 'Creación :: Interval',
    timeWindow: 20000,
    code: 
`const { interval } = Rx;

interval(1000); // Async

` + DEMO_PURPOSES,
  },



  /**
   * OPERATORS MAP
   */
  'operadores-map': {
    name: 'Operadores :: Map',
    timeWindow: 20000,
    code: 
`const { interval } = Rx;
const { map } = RxOperators;

interval(1000).pipe(
  map(x => x * 2)
)

` + DEMO_PURPOSES,
  },

  /**
   * OPERATORS SCAN
   */
  'operadores-scan': {
    name: 'Operadores :: Scan',
    timeWindow: 20000,
    code: 
`const { interval } = Rx;
const { scan } = RxOperators;

interval(1000)
  .pipe(
    scan((acc, x) => acc + x)
  )

` + DEMO_PURPOSES,
  },

  /**
   * OPERATORS TAP
   */
  'operadores-tap': {
    name: 'Operadores :: Tap',
    timeWindow: 6000,
    code: 
`const { interval } = Rx;
const { scan, tap } = RxOperators;

interval(1000)
  .pipe(
    tap(x => log('Interval =' + x)),
    scan((acc, x) => acc + x)
  )

` + DEMO_PURPOSES,
  },



  /**
   * SWITCH MAP 1
   */
  'operadores-switchmap': {
    name: 'Operadores :: SwitchMap',
    timeWindow: 0,
    code: 
`const { fromEvent, interval, of } = Rx;
const { scan, tap, switchMap, delay } = RxOperators;

const data$ = of('Got some data!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

const moreData$ = of('Got some more data!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

// Esto no, malo feo caca.
const click$ = fromEvent(document, 'click')

click$.subscribe(() => {
  log('Click!')

  data$.subscribe((x) => {
    log(x);

    moreData$.subscribe((x) => {
      log(x);
    });
  });
});

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
click$
` + DEMO_PURPOSES,
  },

  /**
   * SWITCH MAP 2
   */
  'operadores-switchmap2': {
    name: 'Operadores :: SwitchMap 2',
    timeWindow: 0,
    code: 
`const { fromEvent, interval, of } = Rx;
const { scan, tap, switchMap, delay } = RxOperators;

const data$ = of('Got some data!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

const moreData$ = of('Got some more data!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

const click$ = fromEvent(document, 'click')
  .pipe(
    tap(() => log('Click!')),
    switchMap(() => data$),
    tap(x => log(x)),
    switchMap(() => moreData$),
    tap(x => log(x)),
  )

\n\n\n\n\n\n\n\n\n\n\n\n\n\n
click$
` + DEMO_PURPOSES,
  },


  /**
   * SWITCH MAP 3
   */
  'operadores-switchmap3': {
    name: 'Operadores :: SwitchMap 3',
    timeWindow: 20000,
    code: 
`const { fromEvent, of, forkJoin } = Rx;
const { scan, tap, switchMap, delay } = RxOperators;

const library$ = of('Got library list!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

const books$ = of('Got books list!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

const pages$ = of('Got pages list!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

const description$ = of('Got description!')
  .pipe(
    delay(1000 + Math.random() * 2000)
  );

fromEvent(document, 'click')
  .pipe(
    tap(x => log('Click')),
    switchMap(() => library$),
    tap(x => log(x)),
    switchMap(() => books$),
    tap(x => log(x)),
    switchMap(() => forkJoin(pages$, description$)),
    tap(x => log(x)),
    switchMap(() => of('DONE'))
  )

` + DEMO_PURPOSES,
  }

};
