import { DispatchType } from "../../context";
import { StepActions } from "../../context/actions/step.action";
import { StepActionStatus, StepDefaultField } from "../../context/models/step.model";

/**
 * @param  {Array<any>} items
 * @param  {string|number} pageIndex
 * @param  {(o:number)=>void} fn
 */
export function setActivePageIndex(
    items: Array<any>,
    pageIndex: string | number,
    fn: (o: number) => void
) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].key === pageIndex) {
            fn(i);
            break;
        }
    }
}

/**
 * @param  {DispatchType<StepActions>} dispatch
 * @param  {Array<any>} getUpdateItem
 */
export function updateStepItems(
    dispatch: DispatchType<StepActions>,
    getUpdateItem: Array<any>
) {
    dispatch({
        type: StepActionStatus.CLEAR_FORM_DATA
    });

    // No need key again
    dispatch({
        type: StepActionStatus.REPLACE_DATA,
        payload: {
            replaceFields: getUpdateItem
        }
    });
}

/**
 * @param  {DispatchType<StepActions>} dispatch
 */
export function clearFormDaata(
    dispatch: DispatchType<StepActions>
) {
    dispatch({
        type: StepActionStatus.CLEAR_FORM_DATA
    })
}

/**
 * @param  {DispatchType<StepActions>} dispatch
 * @param  {string} key
 * @param  {Object} fields
 */
export function initFormData(
    dispatch: DispatchType<StepActions>,
    key: string,
    fields: Object
){
    return dispatch({
        type: StepActionStatus.ADD_FORM_DATA_DEFAULT,
        payload: {
            defaultFields: {
                key: key,
                fields: fields
            }
        }
    })
}

/**
 * @param  {DispatchType<StepActions>} dispatch
 * @param  {Object} fields
 * @param  {string} pageId
 */
export function dispatchNewFormData(
    dispatch: DispatchType<StepActions>,
    fields: Object,
    pageId: string
) {
    dispatch({
        type: StepActionStatus.ADD_FORM_DATA_DEFAULT,
        payload: {
            defaultFields: {
                key: pageId,
                fields: fields
            }
        }
    });

    dispatch({
        type: StepActionStatus.ADD_FORM_DATA_PREV,
        payload: {
            allFields: [{
                key: pageId,
                fields: fields
            }]
        }
    });
}
/**
 * @param  {DispatchType<StepActions>} dispatch
 */
export function dispatchFormDataResult(
    dispatch: DispatchType<StepActions>
) {
    dispatch({
        type: StepActionStatus.FORM_DATA_RESULT
    })
}