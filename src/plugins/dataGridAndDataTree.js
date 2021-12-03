import {loadMessages} from "devextreme/localization";

const UtilDataGridAndDataTree = {
    props: {
        dataSource: {
            default: Array,
            required: true
        },
        columns: {
            default: Array,
            type: Array,
            required: true
        },
        totalColumns: {
            default: Array,
            type: Array,
        },
        tableClass: {
            default: null
        },
        height: {
            default: '100%'
        },
        headerCellRender: {
            default: null
        },
        dataStructure: {
            default: "tree",
            type: String,
        },
        keyExpr: {
            default: 'id',
        },
        itemExpr: {
            default: 'children',
        },
        parentIdExpr: {
            default: 'parent_id',
        },
        remoteOperations: {
            default: true,
        },
        nativeScroll: {
            default: true,
        },
        showColumn: {
            default: true,
        },
        allowSorting: {
            default: false,
            type: Boolean,
        },
        calculateCellValue: {
            type: Function,
        },
        searchVisible: {
            default: true,
            type: Boolean,
        },
        selectionMode: {
            default: false
        },
        selectedRowKeys: {
            default: null,
            type: Array
        },
        actionColumn: {
            default: true,
            type: Boolean
        },
        actionColumnText: {
            default: null,
            type: String
        },
        actionColumnWidth: {
            default: null,
        },
        showColumnHeaders: {
            default: false,
            type: Boolean
        },
        showColumnLines: {
            default: true,
            type: Boolean
        },
        showRowLines: {
            default: true,
            type: Boolean
        },
        wordWrapEnabled: {
            default: true,
            type: Boolean
        },
        showBorders: {
            default: false,
            type: Boolean
        },
        rowAlternationEnabled: {
            default: true,
            type: Boolean
        },
        columnAutoWidth: {
            default: true,
            type: Boolean
        },
        filterRow: {
            default: true,
            type: Boolean
        },
        headerFilter: {
            default: false,
            type: Boolean
        },
        editAllowUpdating: {
            default: false,
            type: Boolean
        },
        editAllowDeleting: {
            default: false,
            type: Boolean
        },
        editAllowAdding: {
            default: false,
            type: Boolean
        },
        editMode: {
            default: 'row',
            type: String
        },

        pageLimit: {
            default: null,
            type: Number
        },
        allowPaging: {
            default: true,
            type: Boolean
        },
        pageSize: {
            default: null,
            type: Array
        },
        columnFixing: {
            default: false,
            type: Boolean
        },
        allowReordering: {
            default: null
        },
        showDragIcons: {
            default: null
        },
        rowPrepared: {
            default: data => data,
            type: Function
        },
        rowClick: {
            default: data => data,
            type: Function
        }
    },

    methods: {
        /*
         * Item Template
         * */
        itemTemplate(item) {
            return item && item.slot ? item.slot : null;
        },
        /*
         * Editing Start
         * */
        editingStart(row) {
            this.$emit('dxEditingStart', row.data);
        },
        /*
         * Init New Row
         * */
        initNewRow(row) {
            this.$emit('dxInitNewRow', row.data);
        },
        /*
         * Row Inserting
         * */
        rowInserting(row) {
            this.$emit('dxRowInserting', row.data);
        },
        /*
         * Row Inserted
         * */
        rowInserted(row) {
            this.$emit('dxRowInserted', row.data);
        },
        /*
         * Row Updating
         * */
        rowUpdating(row) {
            this.$emit('dxRowUpdating', row.data);
        },
        /*
         * Row Updated
         * */
        rowUpdated(row) {
            this.$emit('dxRowUpdated', row.data);
        },
        /*
         * Row Removing
         * */
        rowRemoving(row) {
            this.$emit('dxRowRemoving', row.data);
        },
        /*
         * Row Removed
         * */
        rowRemoved(row) {
            this.$emit('dxRowRemoved', row.data);
        },
        /*
         * Saving
         * */
        saving(row) {
            this.$emit('dxSaving', row.data);
        },
        /*
         * Saved
         * */
        saved(row) {
            this.$emit('dxSaved', row.data);
        },
        /*
         * Edit Canceling
         * */
        editCanceling(row) {
            this.$emit('dxEditCanceling', row.data);
        },
        /*
         * Edit Canceled
         * */
        editCanceled(row) {
            this.$emit('dxEditCanceled', row.data);
        },
    }
}
export default UtilDataGridAndDataTree;

export const DxTranslates = {
    "dxList-pullingDownText": 'datatable.pullingDownText',
    "dxList-pulledDownText": 'datatable.pulledDownText',
    "dxList-refreshingText": 'datatable.refreshingText',
    "dxList-pageLoadingText": 'datatable.pageLoadingText',
    "dxList-nextButtonText": 'datatable.nextButtonText',
    "dxList-selectAll": 'datatable.nextButtonText',
    "dxListEditDecorator-delete": 'datatable.delete',
    "dxListEditDecorator-more": 'datatable.more',
    "dxDataGrid-columnChooserTitle": 'datatable.columnChooserTitle',
    "dxDataGrid-columnChooserEmptyText": 'datatable.columnChooserEmptyText',
    "dxDataGrid-groupContinuesMessage": 'datatable.groupContinuesMessage',
    "dxDataGrid-groupContinuedMessage": 'datatable.groupContinuedMessage',
    "dxDataGrid-groupHeaderText": 'datatable.groupHeaderText',
    "dxDataGrid-ungroupHeaderText": 'datatable.ungroupHeaderText',
    "dxDataGrid-ungroupAllText": 'datatable.ungroupAllText',
    "dxDataGrid-editingEditRow": 'datatable.editingEditRow',
    "dxDataGrid-editingSaveRowChanges": 'datatable.editingSaveRowChanges',
    "dxDataGrid-editingCancelRowChanges": 'datatable.editingCancelRowChanges',
    "dxDataGrid-editingDeleteRow": 'datatable.editingDeleteRow',
    "dxDataGrid-editingUndeleteRow": 'datatable.editingUndeleteRow',
    "dxDataGrid-editingConfirmDeleteMessage": 'datatable.editingConfirmDeleteMessage',
    "dxDataGrid-validationCancelChanges": 'datatable.validationCancelChanges',
    "dxDataGrid-groupPanelEmptyText": 'datatable.groupPanelEmptyText',
    "dxDataGrid-noDataText": 'datatable.noDataText',
    "dxDataGrid-searchPanelPlaceholder": 'datatable.searchPanelPlaceholder',
    "dxDataGrid-filterRowShowAllText": 'datatable.filterRowShowAllText',
    "dxDataGrid-filterRowResetOperationText": 'datatable.filterRowResetOperationText',
    "dxDataGrid-filterRowOperationEquals": 'datatable.filterRowOperationEquals',
    "dxDataGrid-filterRowOperationNotEquals": 'datatable.filterRowOperationNotEquals',
    "dxDataGrid-filterRowOperationLess": 'datatable.filterRowOperationLess',
    "dxDataGrid-filterRowOperationLessOrEquals": 'datatable.filterRowOperationLessOrEquals',
    "dxDataGrid-filterRowOperationGreater": 'datatable.filterRowOperationGreater',
    "dxDataGrid-filterRowOperationGreaterOrEquals": 'datatable.filterRowOperationGreaterOrEquals',
    "dxDataGrid-filterRowOperationStartsWith": 'datatable.filterRowOperationStartsWith',
    "dxDataGrid-filterRowOperationContains": 'datatable.filterRowOperationContains',
    "dxDataGrid-filterRowOperationNotContains": 'datatable.filterRowOperationNotContains',
    "dxDataGrid-filterRowOperationEndsWith": 'datatable.filterRowOperationEndsWith',
    "dxDataGrid-filterRowOperationBetween": 'datatable.filterRowOperationBetween',
    "dxDataGrid-filterRowOperationBetweenStartText": 'datatable.filterRowOperationBetweenStartText',
    "dxDataGrid-filterRowOperationBetweenEndText": 'datatable.filterRowOperationBetweenEndText',
    "dxDataGrid-applyFilterText": 'datatable.applyFilterText',
    "dxDataGrid-trueText": 'datatable.trueText',
    "dxDataGrid-falseText": 'datatable.falseText',
    "dxDataGrid-sortingAscendingText": 'datatable.sortingAscendingText',
    "dxDataGrid-sortingDescendingText": 'datatable.sortingDescendingText',
    "dxDataGrid-sortingClearText": 'datatable.sortingClearText',
    "dxDataGrid-editingSaveAllChanges": 'datatable.editingSaveAllChanges',
    "dxDataGrid-editingCancelAllChanges": 'datatable.editingCancelAllChanges',
    "dxDataGrid-editingAddRow": 'datatable.editingAddRow',
    "dxDataGrid-summaryMin": 'datatable.summaryMin',
    "dxDataGrid-summaryMinOtherColumn": 'datatable.summaryMinOtherColumn',
    "dxDataGrid-summaryMax": 'datatable.summaryMax',
    "dxDataGrid-summaryMaxOtherColumn": 'datatable.summaryMaxOtherColumn',
    "dxDataGrid-summaryAvg": 'datatable.summaryAvg',
    "dxDataGrid-summaryAvgOtherColumn": 'datatable.summaryAvgOtherColumn',
    "dxDataGrid-summarySum": 'datatable.summarySum',
    "dxDataGrid-summarySumOtherColumn": 'datatable.summarySumOtherColumn',
    "dxDataGrid-summaryCount": 'datatable.summaryCount',
    "dxDataGrid-columnFixingFix": 'datatable.columnFixingFix',
    "dxDataGrid-columnFixingUnfix": 'datatable.columnFixingUnfix',
    "dxDataGrid-columnFixingLeftPosition": 'datatable.columnFixingLeftPosition',
    "dxDataGrid-columnFixingRightPosition": 'datatable.columnFixingRightPosition',
    "dxDataGrid-exportTo": 'datatable.exportTo',
    "dxDataGrid-exportToExcel": 'datatable.exportToExcel',
    "dxDataGrid-exporting": 'datatable.exporting',
    "dxDataGrid-excelFormat": 'datatable.excelFormat',
    "dxDataGrid-selectedRows": 'datatable.selectedRows',
    "dxDataGrid-exportSelectedRows": 'datatable.exportSelectedRows',
    "dxDataGrid-exportAll": 'datatable.exportAll',
    "dxDataGrid-headerFilterEmptyValue": 'datatable.headerFilterEmptyValue',
    "dxDataGrid-headerFilterOK": 'datatable.headerFilterOK',
    "dxDataGrid-headerFilterCancel": 'datatable.headerFilterCancel',
    "dxDataGrid-ariaAdaptiveCollapse": 'datatable.ariaAdaptiveCollapse',
    "dxDataGrid-ariaAdaptiveExpand": 'datatable.ariaAdaptiveExpand',
    "dxDataGrid-ariaColumn": 'datatable.ariaColumn',
    "dxDataGrid-ariaValue": 'datatable.ariaValue',
    "dxDataGrid-ariaFilterCell": 'datatable.ariaFilterCell',
    "dxDataGrid-ariaCollapse": 'datatable.ariaCollapse',
    "dxDataGrid-ariaExpand": 'datatable.ariaExpand',
    "dxDataGrid-ariaDataGrid": 'datatable.ariaDataGrid',
    "dxDataGrid-ariaSearchInGrid": 'datatable.ariaSearchInGrid',
    "dxDataGrid-ariaSelectAll": 'datatable.ariaSelectAll',
    "dxDataGrid-ariaSelectRow": 'datatable.ariaSelectRow',
    "dxDataGrid-ariaToolbar": 'datatable.ariaToolbar',
    "dxDataGrid-filterBuilderPopupTitle": 'datatable.filterBuilderPopupTitle',
    "dxDataGrid-filterPanelCreateFilter": 'datatable.filterPanelCreateFilter',
    "dxDataGrid-filterPanelClearFilter": 'datatable.filterPanelClearFilter',
    "dxDataGrid-filterPanelFilterEnabledHint": 'datatable.filterPanelFilterEnabledHint',
}
