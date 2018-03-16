import manifest from '@neos-project/neos-ui-extensibility';
import {takeLatest} from 'redux-saga/effects';
import {actionTypes} from '@neos-project/neos-ui-redux-store';

export function* watchReady() {
    yield takeLatest(actionTypes.System.READY, function* ready(action) {
        const enjoyhint_instance = new EnjoyHint({});
        // See the docs: https://github.com/xbsoftware/enjoyhint/#initialization-and-configuration
        const enjoyhint_script_steps = [
            {
                'click #neos-PageTree-AddNode': 'Click the "Plus" button to create a new document node'
            }
        ];
        enjoyhint_instance.set(enjoyhint_script_steps);
        enjoyhint_instance.run();
    });
}

manifest('CodeQ.GuidedTour', {}, (globalRegistry) => {
    const sagasRegistry = globalRegistry.get('sagas');
    sagasRegistry.set('CodeQ.GuidedTour/watchReady', {saga: watchReady});
});
