import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { CommentsGrid, ICommentsGrid } from "./Comments";
import * as React from "react";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class CommentsControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _context: ComponentFramework.Context<IInputs>;
    private _currentUserName: string;
    private _currentUserId: string;
    private _currentEntityId: string;
    private _currentEntityName: string;
    private _webAPI: any;
    private _messageProperty: any;
    private _userProperty: any;
    private _dateProperty: any;
    private _parentLookUpProperty: any

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this._context = context;
        this._currentUserName = context.userSettings.userName;
        this._currentUserId = context.userSettings.userId;
        this._currentEntityId = (context.mode as any).contextInfo.entityId;
        this._currentEntityName = (context.mode as any).contextInfo.entityTypeName;
        this._webAPI = context.webAPI;
        this._messageProperty = context.parameters.MessageProperty.raw,
            this._userProperty = context.parameters.UserProperty.raw,
            this._dateProperty = context.parameters.DateProperty.raw,
            this._parentLookUpProperty = context.parameters.ParentLookUpProperty.raw      
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._context = context;
        let pageRows = this.getAllPageRecords(this._context.parameters.dataset)
        const props: ICommentsGrid = {
            pagerows: pageRows,
            currentUserName: this._currentUserName,
            currentUserId: this._currentUserId,
            currentEntityId: this._currentEntityId,
            currentEntityTypeName: this._currentEntityName,
            webAPI: this._webAPI,
            dataset: this._context.parameters.dataset,
            messageProperty: this._messageProperty,
            dateProperty: this._dateProperty,
            userProperty: this._userProperty,
            parentLookUpProperty: this._parentLookUpProperty
        };
        return React.createElement(
            CommentsGrid, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    private getAllPageRecords(gridParam: DataSet) {
        let functionName = "loadPagingRecords";
        let pagingDataRows: any = [];
        let currentPageRecordsID = gridParam.sortedRecordIds;
        let columnsOnView = gridParam.columns;
        try {
            for (const pointer in currentPageRecordsID) {
                pagingDataRows[pointer] = {}
                pagingDataRows[pointer]["key"] = currentPageRecordsID[pointer];
                columnsOnView.forEach((columnItem: any, index) => {
                    pagingDataRows[pointer][columnItem.name] = gridParam.records[currentPageRecordsID[pointer]].getFormattedValue(columnItem.name);
                });
            }
        } catch (error) {
            console.log(functionName + "" + error);
        }
        return pagingDataRows;
    }
}
