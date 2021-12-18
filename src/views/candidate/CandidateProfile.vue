<template>
    <page>
        <page-head>

        </page-head>

        <page-body>
            <grid cols="12" v-if="candidate.id">
                <grid-col col="9">
                    <grid cols="12" class="border border-gray-300 rounded-md">
                        <grid-col col="8">
                            <div class="flex flex-col p-10 space-y-10">
                                <div class="flex items-center space-x-6">
                                    <figure class="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                                        <img :src="candidate.photo" class="w-full h-full object-cover" alt="">
                                    </figure>
                                    <div class="flex flex-col space-y-2">
                                        <h1 class="font-bold text-3xl">{{ candidate.fullname }}</h1>
                                        <p class="text-gray-500 font-medium uppercase tracking-wider" :lang="'az'">
                                            {{ candidate.profession.name }}</p>
                                    </div>
                                </div>

                                <!-- About -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-extrabold">{{ translate(translateKey + '.About') }}</h4>
                                    <div>{{ candidate.summary }}</div>
                                </div>

                                <!-- Experiences -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-extrabold">{{
                                            translate(translateKey + '.Experiences')
                                                                        }}</h4>
                                    <div class="flex flex-col space-y-3">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.experiences">
                                            <h6 class="font-medium text-xl">{{ i.position }}, {{ i.company }},
                                                                            {{ i.city.name }}</h6>
                                            <div class="flex items-center text-gray-500 space-x-1 tracking-wider">
                                                <span>{{ i.start_date }}</span>
                                                <span> - </span>
                                                <span>{{ i.end_date }}</span>
                                            </div>
                                            <div>{{ i.description }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Educations -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-extrabold">{{
                                            translate(translateKey + '.Educations')
                                                                        }}</h4>
                                    <div class="flex flex-col space-y-3">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.educations">
                                            <h6 class="font-medium text-xl">{{ i.education_degree.name }}, {{
                                                    i.school
                                                                            }}, {{ i.city.name }}</h6>
                                            <div class="flex items-center text-gray-500 space-x-1 tracking-wider">
                                                <span>{{ i.start_date }}</span>
                                                <span> - </span>
                                                <span>{{ i.end_date }}</span>
                                            </div>
                                            <div>{{ i.description }}</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Courses -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-extrabold">{{ translate(translateKey + '.Courses') }}</h4>
                                    <div class="flex flex-col space-y-3">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.courses">
                                            <h6 class="font-medium text-xl">{{ i.name }}, {{ i.institution }}</h6>
                                            <div class="flex items-center text-gray-500 space-x-1 tracking-wider">
                                                <span>{{ i.start_date }}</span>
                                                <span> - </span>
                                                <span>{{ i.end_date }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- References -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-extrabold">
                                        {{ translate(translateKey + '.References') }}
                                    </h4>
                                    <div class="flex flex-col space-y-3">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.references">
                                            <h6 class="font-medium text-xl">{{ i.fullname }}, {{ i.company }}</h6>
                                            <div class="flex items-center text-gray-500 space-x-1 tracking-wider">
                                                <span>{{ i.email }}</span>
                                                <span> | </span>
                                                <span>{{ i.phone }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </grid-col>

                        <grid-col col="4">
                            <div class="flex flex-col h-full bg-gray-900 p-16 space-y-10 text-white">
                                <!-- Detail -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-bold text-white">
                                        {{ translate(translateKey + '.Detail') }}
                                    </h4>
                                    <div class="flex flex-col space-y-3">
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.Address') }}
                                            </label>
                                            <p>{{ candidate.address }}</p>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.Country') }}
                                            </label>
                                            <p>{{ candidate.city.country.name }}</p>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.City') }}
                                            </label>
                                            <p>{{ candidate.city.name }}</p>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.Phone') }}
                                            </label>
                                            <a class="underline" :href="'tel:'+candidate.phone">
                                                {{ candidate.phone }}
                                            </a>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.Email') }}
                                            </label>
                                            <a class="underline" :href="'mailto:'+candidate.email">
                                                {{ candidate.email }}
                                            </a>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.DrivingLicense') }}
                                            </label>
                                            <p>{{ candidate.driving_license.join(',') }}</p>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.DateOfBirth') }}
                                            </label>
                                            <p>{{ candidate.date_of_birth }}</p>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.DateOfPlace') }}
                                            </label>
                                            <p>{{ candidate.place_of_birth }}</p>
                                        </div>
                                        <div class="flex flex-col space-y-1">
                                            <label class="text-gray-400 font-medium">
                                                {{ translate(translateKey + '.Age') }}
                                            </label>
                                            <p>{{ candidate.age }}</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Social Links -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-bold text-white">
                                        {{ translate(translateKey + '.Links') }}
                                    </h4>
                                    <div class="flex flex-col space-y-3">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.social_links">
                                            <a target="_blank" class="underline" :href="i.link">
                                                {{ i.label }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!-- Skills -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-bold text-white">
                                        {{ translate(translateKey + '.Skills') }}
                                    </h4>
                                    <div class="flex flex-col space-y-5">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.skills">
                                            <label class="font-medium">{{ i.skill.name }}</label>
                                            <div class="w-full h-2 bg-gray-700 relative">
                                                <div class="absolute inset-0 bg-gray-300" :style="`width: ${(i.level * 20)}%`"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Languages -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-bold text-white">
                                        {{ translate(translateKey + '.Languages') }}
                                    </h4>
                                    <div class="flex flex-col space-y-5">
                                        <div class="flex flex-col space-y-1" v-for="i in candidate.languages">
                                            <label class="font-medium">{{ i.language.name }}</label>
                                            <div class="w-full h-2 bg-gray-700 relative">
                                                <div class="absolute inset-0 bg-gray-300" :style="`width: ${(i.level * 20)}%`"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Hobbies -->
                                <div class="flex flex-col space-y-3">
                                    <h4 class="text-2xl font-bold text-white">
                                        {{ translate(translateKey + '.Hobbies') }}
                                    </h4>
                                    <div class="flex flex-col space-y-5">
                                        <div class="flex flex-col space-y-1">
                                            <label class="font-normal">{{
                                                    candidate.hobbies.map(i => i.hobby.name).join(', ')
                                                                       }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </grid-col>
                    </grid>
                </grid-col>


                <grid-col col="2">
                    <div class="flex flex-col pl-10 space-y-3">
                        <app-button class="justify-center" :key="'__dd' + index" v-for="(i, index) in dropdownMenus" @click="dropdownAction(i.action, candidate.id)">
                            {{ i.name }}
                        </app-button>
                    </div>
                </grid-col>
            </grid>

            <!-- Send Email -->
            <CandidateSendEmail @success="successSendModal"/>

            <!-- Send Message -->
            <CandidateSendMessage @success="successSendModal"/>

            <!-- Send Pool -->
            <CandidateSendPool @success="successSendModal"/>
        </page-body>
    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapState, mapActions} from 'vuex'
import App from "../../App";
import CandidateMixin from "../../common/mixins/CandidateMixin";

const translateKey = 'crm.CandidateProfile.Label'

export default {
    name: "CandidateProfile",
    components: {App},
    mixins: [CandidateMixin],
    data() {
        return {
            translateKey,
            candidate: {}
        }
    },
    watch: {
        $route() {
            this.getById();
        }
    },
    computed: {
        componentType() {
            return 'candidate-profile';
        },
    },
    methods: {
        ...mapActions('CandidateStore', ['getCandidate']),
        getById() {
            this.getCandidate(this.$route.params.id)
            .then(r => {
                if (r) {
                    this.candidate = r;
                    this.setRouteTab({
                        title: this.candidate.fullname
                    })
                }
            })
            .catch(err => {
                this.closeRouteTab();
            })
        }
    },
    created() {
        this.getById();
    },
}
</script>

<style scoped>

</style>
