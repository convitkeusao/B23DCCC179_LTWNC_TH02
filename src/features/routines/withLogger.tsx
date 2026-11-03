import { useEffect } from 'react';
import type { ComponentType } from 'react';

export function withLogger<P extends object>(Component: ComponentType<P>, name: string) {
  return function LoggedComponent(props: P) {
    useEffect(() => {
      console.log(`[${name}] mounted`);
    }, []);

    return <Component {...props} />;
  };
}
