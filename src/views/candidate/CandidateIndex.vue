<template>
    <page>
        <page-head :title="pageTitle" :sub-title="pageSubTitle">
            <div class="flex items-center space-x-3">
                <dropdown v-if="selectedItems.length">
                    <dropdown-button>
                        {{ translate(translateKey + '.Label.Action') }}
                    </dropdown-button>
                    <dropdown-items position="left" class="top-full">
                        <dropdown-item :style="dropdownItemStyle" :key="'candidate_dropdown' + index" v-for="(i, index) in dropdownMenus" @click="dropdownAction(i.action)">
                            <i :class="i.icon"></i>
                            {{ i.name }}
                        </dropdown-item>
                    </dropdown-items>
                </dropdown>

                <app-button property="gray" icon="icon-reload" @click="reload">
                    {{ translate('button.Reload') }}
                </app-button>

                <app-button property="warning" icon="icon-search" @click="filterModal">
                    {{ translate('button.Filter') }}
                </app-button>
            </div>
        </page-head>

        <page-body>
            <data-grid
                :data-source="datasource"
                :columns="columns"
                :action-column="false"
                :search-visible="false"
                :selection-mode="true"
                @selectedItem="checkedItems"
                ref="dataGrid"
            >
                <div slot="photoTemplate" slot-scope="list">
                    <img :src="list.row.photo" class="w-10 h-10 object-cover rounded-full" alt="">
                </div>
                <div slot-scope="list" slot="fullnameTemplate">
                    <router-link class="text-blue-700 underline" :title="'demos'" :to="{name: 'candidate.profile', params: {id: list.row.id}}">
                        {{ list.row.fullname }}
                    </router-link>
                </div>
            </data-grid>

            <div class="mt-5" v-if="selectedItems.length">
                <dropdown>
                    <dropdown-button>
                        {{ translate(translateKey + '.Label.Action') }}
                    </dropdown-button>
                    <dropdown-items position="left" class="bottom-full">
                        <dropdown-item :style="dropdownItemStyle" :key="'candidate_dropdown' + index" v-for="(i, index) in dropdownMenus" @click="dropdownAction(i.action)">
                            <i :class="i.icon"></i>
                            {{ i.name }}
                        </dropdown-item>
                    </dropdown-items>
                </dropdown>
            </div>
        </page-body>

        <!-- Filter -->
        <CandidateFilter/>

        <!-- Send Email -->
        <CandidateSendEmail @success="successSendModal"/>

        <!-- Send Message -->
        <CandidateSendMessage @success="successSendModal"/>

        <!-- Send Pool -->
        <CandidateSendPool @success="successSendModal"/>
    </page>
</template>

<script>
/*
 * Import Components
 * */
import CandidateMixin from "../../common/mixins/CandidateMixin";

export default {
    name: "CandidateIndex",
    mixins: [CandidateMixin],
}
</script>

<style scoped>

</style>
