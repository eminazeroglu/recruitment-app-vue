<template>
    <DxDataGrid
        ref="dataGrid"
        :class="tableClass"
        width="100%"
        :height="height"
        :data-source="dataSource"
        :show-column-lines="showColumnLines"
        :show-row-lines="showRowLines"
        :show-borders="showBorders"
        :row-alternation-enabled="rowAlternationEnabled"
        :column-auto-width="columnAutoWidth"
        :wordWrapEnabled="wordWrapEnabled"
        :remote-operations="remoteOperations"
        @editing-start="editingStart"
        @init-new-row="initNewRow"
        @row-inserting="rowInserting"
        @row-inserted="rowInserted"
        @row-updating="rowUpdating"
        @row-updated="rowUpdated"
        @row-removing="rowRemoving"
        @row-removed="rowRemoved"
        @saving="saving"
        @saved="saved"
        @edit-canceling="editCanceling"
        @edit-canceled="editCanceled"
        :selected-row-keys="selectedRowKeys"
        :key-expr="keyExpr"
        @row-prepared="rowPrepared"
        @row-click="rowClick"
        :allowSelectAll="false"
        @selection-changed="selectionChanged"
        :scrolling="{useNative: nativeScroll}"
    >
        <DxFilterRow :visible="searchVisible"/>
        <DxHeaderFilter :visible="headerFilter"/>
        <DxColumnFixing :enabled="columnFixing"/>
        <DxRowDragging
            :allow-reordering="allowReordering"
            :show-drag-icons="showDragIcons"
            :on-reorder="onReorder"
        />

        <DxEditing
            :allow-updating="editAllowUpdating"
            :allow-deleting="editAllowDeleting"
            :allow-adding="editAllowAdding"
            :mode="editMode"
        />

        <DxPaging :enabled="allowPaging" :page-size="page.limit"/>

        <DxSelection
            v-if="selectionMode"
            mode="multiple"
            :select-all-mode="'page'"
            :show-check-boxes-mode="'always'"
        />

        <DxPager
            :show-page-size-selector="true"
            :allowed-page-sizes="page.size"
            :show-info="true"
        />

        <DxColumn
            :data-field="item.dataField"
            :caption="translate(item.caption)"
            :customize-text="item.customizeText"
            :calculate-cell-value="item.calculateCellValue"
            :true-text="item.trueText"
            :false-text="item.falseText"
            :allowEditing="item.allowEditing"
            :allowFiltering="item.allowFiltering"
            :allow-fixing="item.allowFixing"
            :width="item.width ? item.width : null"
            :alignment="item.alignment ? item.alignment : null"
            :allow-sorting="allowSorting"
            :cell-template="item.slot"
            :headerCellRender="headerCellRender"
            v-if="columns.length > 0 && item.show"
            :key="itemIndex+'_'+Math.random()"
            v-for="(item, itemIndex) in columns"

        >
            <DxFormat v-if="item.formatType" :type="item.formatType" :precision="item.formatPrecision"/>
        </DxColumn>

        <template #[itemTemplate(item)]="{data}" v-for="(item, itemIndex) in columns">
            <slot :name="item.slot" :row="rowMap(data)"></slot>
        </template>

        <DxColumn
            v-if="actionColumn"
            css-class="action-td"
            :allow-filtering="false"
            :allow-editing="false"
            :allow-sorting="false"
            data-field="action"
            alignment="center"
            :caption="translate(actionColumnText)"
            :width="actionColumnWidth ? actionColumnWidth : null"
            cell-template="ActionTemplate"
        />
        <template #ActionTemplate="{data}">
            <slot name="actionSlot" :row="rowMap(data)"></slot>
        </template>

        <DxSummary v-if="totalColumns.length">
            <DxTotalItem
                v-for="(i, index) in totalColumns"
                :key="'dataGridSummary' + Math.random() + index"
                :column="i.column"
                :summary-type="i.type"
                :customize-text="i.customizeText"
            />
        </DxSummary>

    </DxDataGrid>
</template>

<script>
/*
 * Import Components
 * */
import {
    DxDataGrid,
    DxColumn,
    DxColumnFixing,
    DxHeaderFilter,
    DxFilterRow,
    DxEditing,
    DxPaging,
    DxPager,
    DxFilterPanel,
    DxFilterBuilderPopup,
    DxScrolling,
    DxSelection,
    DxRowDragging,
    DxFormat,
    DxSummary,
    DxTotalItem
} from 'devextreme-vue/data-grid';
import {DxButton} from 'devextreme-vue/button';
import UtilDataGridAndDataTree, {DxTranslates} from "../../../plugins/dataGridAndDataTree";
import {loadMessages} from "devextreme/localization";

export default {
    name: "DataGrid",
    components: {
        DxDataGrid,
        DxColumn,
        DxColumnFixing,
        DxHeaderFilter,
        DxFilterRow,
        DxRowDragging,
        DxEditing,
        DxPaging,
        DxPager,
        DxFilterPanel,
        DxFilterBuilderPopup,
        DxScrolling,
        DxButton,
        DxSelection,
        DxFormat,
        DxSummary,
        DxTotalItem
    },
    props: {
        ...UtilDataGridAndDataTree.props
    },
    data() {
        return {
            item: {},
            tasks: [],
            page: {
                limit: 20,
                size: [20, 50, 100, 150]
            },
            selectedItemKeys: [],
        }
    },
    computed: {
        dxInstance() {
            return this.$refs['dataGrid'].instance;
        }
    },
    created() {
        const self = this;
        if (self.pageLimit)
            self.page.limit = self.pageLimit;
        if (self.pageSize)
            self.page.size = self.pageSize;

    },
    mounted() {
        this.$emit('getInstance', this.dxInstance);
        //this.dxTranslate();
    },
    methods: {
        ...UtilDataGridAndDataTree.methods,
        dxTranslate () {
            const items = [];
            Object.keys(DxTranslates).forEach(i => {
                items[i] = this.translate(DxTranslates[i])
            })
            console.log(items);
            loadMessages({
                "en": items
            })
        },
        rowMap(data) {
            return {
                ...data.data,
                index: data.rowIndex,
                totalCount: this.dxInstance.totalCount()
            }
        },
        selectionChanged(data) {
            this.$emit('selectedItem', data.selectedRowKeys)
        },
        onReorder(e) {
            const visibleRows = e.component.getVisibleRows();
            const toIndex = this.dataSource.indexOf(visibleRows[e.toIndex].data);
            const fromIndex = this.dataSource.indexOf(e.itemData);
            const newDataSource = [...this.dataSource];

            newDataSource.splice(fromIndex, 1);
            newDataSource.splice(toIndex, 0, e.itemData);

            this.dataSource = newDataSource;

            this.$emit('changeOrdering', newDataSource)
        },
    }
}
</script>
