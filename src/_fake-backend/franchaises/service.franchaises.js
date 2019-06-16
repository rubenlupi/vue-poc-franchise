export function franchaiseService() {

    const getAll = (franchaises) => {
        try {
            return { ok: true, text: () => Promise.resolve(JSON.stringify(franchaises))};
        } catch (err) {
            throw err;
        }
    };

    const getById = ({ franchaises, id }) => {
        try {
            const matchedFranchaises = franchaises.filter(franchaise => { return franchaise.id === id; });
            const franchaise = matchedFranchaises.length ? matchedFranchaises[0] : null;
            return { ok: true, text: () => JSON.stringify(franchaise)};
        } catch (err) {
            throw err;
        }
    };

    const update = ({ franchaises, id }) => {
        try {

        } catch (err) {
            throw err;
        }
    };

    return {
        getAll,
        getById,
        update
    };
};


