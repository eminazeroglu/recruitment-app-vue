import CustomStore from "devextreme/data/custom_store";
import departmentService from "../../services/department.service";

const DepartmentStore = {
    namespaced: true,

    /* State */
    state: {
        department: {},
        departments: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.department = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.departments = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Departments
         * */
        getDepartments({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return departmentService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Department
         * */
        getDepartment({commit}, payload) {
            return departmentService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Departments
         * */
        getSelectDepartments({commit}, payload = {}) {
            return departmentService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Department
         * */
        setDepartment({commit}, payload) {
            if (payload.id)
                return departmentService.put(payload.id, payload);
            return departmentService.post(null, payload);
        },
        /*
         * Action Department
         * */
        actionDepartment({commit}, payload) {
            return departmentService.post('action', payload);
        },
        /*
         * Delete Department
         * */
        deleteDepartment({commit}, payload) {
            return departmentService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default DepartmentStore;
