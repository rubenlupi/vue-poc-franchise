import { commonService } from '../common'

export function franchiseService() {

    const getAll = (franchises) => {
        try {
            return { ok: true, text: () => Promise.resolve(JSON.stringify(franchises))};
        } catch (err) {
            throw err;
        }
    };

    const getById = ({ franchises, id }) => {
        try {
            const matchedFranchises = franchises.filter(franchise => { return franchise.id === id; });
            const franchise = matchedFranchises.length ? matchedFranchises[0] : null;
            return { ok: true, text: () => Promise.resolve(JSON.stringify(franchise))};
        } catch (err) {
            throw err;
        }
    };

    const update = ({ franchises, id }) => {
        try {

        } catch (err) {
            throw err;
        }
    };

    const create = ({ franchises, newFranchise }) => {
        try {
            if (commonService().isDuplicated({ collection: franchises, register: newFranchise, property: 'name' }))
                throw new Error('Franchise "' + newFranchise.name + '" is already taken');
            newFranchise.id = commonService().getNewId(franchises);
            franchises.push(newFranchise);
            localStorage.setItem('franchises', JSON.stringify(franchises));
            return { ok: true, text: () => Promise.resolve() };
        } catch (err) {
            throw err;
        }
    };

    return {
        getAll,
        getById,
        update,
        create
    };
};


