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
   * CREACION INTRO
   */
  'creacion-intro': {
    name: 'Creacion :: Intro',
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
    scan((acc, x) => acc + x))
  )

` + DEMO_PURPOSES,
  },

  /**
   * OPERATORS DELAY
   */
  'operadores-delay': {
    name: 'Operadores :: Scan',
    timeWindow: 20000,
    code: 
`const { of } = Rx;
const { scan, delay } = RxOperators;

of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  .pipe(
    delay(1000),
    scan((acc, x) => acc + x))
  )

` + DEMO_PURPOSES,
  },



/*
  'basic-interval': {
    name: 'Basic intervales',
    code: `const { interval } = Rx;
const { take } = RxOperators;

interval(1000).pipe(
  take(4)
)
`,
    timeWindow: 5000
  },
  'random-error': {
    name: 'Random error',
    code: `const { Observable } = Rx;

Observable.create(observer => {
  let n = 1;

  const intervalId = setInterval(() => {
    if (Math.random() < 0.8 && n < 9) {
      observer.next(n * n);
      n += 1;
    } else {
      observer.error('Oh no...');
    }
  }, 1000);

  return () => clearInterval(intervalId);
})
`,
    timeWindow: 10000
  },
  'chess-game': {
    name: 'Chess game',
    code: `const { of, interval } = Rx;
const { zip, map } = RxOperators;

const timer$ = interval(1000);
const pieces$ = of('', '♞', '', '♞', '♘', '♞');
const columns$ = of('e', 'c', 'g', 'd', 'e', 'f');
const rows$ = of('4', '6', '4', '4', '2', '3');

timer$.pipe(
  zip(
    pieces$,
    columns$,
    rows$
  ),
  map(([_, piece, column, row]) => \`\${piece}\${column}\${row}\`)
)
`,
    timeWindow: 7000
  },
  'higher-order-observable': {
    name: 'Higher order Observable',
    code: `const { interval } = Rx;
const { groupBy } = RxOperators;

interval(1000).pipe(
  groupBy(n => n % 2)
)
`,
    timeWindow: 10000
  },
  'grouped-fibonacci': {
    name: 'Grouped Fibonacci',
    code: `const { interval } = Rx;
const { scan, pluck, groupBy } = RxOperators;

interval(1000).pipe(
  scan(
    ({ secondLast, last }) => ({
      secondLast: last,
      last: last + secondLast
    }),
    { secondLast: 0, last: 1 }
  ),
  pluck("secondLast"),
  groupBy(n => Math.floor(Math.log10(n)))
)

`,
    timeWindow: 15000
  },
  'today-is': {
    name: 'Today is...',
    code: `const { of, interval, range, EMPTY } = Rx;
const { delay, take, map, concatMap } = RxOperators;

const sentence = new Date().toString().toUpperCase();
const words = sentence.split(' ');
const delayMS = 1000;

const wordDelay = i =>
  i === 0
    ? delayMS
    : (words[i - 1].length + 1) * delayMS;

const wordStart = i =>
  i < words.length
    ? of(i).pipe(delay(wordDelay(i)))
    : EMPTY.pipe(delay(wordDelay(i)))

const wordObservable = word => {
  const letters = word.split('');

  return interval(delayMS).pipe(
    take(letters.length),
    map(i => letters[i])
  );
};

range(0, words.length + 1).pipe(
  concatMap(wordStart),
  map(i => wordObservable(words[i]))
)
`,
    timeWindow: 17000
  },
  'custom-operator': {
    name: 'Custom operator',
    code: `const { Observable, interval } = Rx;

const sqrt = source$ => Observable.create(observer =>
  source$.subscribe(
    value => {
      const result = Math.sqrt(value);

      if (typeof value !== 'number' || isNaN(result)) {
        observer.error(\`Square root of \${value} doesn't exist\`);
      } else {
        observer.next(result);
      }
    },
    err => observer.error(err),
    () => observer.complete()
  )
);

interval(1000).pipe(sqrt)

`,
    timeWindow: 12000
  },
  'mouse-move': {
    name: 'Mouse move',
    code: `const { fromEvent } = Rx;
const { map, throttleTime } = RxOperators;

fromEvent(document, 'mousemove').pipe(
  map(event => event.clientX),
  throttleTime(300)
)

// Move your mouse over the right hand pane
// after clicking Visualize.
`,
    timeWindow: 10000
  },
  'input-element': {
    name: 'Input element',
    code: `const { fromEvent } = Rx;
const { map, filter } = RxOperators;

const input = document.createElement('input');

input.setAttribute('placeholder', 'Type something');

// \`output\` represents the right hand pane.
// You can prepend/append elements to it.
output.prepend(input);

input.focus();

fromEvent(input, 'keydown').pipe(
  map(e => e.key),
  filter(key => key !== ' ')
)
`,
    timeWindow: 20000
  },
  'pause-and-resume': {
    name: 'Pause and resume',
    code: `const { fromEvent, timer, EMPTY } = Rx;
const { scan, startWith, map, filter, switchMap } = RxOperators;

const pauseResume$ = fromEvent(document, 'click').pipe(
  scan(acc => !acc, true),
  startWith(true)
);
const counter$ = timer(0, 1000);

pauseResume$.pipe(
  switchMap(resume => resume ? counter$ : EMPTY)
)

// Click to pause and resume over the right hand pane
// after clicking Visualize.
`,
    timeWindow: 20000
  },
  custom: {
    name: 'Custom',
    code: `// Write any JavaScript you want, just make sure that
// the last expression is an Rx.Observable

const {  } = Rx;
const {  } = RxOperators;
 `,
    timeWindow: 10000
  }*/
};
