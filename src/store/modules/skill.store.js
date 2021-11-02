import CustomStore from "devextreme/data/custom_store";
import skillService from "../../services/skill.service";

const SkillStore = {
    namespaced: true,

    /* State */
    state: {
        skill: {},
        skills: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.skill = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.skills = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Skills
         * */
        getSkills({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return skillService.get(null, {datatable: true, ...loadOptions, ...payload})
                    .then(r => {
                        const data = r.data.response;
                        return {
                            data: data.data,
                            totalCount: data.total
                        }
                    })
                }
            })
            commit('SET_LIST', data);
        },
        /*
         * Get Skill
         * */
        getSkill({commit}, payload) {
            return skillService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Skills
         * */
        getSelectSkills({commit}, payload = {}) {
            return skillService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Skill
         * */
        setSkill({commit}, payload) {
            if (payload.id)
                return skillService.put(payload.id, payload);
            return skillService.post(null, payload);
        },
        /*
         * Action Skill
         * */
        actionSkill({commit}, payload) {
            return skillService.post('action', payload);
        },
        /*
         * Delete Skill
         * */
        deleteSkill({commit}, payload) {
            return skillService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default SkillStore;
