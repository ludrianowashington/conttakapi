const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const userId = request.user.id;
        const username = request.user.user;


        const transaction = await connection('transactions')
            .where('user_id', userId)
            .select('*');

        let expenses = [...transaction].filter((item) => {
            return item.type === 0;
        }).reduce((total, exp) => {
            return total = parseFloat(total) + parseFloat(exp.value);
        }, 0);

        let incomes = [...transaction].filter((item) => {
            return item.type === 1;
        }).reduce((total, exp) => {
            return total = parseFloat(total) + parseFloat(exp.value);
        }, 0);

        let total = incomes - expenses;

        return response.json({ incomes, expenses, total, transaction });

    }
}