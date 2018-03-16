import manifest from '@neos-project/neos-ui-extensibility';
import {takeLatest} from 'redux-saga/effects';
import {actionTypes} from '@neos-project/neos-ui-redux-store';

export function* watchReady() {
    yield takeLatest(actionTypes.System.READY, function* ready(action) {
        //initialize instance
        var enjoyhint_instance = new EnjoyHint({});

        //simple config. 
        //Only one step - highlighting(with description) "New" button 
        //hide EnjoyHint after a click on the button.
        var enjoyhint_script_steps = [
            {
                'click #neos-PageTree-AddNode': 'Click the "New" button to start creating your project'
            }
        ];

        //set script config
        enjoyhint_instance.set(enjoyhint_script_steps);

        //run Enjoyhint script
        enjoyhint_instance.run();
    });
}

manifest('CodeQ.GuidedTour', {}, (globalRegistry) => {
    const sagasRegistry = globalRegistry.get('sagas');
    sagasRegistry.set('CodeQ.GuidedTour/watchReady', {saga: watchReady});
});
