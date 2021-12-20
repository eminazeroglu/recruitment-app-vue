import CustomStore from "devextreme/data/custom_store";
import skillService from "../../services/skill.service";

const SkillStore = {
    namespaced: true,

    /* State */
    state: {
        skill: {},
        skills: [],
        select_skills: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_skills = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set Skill
         * */
        setSkill({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = skillService.put(payload.id, payload);
            else result = skillService.post(null, payload);
            return result.then(r => {
                dispatch('getSkills');
                dispatch('getSelectSkills');
                return r.data.response;
            })
        },
        /*
         * Action Skill
         * */
        actionSkill({commit, dispatch}, payload) {
            return skillService.post('action', payload)
            .then(r => {
                dispatch('getSkills');
                dispatch('getSelectSkills');
                return r.data.response;
            })
        },
        /*
         * Delete Skill
         * */
        deleteSkill({commit, dispatch}, payload) {
            return skillService.delete(payload)
            .then(r => {
                dispatch('getSkills');
                dispatch('getSelectSkills');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default SkillStore;
