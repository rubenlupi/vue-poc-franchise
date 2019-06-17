import { franchiseService } from '../_services';
import { router } from '../_helpers';

const state = {
    all: {},
    item: {
        name:''
    },
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');
        franchiseService.getAll()
            .then(
                franchises => commit('getAllSuccess', franchises),
                error => commit('getAllFailure', error)
            );
    },
    goToFranchise({ dispatch, commit }, { franchise }) {
        commit('franchiseRequest', { franchise });
        franchiseService.getById(franchise._id)
            .then(
                franchise => {
                    commit('franchiseSuccess', franchise);
                    router.push('/franchise');
                },
                error => {
                    commit('franchiseFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, franchises) {
        state.all = { items: franchises };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    franchiseRequest(state) {
        state.item = { loading: true };
    },
    franchiseSuccess(state, franchise) {
        state.item =  franchise;
    },
    franchiseFailure(state) {
        state.status = {};
        state.item = null;
    },
};

export const franchises = {
    namespaced: true,
    state,
    actions,
    mutations
};
