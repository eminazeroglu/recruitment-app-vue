<template>
    <modal id="CandidateFilterModal">
        <modal-head>
            <modal-title>{{ translate(translateKey + '.MoreSearch') }}</modal-title>
        </modal-head>
        <modal-body>
            <accordion>
                <accordion-item :label="translate(translateKey + '.PersonInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.ContactInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.EducationInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.ExperienceInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.SkillInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.LanguageInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.CertificateInfo')" >
                </accordion-item>
                <accordion-item :label="translate(translateKey + '.ApplyInfo')" >
                </accordion-item>
            </accordion>

            <div class="mt-4 flex space-x-3 pt-4 border-t border-gray-200 justify-end">
                <app-button property="success" icon="icon-search">
                    {{ translate('button.Search') }}
                </app-button>
                <app-button @click="modal('CandidateFilterModal')" property="gray" icon="icon-cancel">
                    {{ translate('button.Close') }}
                </app-button>
            </div>
        </modal-body>
    </modal>
</template>

<script>
/*
 * Import Components
 * */

const translateKey = 'crm.CandidateFilter.Label';

export default {
    name: "CandidateFilter",
    data() {
        return {
            translateKey,
        }
    },
}
</script>

<style scoped>

</style>
