import { FaGlobeAsia } from 'react-icons/fa';
import resolveProductionUrl from '../resolve-production-url';

export function StartPreviewAction(props) {
  return ['page', 'post'].includes(props.type)
    ? {
        label: 'Open preview',
        icon: FaGlobeAsia,
        shortcut: 'ctrl+shift+o',
        onHandle: () => {
          const previewUrl = resolveProductionUrl(
            props.draft || props.published,
          );
          window.open(previewUrl, '_blank');
        },
      }
    : null;
}
