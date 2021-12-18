<template>
    <date-picker
        @change="valueChange"
        input-class="form-element"
        :format="displayFormat"
        :type="type"
        :lang="datepickerTranslates"
        v-model="date"
        :disabled-date="disabledRange"
        v-bind="$props"
    ></date-picker>
</template>

<script>
/*
 * Import Components
 * */
import DatePicker from 'vue2-datepicker';
import FormMixin from "../../../mixins/FormMixin";
import moment from 'moment'

export default {
    name: "FormDate",
    components: {
        DatePicker
    },
    mixins: [FormMixin],
    props: {
        type: {
            default: 'date'
        },
        valueFormat: {
            default: 'YYYY-MM-DD'
        },
        displayFormat: {
            default: 'DD-MM-YYYY'
        },
        disabledStart: {
            default: null
        },
        disabledEnd: {
            default: null
        }
    },
    data() {
        return {
            date: null
        }
    },
    methods: {
        valueChange(val) {
            this.$emit('input', val ? moment(val).format(this.valueFormat) : null)
        },
        disabledRange(date) {
            return date < new Date(2021, 12, 2);
        },
        shortWeekDayName(data) {
            const text = data.split(' ');
            let result = null;
            if (Array.isArray(text)) {
                if (text[0]) {
                    result = text[0].substring(0, 1);
                    if (text[1]) {
                        result += '.' + text[1].substring(0, 1).toUpperCase();
                    } else {
                        result = text[0].substring(0, 2);
                    }
                }
            }
            return result;
        },
    },
    computed: {
        datepickerTranslates() {
            return {
                formatLocale: {
                    months: [
                        this.translate('date.Month.January'),
                        this.translate('date.Month.February'),
                        this.translate('date.Month.March'),
                        this.translate('date.Month.April'),
                        this.translate('date.Month.May'),
                        this.translate('date.Month.June'),
                        this.translate('date.Month.July'),
                        this.translate('date.Month.August'),
                        this.translate('date.Month.September'),
                        this.translate('date.Month.October'),
                        this.translate('date.Month.November'),
                        this.translate('date.Month.December'),
                    ],
                    monthsShort: [
                        this.translate('date.Month.January').substring(0, 3),
                        this.translate('date.Month.February').substring(0, 3),
                        this.translate('date.Month.March').substring(0, 3),
                        this.translate('date.Month.April').substring(0, 3),
                        this.translate('date.Month.May').substring(0, 3),
                        this.translate('date.Month.June').substring(0, 3),
                        this.translate('date.Month.July').substring(0, 3),
                        this.translate('date.Month.August').substring(0, 3),
                        this.translate('date.Month.September').substring(0, 3),
                        this.translate('date.Month.October').substring(0, 3),
                        this.translate('date.Month.November').substring(0, 3),
                        this.translate('date.Month.December').substring(0, 3),
                    ],
                    weekdays: [
                        this.translate('date.Week.Monday'),
                        this.translate('date.Week.Tuesday'),
                        this.translate('date.Week.Wednesday'),
                        this.translate('date.Week.Thursday'),
                        this.translate('date.Week.Friday'),
                        this.translate('date.Week.Saturday'),
                        this.translate('date.Week.Sunday'),
                    ],
                    weekdaysMin: [
                        this.shortWeekDayName(this.translate('date.Week.Monday')),
                        this.shortWeekDayName(this.translate('date.Week.Tuesday')),
                        this.shortWeekDayName(this.translate('date.Week.Wednesday')),
                        this.shortWeekDayName(this.translate('date.Week.Thursday')),
                        this.shortWeekDayName(this.translate('date.Week.Friday')),
                        this.shortWeekDayName(this.translate('date.Week.Saturday')),
                        this.shortWeekDayName(this.translate('date.Week.Sunday'))
                    ],
                },
                monthFormat: 'MMM',
                yearFormat: 'YYYY'
            }
        }
    }
}
</script>

<style scoped>
@import '~vue2-datepicker/index.css';
</style>
