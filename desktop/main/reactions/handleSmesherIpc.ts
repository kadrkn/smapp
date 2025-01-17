import { from, Subject, switchMap, withLatestFrom } from 'rxjs';
import { ipcConsts } from '../../../app/vars';
import {
  NodeConfig,
  PostProvingOpts,
  PostSetupOpts,
} from '../../../shared/types';
import { SmeshingSetupState } from '../../NodeManager';
import Logger from '../../logger';
import { Managers } from '../app.types';
import { fromIPC, wrapResult } from '../rx.utils';

const logger = Logger({ className: 'handleSmesherIpc' });

const startSmeshing = (
  managers: Managers,
  opts: PostSetupOpts,
  provingOpts: PostProvingOpts,
  $nodeConfig: Subject<NodeConfig>
) => wrapResult(managers.node.startSmeshing(opts, provingOpts, $nodeConfig));

export default (
  $managers: Subject<Managers>,
  $smeshingSetupState: Subject<SmeshingSetupState>,
  $nodeConfig: Subject<NodeConfig>
) => {
  const startSmeshingRequest = fromIPC<[PostSetupOpts, PostProvingOpts]>(
    ipcConsts.SMESHER_START_SMESHING
  ).pipe(
    withLatestFrom($managers),
    switchMap(([[opts, provingOpts], managers]) =>
      from(startSmeshing(managers, opts, provingOpts, $nodeConfig))
    )
  );

  const sub = startSmeshingRequest.subscribe(([err, res]) => {
    if (err) {
      logger.error('NodeManager.startSmeshing failed', err);
    } else if (!res) {
      logger.error('NodeManager.startSmeshing not started', err, res);
    } else {
      $smeshingSetupState.next(res);
    }
  });

  return () => sub.unsubscribe();
};
