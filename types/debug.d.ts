// Simplified type definitions for 'debug'
declare module 'debug' {
  function debug(namespace: string): debug.Debugger;

  namespace debug {
    interface Debugger {
      (formatter: any, ...args: any[]): void;
      enabled: boolean;
      namespace: string;
      extend: (namespace: string) => Debugger;
    }

    function enable(namespaces: string): void;
    function disable(): string;
  }

  export = debug;
}