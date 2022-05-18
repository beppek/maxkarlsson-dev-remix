import defaultResolve, {
  DeleteAction,
} from 'part:@sanity/base/document-actions';
import { addActions } from 'sanity-plugin-content-calendar/build/register';
import { DocumentActionsProps } from '../common/types';
import { StartPreviewAction } from './actions/start-preview-action';

export default function resolveDocumentActions(props: DocumentActionsProps) {
  const actions = ['siteSettings'].includes(props.id)
    ? defaultResolve(props)
        .map((action: Function) => (action !== DeleteAction ? action : false))
        .filter(Boolean)
    : [...defaultResolve(props), StartPreviewAction];
  return addActions(props, actions);
}
