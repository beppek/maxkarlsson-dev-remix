import type { ComponentType, FC, ReactElement } from 'react';

type Props = any;

export function withContext<P extends object>(
  Component: ComponentType<P>,
  Context: ComponentType<{ children: ReactElement | ReactElement[] }>,
): FC<P & Props> {
  return function withContext(props: Props) {
    return (
      <Context>
        <Component {...props} />
      </Context>
    );
  };
}
