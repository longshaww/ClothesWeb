module.exports = {
    validationReward: async (model, id) => {
        const user = await model.findById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        const reward = user.myPoint;
        if (reward === 0) {
            throw new Error("You don't have any reward");
        }
        return { user, reward };
    },
};
