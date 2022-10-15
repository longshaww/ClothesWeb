module.exports = {
    validationReward: async (model, id) => {
        const user = await model.findById(id);
        if (!user) {
            return `User with id ${id} not found`;
        }
        const reward = user.myPoint;
        if (reward === 0) {
            return `You don't have any reward`;
        }
        return { user, reward };
    },
};
